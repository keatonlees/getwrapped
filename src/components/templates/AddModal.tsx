import React from "react";

import { updateWrapPage } from "@/app/make/[id]/actions";
import { getWrapById } from "@/app/view/[id]/actions";

import { Wrap } from "@/lib/utils/interfaces";

interface AddModal {
  id: string;
  current: number;
  setWrap: React.Dispatch<React.SetStateAction<Wrap>>;
  setToast: React.Dispatch<React.SetStateAction<string>>;
  toggleModal: () => void;
}

const AddModal = (props: AddModal) => {
  const { id, current, setWrap, setToast, toggleModal } = props;

  const [loading, setLoading] = React.useState(false);

  const addPage = async (pageTemplate: object) => {
    setLoading(true);

    await updateWrapPage(id, {
      $push: { pages: { $each: [pageTemplate], $position: current + 1 } },
    });
    setWrap(await getWrapById(id));
    toggleModal();
    setToast("Added page!");
    setLoading(false);
  };

  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      {loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <div className="bg-neutral text-white p-4 rounded-lg z-20 w-[80%] md:w-[40%] flex flex-col">
          Add a New Page
          <div className="grid grid-cols-3 gap-4 my-4">
            <button
              className="btn btn-success"
              onClick={() => addPage(singlePage)}
            >
              Single
            </button>
            <button
              className="btn btn-success"
              onClick={() => addPage(splitPage)}
            >
              Split
            </button>
            <button
              className="btn btn-success"
              onClick={() => addPage(alternatingPage)}
            >
              Alternating
            </button>
          </div>
          <button className="btn btn-error" onClick={toggleModal}>
            Cancel
          </button>
        </div>
      )}

      <div
        className="absolute w-full h-full bg-neutral opacity-50 z-10"
        onClick={toggleModal}
      ></div>
    </div>
  );
};

export default AddModal;

const singlePage = {
  type: "single",
  bgColor: "#c8a4f4",
  color: "#668cff",
  title: "Title here",
  content: "Subtitle here",
  imageURL: "",
};
const splitPage = {
  type: "split",
  bgColor: "#c8a4f4",
  color: "#668cff",
  title: "Split Page",
  items: [
    {
      title: "Title 1",
      content: "Content 1",
      imageURL: "",
    },
    {
      title: "Title 2",
      content: "Content 2",
      imageURL: "",
    },
  ],
};
const alternatingPage = {
  type: "alternating",
  bgColor: "#c8a4f4",
  color: "#668cff",
  title: "Alternating Page",
  items: [
    {
      title: "Title 1",
      content: "Content 1",
      imageURL: "",
    },
    {
      title: "Title 2",
      content: "Content 2",
      imageURL: "",
    },
    {
      title: "Title 3",
      content: "Content 3",
      imageURL: "",
    },
    {
      title: "Title 4",
      content: "Content 4",
      imageURL: "",
    },
  ],
};
