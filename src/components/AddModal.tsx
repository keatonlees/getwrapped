import Image from "next/image";
import React from "react";

import { updateWrapPage } from "@/app/make/actions";
import { getWrapById } from "@/app/view/actions";

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
  const newPages = [singlePage, splitPage, alternatingPage];

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
      <div className="bg-neutral text-white p-4 rounded-lg z-20 w-[90%] md:w-[50%] flex flex-col items-center">
        <h1>Add New Page</h1>
        {loading ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 my-4">
              {newPages.map((page, i) => {
                return (
                  <div
                    key={i}
                    className="btn btn-success flex flex-col items-center justify-center h-full p-2 overflow-hidden"
                    onClick={() => addPage(newPages[i])}
                  >
                    <Image
                      src={`/images/${page.type}.png`}
                      alt="page icon"
                      className="rounded"
                      width={400}
                      height={50}
                    />
                    <h1 className="text-xs md:text-md">
                      {page.type.toUpperCase()}
                    </h1>
                  </div>
                );
              })}
            </div>
            <button className="btn btn-primary" onClick={toggleModal}>
              Cancel
            </button>
          </>
        )}
      </div>

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
  bgColor: "#121c22",
  color: "#9fb9d0",
  title: "This is a title",
  content: "This is content",
  imageURL: "",
};
const splitPage = {
  type: "split",
  bgColor: "#121c22",
  color: "#9fb9d0",
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
  bgColor: "#121c22",
  color: "#9fb9d0",
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
