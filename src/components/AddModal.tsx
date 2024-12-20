import Image from "next/image";
import React from "react";

import { updateWrapPage } from "@/app/make/actions";
import { getWrapById } from "@/app/view/actions";

import {
  alternatingPage,
  rowsPage,
  singlePage,
  splitPage,
  statsPage,
  summaryPage,
} from "@/lib/utils/constants";
import { Wrap } from "@/lib/utils/interfaces";

interface AddModal {
  id: string;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setWrap: React.Dispatch<React.SetStateAction<Wrap>>;
  setToast: React.Dispatch<React.SetStateAction<string>>;
  toggleModal: () => void;
}

const AddModal = (props: AddModal) => {
  const { id, current, setCurrent, setWrap, setToast, toggleModal } = props;

  const [loading, setLoading] = React.useState(false);
  const newPages = [
    singlePage,
    splitPage,
    alternatingPage,
    rowsPage,
    statsPage,
    summaryPage,
  ];

  const addPage = async (pageTemplate: object) => {
    setLoading(true);

    await updateWrapPage(id, {
      $push: { pages: { $each: [pageTemplate], $position: current + 1 } },
    });
    setWrap(await getWrapById(id));
    toggleModal();
    setCurrent(current + 1);
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
