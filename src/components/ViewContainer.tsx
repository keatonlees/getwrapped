"use client";

import React, { useEffect, useState } from "react";

import { Wrap } from "@/lib/utils/interfaces";

import Pagination from "./Pagination";
import RenderSwitch from "./RenderSwitch";

interface ViewContainer {
  wrap: Wrap;
  editing: boolean;
}

const ViewContainer = (props: ViewContainer) => {
  const { editing } = props;

  const [wrap, setWrap] = useState(props.wrap);
  const [current, setCurrent] = useState(0);
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");

  // live update background and font colors
  useEffect(() => {
    const viewContainer = document.getElementById(
      "view-container"
    ) as HTMLElement;

    if (wrap.pages[current]) {
      document.body.style.backgroundColor =
        bgColor || wrap.pages[current].bgColor;
      viewContainer.style.color = color || wrap.pages[current].color;
    }
  }, [wrap, current, bgColor, color]);

  return (
    <div
      id="view-container"
      className="w-full h-dvh flex flex-col items-center justify-center overflow-hidden"
    >
      <RenderSwitch
        editing={editing}
        wrap={wrap}
        current={current}
        bgColor={bgColor}
        color={color}
        setWrap={setWrap}
        setBgColor={setBgColor}
        setColor={setColor}
      />

      <Pagination
        wrap={wrap}
        current={current}
        setCurrent={setCurrent}
        setBgColor={setBgColor}
        setColor={setColor}
      />
    </div>
  );
};

export default ViewContainer;
