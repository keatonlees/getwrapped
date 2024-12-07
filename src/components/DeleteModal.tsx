import React, { useState } from "react";

import { deleteImageById, updateWrapPage } from "@/app/make/actions";
import { getWrapById } from "@/app/view/actions";

import { Page, Wrap } from "@/lib/utils/interfaces";

interface DeleteModal {
  id: string;
  page: Page;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setWrap: React.Dispatch<React.SetStateAction<Wrap>>;
  setToast: React.Dispatch<React.SetStateAction<string>>;
  toggleModal: () => void;
}

const DeleteModal = (props: DeleteModal) => {
  const { id, page, current, setCurrent, setWrap, setToast, toggleModal } =
    props;

  const [loading, setLoading] = useState(false);

  const deletePage = async () => {
    setLoading(true);

    // delete image from AWS S3 if it exists
    if (page.items) {
      page.items.forEach((item) => {
        if (item.imageURL) {
          const oldImageId = item.imageURL.split("/")[3] ?? "";
          if (oldImageId) deleteImageById(oldImageId);
        }
      });
    }

    // TODO: predictive success here?
    await updateWrapPage(id, { $unset: { [`pages.${current}`]: null } });
    await updateWrapPage(id, { $pull: { pages: null } });
    setWrap(await getWrapById(id));

    toggleModal();
    setCurrent(current - 1);
    setToast("Deleted page!");

    setLoading(false);
  };

  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <div className="bg-neutral text-white p-4 rounded-lg z-20 w-[80%] md:w-[30%] flex flex-col items-center">
        <h1>Delete Current Page?</h1>
        {loading ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          <div className="flex w-full gap-4 mt-2">
            <button className="btn btn-primary flex-1" onClick={toggleModal}>
              Cancel
            </button>
            <button className="btn btn-error flex-1" onClick={deletePage}>
              Delete
            </button>
          </div>
        )}
      </div>

      <div
        className="absolute w-full h-full bg-neutral opacity-50 z-10"
        onClick={toggleModal}
      ></div>
    </div>
  );
};

export default DeleteModal;
