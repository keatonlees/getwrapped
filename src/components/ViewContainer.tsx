"use client";

import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

import TitleTemplate from "./templates/TitleTemplate";
import CreditsTemplate from "./templates/CreditsTemplate";
import SingleTemplate from "./templates/SingleTemplate";
import ColumnsTemplate from "./templates/ColumnsTemplate";

import { Wrap } from "@/lib/utils/interfaces";
import { PageType } from "@/lib/utils/enums";
import RowsTemplate from "./templates/RowsTemplate";
import AlternatingTemplate from "./templates/AlternatingTemplate";
import SplitTemplate from "./templates/SplitTemplate";
import EditBar from "./EditBar";

const ViewContainer = ({ wrap }: { wrap: Wrap }) => {
  const [current, setCurrent] = useState(0);

  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const view = document.getElementById("view") as HTMLElement;
    if (wrap.pages[current]) {
      document.body.style.backgroundColor =
        bgColor || wrap.pages[current].bgColor;
      view.style.color = color || wrap.pages[current].color;
    }
  }, [wrap.pages, current, bgColor, color]);

  const renderSwitch = () => {
    if (!wrap.pages[current]) return;

    switch (wrap.pages[current].type) {
      case PageType.TITLE:
        return <TitleTemplate wrap={wrap} current={current} />;
      case PageType.SINGLE:
        return <SingleTemplate wrap={wrap} current={current} />;
      case PageType.SPLIT:
        return <SplitTemplate wrap={wrap} current={current} />;
      case PageType.COLUMNS:
        return <ColumnsTemplate wrap={wrap} current={current} />;
      case PageType.ROWS:
        return <RowsTemplate wrap={wrap} current={current} />;
      case PageType.ALTERNATING:
        return <AlternatingTemplate wrap={wrap} current={current} />;
      case PageType.CREDITS:
        return <CreditsTemplate />;
      default:
        return <SingleTemplate wrap={wrap} current={current} />;
    }
  };

  return (
    <div
      id="view"
      className="w-full h-dvh flex flex-col items-center justify-center overflow-hidden"
    >
      {wrap.pages[current] && (
        <EditBar
          page={wrap.pages[current]}
          setBgColor={setBgColor}
          setColor={setColor}
        />
      )}

      {renderSwitch()}

      <Pagination
        current={current}
        setCurrent={setCurrent}
        wrap={wrap}
        setBgColor={setBgColor}
        setColor={setColor}
      />
    </div>
  );
};

export default ViewContainer;
