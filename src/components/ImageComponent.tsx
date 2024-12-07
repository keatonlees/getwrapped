/* eslint-disable @next/next/no-img-element */
import React from "react";
import { TbUpload, TbTrashXFilled } from "react-icons/tb";

import placeholder from "../../public/placeholder.svg";

interface ImageComponent {
  src: string | undefined;
  i: number;
  editing: boolean;
  files: (File | undefined)[];
  fileURLs: (string | undefined)[];
  pageImageData: (File | undefined)[];
  setFiles: React.Dispatch<React.SetStateAction<(File | undefined)[]>>;
  setFileURLs: React.Dispatch<React.SetStateAction<(string | undefined)[]>>;
  setPageImageData: React.Dispatch<React.SetStateAction<(File | undefined)[]>>;
}

const ImageComponent = (props: ImageComponent) => {
  const {
    src,
    i,
    editing,
    files,
    fileURLs,
    pageImageData,
    setFiles,
    setFileURLs,
    setPageImageData,
  } = props;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // resize file? handle multiple files on page

    const newFiles = [...files];
    const newFileURLs = [...fileURLs];

    newFiles[i] = file;
    setFiles(newFiles);
    setPageImageData(newFiles);

    if (fileURLs[i]) URL.revokeObjectURL(fileURLs[i]);
    if (file) {
      const url = URL.createObjectURL(file);
      newFileURLs[i] = url;
      setFileURLs(newFileURLs);
    } else {
      newFileURLs[i] = undefined;
      setFileURLs(newFileURLs);
    }
  };

  const handleDiscard = () => {
    const newFiles = [...files];
    newFiles[i] = undefined;
    setFiles(newFiles);

    const newFileURLs = [...fileURLs];
    newFileURLs[i] = undefined;
    setFileURLs(newFileURLs);
  };

  // TODO: compress images / limit upload size?

  return (
    <div className="w-full h-full flex items-center justify-center outline rounded-lg drop-shadow-lg overflow-hidden ">
      {/* Preview */}
      <img
        src={fileURLs[i] || src || placeholder.src}
        alt="file"
        className="aspect-video object-cover"
      />

      {/* Upload Button */}
      {editing && (
        <label className="btn btn-primary btn-sm absolute bottom-2 left-2">
          <TbUpload className="text-xl" />
          <input
            type="file"
            className="hidden"
            name="media"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleUpload}
          />
        </label>
      )}

      {/* Discard Button */}
      {fileURLs[i] && files[i] && pageImageData[i] && (
        <button
          className="btn-error btn-sm absolute bottom-2 right-2 btn"
          onClick={handleDiscard}
        >
          <TbTrashXFilled className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default ImageComponent;
