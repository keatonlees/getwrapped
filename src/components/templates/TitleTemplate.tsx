import React, { useState } from "react";

import { updateWrapPage } from "@/app/make/actions";
import EditBar from "@/app/make/EditBar";
import { getWrapById } from "@/app/view/actions";

import AnimateIn from "@/lib/animations/AnimateIn";
import { formatColorData, formatTextData } from "@/lib/mongo/formatData";
import { Template } from "@/lib/utils/interfaces";

import AddModal from "../AddModal";
import Toast from "../Toast";

const TitleTemplate = (props: Template) => {
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
  const type = page.type;

  const [toast, setToast] = useState("");
  const [title, setTitle] = useState(wrap.title || "");
  const [content, setContent] = useState(page.content || "");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };
  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const saveTitlePage = async () => {
    const colorData = formatColorData({ page, current, bgColor, color });
    const textData = formatTextData({ page, current, title, content, type });

    const data = {
      ...colorData,
      ...textData,
    };

    // send data to action and refetch
    if (JSON.stringify(data) !== "{}") {
      await updateWrapPage(id, { $set: data });
      setWrap(await getWrapById(id));
      setToast("Saved page!");
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center">
      {editing && page && (
        <>
          <EditBar
            id={id}
            page={page}
            length={wrap.pages.length}
            setBgColor={setBgColor}
            setColor={setColor}
            savePage={saveTitlePage}
            toggleAddModal={toggleAddModal}
            toggleDeleteModal={toggleDeleteModal}
          />

          {showAddModal && (
            <AddModal
              id={id}
              current={current}
              setWrap={setWrap}
              setToast={setToast}
              toggleModal={toggleAddModal}
            />
          )}
        </>
      )}

      <div className="flex flex-col gap-2 items-center justify-center w-[90dvw] xl:w-[50dvw] h-full">
        <AnimateIn
          from="opacity-0 translate-y-4"
          to="opacity-100 translate-y-0"
          delay={250}
        >
          {editing ? (
            <input
              className="input input-ghost font-yeseva font-bold text-8xl text-center w-full h-full"
              maxLength={20}
              defaultValue={title}
              onChange={handleTitle}
            />
          ) : (
            <h1 className="font-yeseva font-bold text-8xl text-shadow-p shadow-neutral mb-4">
              {wrap.title}
            </h1>
          )}
        </AnimateIn>

        <AnimateIn
          from="opacity-0 translate-y-4"
          to="opacity-100 translate-y-0"
          delay={500}
        >
          {editing ? (
            <textarea
              className="input input-ghost font-yeseva font-bold text-4xl text-center resize-none overflow-auto w-[80dvw] xl:w-[40dvw] h-24"
              maxLength={80}
              defaultValue={content}
              onChange={handleContent}
            />
          ) : (
            <h1 className="font-yeseva font-bold text-4xl text-shadow-psm shadow-neutral w-[80dvw] xl:w-[40dvw]">
              {page.content}
            </h1>
          )}
        </AnimateIn>
      </div>

      <Toast toast={toast} setToast={setToast} />
    </div>
  );
};

export default TitleTemplate;
