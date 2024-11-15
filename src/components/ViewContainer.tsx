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

const ViewContainer = ({ wrap }: { wrap: Wrap }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const view = document.getElementById("view-container") as HTMLElement;
    if (current !== -1) {
      view.style.background = wrap.pages[current].bgColor;
      view.style.color = wrap.pages[current].color;
    }
  }, [wrap.pages, current]);

  const renderSwitch = () => {
    if (current === -1) return;

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
      id="view-container"
      className="w-full h-dvh flex flex-col items-center justify-center overflow-hidden view-bg-transition"
    >
      <div className="flex items-center justify-center bg-neutral text-black w-[60%] h-12 absolute top-4 rounded-lg"></div>

      {renderSwitch()}

      <Pagination current={current} setCurrent={setCurrent} wrap={wrap} />
    </div>
  );
};

export default ViewContainer;
