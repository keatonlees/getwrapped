/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import {
  deleteImageById,
  getUploadedImageURL,
  updateWrapPage,
} from "@/app/make/[id]/actions";
import EditBar from "@/app/make/[id]/EditBar";
import { getWrapById } from "@/app/view/[id]/actions";

import AnimateIn from "@/lib/animations/AnimateIn";
import {
  formatColorData,
  formatImageArrayData,
  formatTextArrayData,
} from "@/lib/mongo/formatData";
import { Template } from "@/lib/utils/interfaces";
import { isEven } from "@/lib/utils/isEven";

import ImageComponent from "../ImageComponent";
import Toast from "../Toast";

import AddModal from "./AddModal";

const SplitTemplate = (props: Template) => {
  const {
    editing,
    wrap,
    current,
    bgColor,
    color,
    setWrap,
    setBgColor,
    setColor,
  } = props;

  const id = wrap._id.toString();
  const page = wrap.pages[current];

  const [toast, setToast] = useState("");
  const [title, setTitle] = useState(page.title || "");
  const [itemTitles, setItemTitles] = useState<string[]>([]);
  const [itemContents, setItemContents] = useState<string[]>([]);

  const [file1, setFile1] = useState<File | undefined>(undefined);
  const [file2, setFile2] = useState<File | undefined>(undefined);
  const [fileURL1, setFileURL1] = useState<string | undefined>(undefined);
  const [fileURL2, setFileURL2] = useState<string | undefined>(undefined);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleItemTitles = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const newTitles = [...itemTitles];
    newTitles[i] = e.target.value;
    setItemTitles(newTitles);
  };
  const handleItemContents = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    i: number
  ) => {
    const newContents = [...itemContents];
    newContents[i] = e.target.value;
    setItemContents(newContents);
  };

  const saveSplitPage = async () => {
    const fileURLs = [];
    if (file1) {
      const imageURL1 = await getUploadedImageURL(file1);
      if (imageURL1 === "error") {
        setToast("Error uploading image!");
        return;
      } else fileURLs.push(imageURL1);
    } else fileURLs.push("");
    if (file2) {
      const imageURL2 = await getUploadedImageURL(file2);
      if (imageURL2 === "error") {
        setToast("Error uploading image!");
        return;
      } else fileURLs.push(imageURL2);
    } else fileURLs.push("");

    const colorData = formatColorData({ page, current, bgColor, color });
    const textData = formatTextArrayData({
      page,
      current,
      title,
      itemTitles,
      itemContents,
    });
    const imageData = formatImageArrayData({
      page,
      current,
      fileURLs,
    });

    const data = {
      ...colorData,
      ...textData,
      ...imageData,
    };

    // clear old images from S3
    if (JSON.stringify(imageData) !== "{}") {
      let originalImageId = "";
      for (let i = 0; i < fileURLs.length; i++) {
        if (page.items && fileURLs[i] !== "")
          originalImageId = page.items[i].imageURL?.split("/")[3] ?? "";
        if (originalImageId !== "") await deleteImageById(originalImageId);
      }
    }

    // send data to action and refetch
    if (JSON.stringify(data) !== "{}") {
      await updateWrapPage(id, { $set: data });
      setWrap(await getWrapById(id));
      setFile1(undefined);
      setFile2(undefined);
      setFileURL1(undefined);
      setFileURL2(undefined);
      setToast("Saved page!");
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center overflow-hidden">
      {editing && page && (
        <>
          <EditBar
            id={id}
            current={current}
            page={page}
            length={wrap.pages.length}
            setBgColor={setBgColor}
            setColor={setColor}
            setWrap={setWrap}
            setToast={setToast}
            savePage={saveSplitPage}
            toggleModal={toggleModal}
          />

          {showModal && (
            <AddModal
              id={id}
              current={current}
              setWrap={setWrap}
              setToast={setToast}
              toggleModal={toggleModal}
            />
          )}
        </>
      )}

      <AnimateIn
        from="opacity-0 -translate-y-4"
        to="opacity-100 translate-y-0"
        delay={250}
      >
        {editing ? (
          <input
            className="input input-ghost font-yeseva font-bold text-4xl text-center w-full"
            maxLength={20}
            defaultValue={title}
            onChange={handleTitle}
          />
        ) : (
          <h1 className="font-yeseva font-bold text-4xl w-full text-shadow-psm shadow-neutral mb-4">
            {page.title}
          </h1>
        )}
      </AnimateIn>

      <div className="h-fit flex flex-col md:flex-row justify-between gap-4 md:gap-32 mb-4 mt-2">
        {page.items &&
          page.items.map((item, i) => (
            <div key={i}>
              <AnimateIn
                from={`opacity-0 ${isEven(i) ? "-" : ""}translate-x-4`}
                to="opacity-100 translate-y-0"
                delay={250 * (i + 2)}
                className="flex flex-col items-center justify-center gap-2"
              >
                <div className="aspect-video w-[65dvw] sm:w-[60dvw] md:w-[32dvw]">
                  <ImageComponent
                    src={item.imageURL}
                    editing={editing}
                    file={eval(`file${i + 1}`)}
                    fileURL={eval(`fileURL${i + 1}`)}
                    setFile={eval(`setFile${i + 1}`)}
                    setFileURL={eval(`setFileURL${i + 1}`)}
                  />
                </div>

                {editing ? (
                  <input
                    className="input input-ghost font-yeseva font-bold text-lg md:text-2xl text-center w-full"
                    maxLength={20}
                    defaultValue={item.title}
                    onChange={(e) => handleItemTitles(e, i)}
                  />
                ) : (
                  <h1 className="font-yeseva font-bold text-lg md:text-2xl mt-2">
                    {item.title}
                  </h1>
                )}

                {editing ? (
                  <textarea
                    className="input input-ghost text-center resize-none overflow-auto w-full h-12 md:h-28"
                    maxLength={150}
                    defaultValue={item.content}
                    onChange={(e) => handleItemContents(e, i)}
                  />
                ) : (
                  <h1 className="text-sm 2xl:text-md">{item.content}</h1>
                )}
              </AnimateIn>
            </div>
          ))}
      </div>

      <Toast toast={toast} setToast={setToast} />
    </div>
  );
};

export default SplitTemplate;
