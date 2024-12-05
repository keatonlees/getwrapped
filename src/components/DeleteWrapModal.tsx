import React, { useState } from "react";

import { deleteWrapById } from "@/app/actions";

import { Wrap } from "@/lib/utils/interfaces";

interface DeleteWrapModal {
  id: string;
  wraps: Wrap[];
  setWraps: React.Dispatch<React.SetStateAction<Wrap[]>>;
  toggleModal: () => void;
}

const DeleteWrapModal = (props: DeleteWrapModal) => {
  const { id, wraps, setWraps, toggleModal } = props;

  const [loading, setLoading] = useState(false);

  const deleteWrap = async () => {
    setLoading(true);

    await deleteWrapById(id);
    const filteredWraps = wraps.filter((wrap) => wrap._id.toString() !== id);
    setWraps(filteredWraps);
    toggleModal();
    setLoading(false);
  };

  return (
    <div className="fixed w-full h-full flex items-center justify-center top-0 left-0 overflow-hidden">
      <div className="bg-neutral text-white p-4 rounded-lg z-20 w-[80%] md:w-[30%] flex flex-col items-center">
        <h1>Delete Wrap?</h1>
        {loading ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          <div className="flex w-full gap-4 mt-2">
            <button className="btn btn-primary flex-1" onClick={toggleModal}>
              Cancel
            </button>
            <button className="btn btn-error flex-1" onClick={deleteWrap}>
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

export default DeleteWrapModal;
