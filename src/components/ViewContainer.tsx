"use client";

import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

import TitleTemplate from "./templates/TitleTemplate";
import CreditsTemplate from "./templates/CreditsTemplate";
import DefaultTemplate from "./templates/DefaultTemplate";
import ColumnsTemplate from "./templates/ColumnsTemplate";

import { Wrap } from "@/lib/utils/interfaces";
import { PageType } from "@/lib/utils/enums";

const ViewContainer = ({ wrap }: { wrap: Wrap }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const view = document.getElementById("view-container") as HTMLElement;
    view.style.background = wrap.pages[current].bgColor;
    view.style.color = wrap.pages[current].color;
  }, [wrap.pages, current]);

  const renderSwitch = () => {
    switch (wrap.pages[current].type) {
      case PageType.TITLE:
        return <TitleTemplate wrap={wrap} current={current} />;
      case PageType.COLUMNS:
        return <ColumnsTemplate wrap={wrap} current={current} />;
      case PageType.CREDITS:
        return <CreditsTemplate page={wrap.pages[current]} />;
      default:
        return <DefaultTemplate />;
    }
  };

  return (
    <div
      id="view-container"
      className="w-full h-dvh flex flex-col items-center justify-center overflow-hidden view-bg-transition"
    >
      {/* <div className="flex items-center justify-center bg-primary text-black w-96 h-12 absolute top-12">
        Edit Bar
      </div> */}

      {renderSwitch()}

      <Pagination current={current} setCurrent={setCurrent} wrap={wrap} />
    </div>
  );
};

export default ViewContainer;