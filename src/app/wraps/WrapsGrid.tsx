"use client";

import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { TbTrashXFilled } from "react-icons/tb";

import { createNewWrap } from "@/app/actions";

import { auth } from "@/lib/firebase/config";
import { baseURL } from "@/lib/utils/constants";
import { Wrap } from "@/lib/utils/interfaces";

import DeleteWrapModal from "./DeleteWrapModal";

const WrapsGrid = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const [wraps, setWraps] = useState<Wrap[]>([]);
  const [showDeleteWrapModal, setShowDeleteWrapModal] = useState(false);

  useEffect(() => {
    const fetchWraps = async (userUID: string) => {
      const res = await fetch(`${baseURL}/api/wraps?user=${userUID}`, {
        method: "GET",
      });
      const data = await res.json();
      setWraps(data);
    };

    if (user) fetchWraps(user.uid);
  }, [user]);

  const handleEdit = (id: string) => {
    router.push(`/make?id=${id}`);
  };

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`${baseURL}/view?id=${id}`);
  };

  const handleCreate = async () => {
    if (user) {
      const wrap = await createNewWrap(user.uid);
      redirect(`/make?id=${wrap.insertedId}`);
    }
  };

  const toggleDeleteModal = () => {
    setShowDeleteWrapModal(!showDeleteWrapModal);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-yeseva text-3xl font-bold my-4">Your Wraps</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {wraps.map((wrap, i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-4">
            {showDeleteWrapModal && (
              <DeleteWrapModal
                id={wrap._id.toString()}
                wraps={wraps}
                setWraps={setWraps}
                toggleModal={toggleDeleteModal}
              />
            )}

            <div
              className="w-full aspect-video rounded flex items-center justify-center"
              style={{
                backgroundColor: wrap.pages[0].bgColor ?? "#121c22",
              }}
            >
              <h1
                className="font-yeseva text-2xl font-bold text-center"
                style={{ color: wrap.pages[0].color ?? "#9fb9d0" }}
              >
                {wrap.pages[0].title}
              </h1>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                className="btn btn-outline flex-1"
                onClick={() => handleEdit(wrap._id.toString())}
              >
                Edit Wrap
              </button>
              <button
                className="btn btn-primary flex-1"
                onClick={() => handleCopy(wrap._id.toString())}
              >
                Copy Link
              </button>
              <button
                className="btn btn-error btn-square"
                onClick={toggleDeleteModal}
              >
                <TbTrashXFilled className="text-xl" />{" "}
              </button>
            </div>
          </div>
        ))}

        <button className="bg-gray-800 rounded-lg p-4" onClick={handleCreate}>
          <div className="w-full aspect-video rounded flex items-center justify-center outline-dashed">
            <h1 className="font-yeseva text-6xl font-bold text-center">+</h1>
          </div>
          <div className="flex justify-center items-center h-12 gap-2 mt-4 text-center">
            <h1 className="font-yeseva text-2xl font-bold">Create New</h1>
          </div>
        </button>
      </div>
    </>
  );
};

export default WrapsGrid;
