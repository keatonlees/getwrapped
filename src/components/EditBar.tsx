import { Page } from "@/lib/utils/interfaces";
import React from "react";

interface EditBar {
  page: Page;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const EditBar = ({ page, setBgColor, setColor }: EditBar) => {
  return (
    <div className="flex items-center justify-center bg-neutral text-black absolute p-2 top-4 rounded-xl">
      <button className="btn btn-primary btn-md">Save Page</button>

      <div className="divider divider-horizontal"></div>

      <label className="flex items-center gap-1 text-white">
        Background:
        <input
          type="color"
          className="bg-transparent"
          defaultValue={page.bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </label>

      <div className="divider divider-horizontal"></div>

      <label className="flex items-center gap-1 text-white">
        Accent:
        <input
          type="color"
          className="bg-transparent"
          defaultValue={page.color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
    </div>
  );
};

export default EditBar;
