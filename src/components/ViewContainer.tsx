"use client";

import _ from "lodash";
import React, { useEffect, useState } from "react";

import {
  deleteImageById,
  getUploadedImageURL,
  updateWrapPage,
} from "@/app/make/actions";
import EditBar from "@/app/make/EditBar";

import {
  formatTextData,
  formatColorData,
  formatImageData,
} from "@/lib/mongo/formatData";
import { Wrap } from "@/lib/utils/interfaces";

import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import Pagination from "./Pagination";
import RenderSwitch from "./RenderSwitch";
import Toast from "./Toast";

interface ViewContainer {
  wrap: Wrap;
  editing: boolean;
}

const ViewContainer = (props: ViewContainer) => {
  const { editing } = props;

  const [wrap, setWrap] = useState(props.wrap);
  const [current, setCurrent] = useState(0);
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");

  const [toast, setToast] = useState("");

  const [pageData, setPageData] = useState({});
  const [pageImageData, setPageImageData] = useState<(File | undefined)[]>([]);
  const [saveLoading, setSaveLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // TODO: add animations to these
  const toggleAddModal = () => setShowAddModal(!showAddModal);
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  sessionStorage.setItem("path", `/make?id=${wrap._id.toString()}`);

  // live update background and font colors
  useEffect(() => {
    const viewContainer = document.getElementById(
      "view-container"
    ) as HTMLElement;

    if (wrap.pages[current]) {
      document.body.style.backgroundColor =
        bgColor || wrap.pages[current].bgColor;
      viewContainer.style.color = color || wrap.pages[current].color;
    }
  }, [wrap, current, bgColor, color]);

  const savePage = async () => {
    setSaveLoading(true);

    let newImageURLs: (string | undefined)[] = [];
    if (!_.isEmpty(pageImageData)) {
      // upload images to AWS S3
      const promises = pageImageData.map((image) => {
        if (image) {
          return getUploadedImageURL(image);
        } else {
          return "";
        }
      });
      newImageURLs = await Promise.all(promises);

      // delete old images from AWS S3
      newImageURLs.forEach((url, i) => {
        if (url !== "" && url !== "error" && wrap.pages[current].items) {
          const oldImageId =
            wrap.pages[current].items[i].imageURL?.split("/")[3] ?? "";
          if (oldImageId) deleteImageById(oldImageId);
        }
      });
    }

    // format data for MongoDB
    const colorData = formatColorData({
      page: wrap.pages[current],
      current,
      bgColor,
      color,
    });
    const textData = formatTextData({
      current,
      pageData,
    });
    const imageData = formatImageData({
      current,
      fileURLs: newImageURLs,
    });
    const data = { ...colorData, ...textData, ...imageData };

    if (!_.isEmpty(data)) {
      updateWrapPage(wrap._id.toString(), {
        $set: data,
      });

      // predictive success update
      const updatedWrap = wrap;
      updatedWrap.pages[current] = {
        ...updatedWrap.pages[current],
        ...pageData,
      };
      newImageURLs.forEach((url, i) => {
        if (url !== "" && url !== "error" && updatedWrap.pages[current].items) {
          updatedWrap.pages[current].items[i].imageURL = url;
        }
      });
      if (bgColor) updatedWrap.pages[current].bgColor = bgColor;
      if (color) updatedWrap.pages[current].color = color;

      setWrap(updatedWrap);
      setPageData({});
      setPageImageData([]);
    }

    setToast("Saved Page!");
    setSaveLoading(false);
  };

  return (
    <div
      id="view-container"
      className="w-full h-dvh flex flex-col items-center justify-center overflow-hidden"
    >
      {editing && wrap.pages[current] && (
        <>
          <EditBar
            id={wrap._id.toString()}
            page={wrap.pages[current]}
            length={wrap.pages.length}
            saveLoading={saveLoading}
            setBgColor={setBgColor}
            setColor={setColor}
            savePage={savePage}
            toggleAddModal={toggleAddModal}
            toggleDeleteModal={toggleDeleteModal}
          />

          {showAddModal && (
            <AddModal
              id={wrap._id.toString()}
              current={current}
              setCurrent={setCurrent}
              setWrap={setWrap}
              setToast={setToast}
              toggleModal={toggleAddModal}
            />
          )}

          {showDeleteModal && (
            <DeleteModal
              id={wrap._id.toString()}
              page={wrap.pages[current]}
              current={current}
              setCurrent={setCurrent}
              setWrap={setWrap}
              setToast={setToast}
              toggleModal={toggleDeleteModal}
            />
          )}
        </>
      )}

      <RenderSwitch
        editing={editing}
        wrap={wrap}
        current={current}
        pageData={pageData}
        pageImageData={pageImageData}
        setPageData={setPageData}
        setPageImageData={setPageImageData}
      />

      <Pagination
        wrap={wrap}
        current={current}
        setPageData={setPageData}
        setCurrent={setCurrent}
        setBgColor={setBgColor}
        setColor={setColor}
      />

      <Toast toast={toast} setToast={setToast} />
    </div>
  );
};

export default ViewContainer;
