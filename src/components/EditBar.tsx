import { Page } from "@/lib/utils/interfaces";
import React from "react";
import { FaUndoAlt, FaSave, FaPlus } from "react-icons/fa";

interface EditBar {
  page: Page;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const EditBar = ({ page, setBgColor, setColor }: EditBar) => {
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

  return (
    <div className="flex h-12 items-center justify-center absolute top-4 gap-2">
      <button className="btn btn-primary btn-md">
        <FaSave className="text-lg" />
        Save Page
      </button>

      <div className="flex h-12 items-center justify-center p-4 bg-neutral rounded-xl">
        <label className="flex items-center gap-2 text-white">
          Page:
          <input
            id="bgColorInput"
            type="color"
            className="rounded w-6 h-6 hover:cursor-pointer"
            defaultValue={page.bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
          <button onClick={resetBgColor}>
            <FaUndoAlt />
          </button>
        </label>

        <div className="divider divider-horizontal mx-1"></div>

        <label className="flex items-center gap-2 text-white">
          Accent:
          <input
            id="colorInput"
            type="color"
            className="rounded w-6 h-6"
            defaultValue={page.color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button onClick={resetColor}>
            <FaUndoAlt />
          </button>
        </label>
      </div>
      <button className="btn btn-success btn-md">
        <FaPlus className="text-lg" />
        Add Page
      </button>
    </div>
  );
};

export default EditBar;
