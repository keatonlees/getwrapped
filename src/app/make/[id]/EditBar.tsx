import React from "react";
import { FaSave, FaPlus } from "react-icons/fa";
import { TbTrashXFilled, TbExternalLink } from "react-icons/tb";

import { baseURL } from "@/lib/utils/constants";
import { Page } from "@/lib/utils/interfaces";

interface EditBar {
  id: string;
  page: Page;
  length: number;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  savePage: () => void;
}

const EditBar = (props: EditBar) => {
  const { id, page, length, setBgColor, setColor, savePage } = props;

  const resetBgColor = () => {
    (document.getElementById("bgColorInput") as HTMLInputElement).value =
      page.bgColor;
    setBgColor(page.bgColor);
  };

  const resetColor = () => {
    (document.getElementById("colorInput") as HTMLInputElement).value =
      page.color;
    setColor(page.color);
  };

  const openPreview = () => {
    if (id) window.open(`${baseURL}/view/${id}`, "_blank");
  };

  const addPage = () => {
    console.log(length);
  };

  return (
    <div className="flex h-12 items-center justify-center absolute top-4 gap-2">
      <button onClick={savePage} className="btn btn-primary btn-md">
        <FaSave className="text-lg" />
        <span className="hidden md:block">Save Page</span>
      </button>

      <div className="flex h-12 items-center justify-center pl-4 pr-2 bg-neutral rounded-xl">
        <label className="flex items-center gap-2 text-white">
          <div className="hidden md:block">Page:</div>
          <input
            id="bgColorInput"
            type="color"
            className="rounded w-6 h-6 hover:cursor-pointer"
            defaultValue={page.bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
          <button onClick={resetBgColor}>
            <TbTrashXFilled className="text-xl" />
          </button>
        </label>

        <div className="divider divider-horizontal mx-1"></div>

        <label className="flex items-center gap-2 text-white mr-1 md:mr-0">
          <div className="hidden md:block">Accent:</div>
          <input
            id="colorInput"
            type="color"
            className="rounded w-6 h-6"
            defaultValue={page.color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button onClick={resetColor}>
            <TbTrashXFilled className="text-xl" />
          </button>
        </label>

        <div className="divider divider-horizontal ml-1 mr-0 hidden md:flex"></div>

        <label className="items-center gap-2 text-white hidden md:block">
          <button
            onClick={openPreview}
            className="btn btn-ghost btn-sm rounded-md"
          >
            Preview
            <TbExternalLink className="text-xl" />
          </button>
        </label>
      </div>
      <button
        className="btn btn-success btn-md"
        disabled={length >= 10}
        onClick={addPage}
      >
        <FaPlus className="text-lg" />
        <span className="hidden md:block">Add Page</span>
      </button>
      <button
        className="btn btn-error btn-md"
        disabled={length >= 10}
        onClick={addPage}
      >
        <TbTrashXFilled className="text-xl" />
        <span className="hidden md:block">Delete Page</span>
      </button>
    </div>
  );
};

export default EditBar;
