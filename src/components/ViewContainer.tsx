"use client";

import React, { useEffect, useState } from "react";
import { Wrap } from "@/lib/utils/interfaces";
import { PageType } from "@/lib/utils/enums";

import EditBar from "../app/make/[id]/EditBar";
import Pagination from "./Pagination";

import TitleTemplate from "./templates/TitleTemplate";
import CreditsTemplate from "./templates/CreditsTemplate";
import SingleTemplate from "./templates/SingleTemplate";
import SplitTemplate from "./templates/SplitTemplate";
import RowsTemplate from "./templates/RowsTemplate";
import AlternatingTemplate from "./templates/AlternatingTemplate";
import ColumnsTemplate from "./templates/ColumnsTemplate";

interface ViewContainer {
  id?: string;
  wrap: Wrap;
  editing: boolean;
}

const ViewContainer = ({ id, wrap, editing }: ViewContainer) => {
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
        return (
          <TitleTemplate wrap={wrap} current={current} editing={editing} />
        );
      case PageType.SINGLE:
        return (
          <SingleTemplate
            wrap={wrap}
            current={current}
            editing={editing}
            bgColor={bgColor}
            color={color}
            setBgColor={setBgColor}
            setColor={setColor}
          />
        );
      case PageType.SPLIT:
        return (
          <SplitTemplate wrap={wrap} current={current} editing={editing} />
        );
      case PageType.COLUMNS:
        return (
          <ColumnsTemplate wrap={wrap} current={current} editing={editing} />
        );
      case PageType.ROWS:
        return <RowsTemplate wrap={wrap} current={current} editing={editing} />;
      case PageType.ALTERNATING:
        return (
          <AlternatingTemplate
            wrap={wrap}
            current={current}
            editing={editing}
          />
        );
      case PageType.CREDITS:
        return <CreditsTemplate />;
      default:
        return (
          <SingleTemplate wrap={wrap} current={current} editing={editing} />
        );
    }
  };

  return (
    <div
      id="view"
      className="w-full h-dvh flex flex-col items-center justify-center overflow-hidden"
    >
      {/* {editing && wrap.pages[current] && (
        <EditBar
          id={id}
          page={wrap.pages[current]}
          setBgColor={setBgColor}
          setColor={setColor}
        />
      )} */}

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
