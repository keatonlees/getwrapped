import Image from "next/image";
import React from "react";
import { TbUpload, TbTrashXFilled } from "react-icons/tb";

import placeholder from "../../public/placeholder.svg";

interface ImageComponent {
  src: string | undefined;
  editing: boolean;
  file: File | undefined;
  fileURL: string | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setFileURL: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ImageComponent = (props: ImageComponent) => {
  const { src, editing, file, fileURL, setFile, setFileURL } = props;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);

    if (fileURL) URL.revokeObjectURL(fileURL);

    if (file) {
      const url = URL.createObjectURL(file);
      setFileURL(url);
    } else {
      setFileURL(undefined);
    }
  };

  const handleDiscard = () => {
    setFile(undefined);
    setFileURL(undefined);
  };

  return (
    <div className="w-full h-full flex items-center justify-center outline rounded-lg drop-shadow-lg overflow-hidden ">
      <form>
        {/* Preview */}
        <div className="w-full h-full flex">
          {fileURL && file ? (
            <Image
              src={fileURL}
              alt="file"
              fill={true}
              className="object-cover"
            />
          ) : (
            <Image
              src={src || placeholder}
              alt="placeholder"
              fill={true}
              className="object-cover"
            />
          )}
        </div>

        {/* Upload */}
        {editing && (
          <label className="btn btn-primary absolute bottom-2 left-2">
            <TbUpload className="text-xl" />
            Upload
            <input
              type="file"
              className="hidden"
              name="media"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleUpload}
            />
          </label>
        )}

        {/* Discard */}
        {fileURL && file && (
          <button
            className="btn-error absolute bottom-2 right-2 btn"
            onClick={handleDiscard}
          >
            <TbTrashXFilled className="text-xl" />
            Discard
          </button>
        )}
      </form>
    </div>
  );
};

export default ImageComponent;
