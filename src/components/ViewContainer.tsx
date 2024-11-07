"use client";

import React, { useState } from "react";
import Pagination from "./Pagination";

import TitleTemplate from "./templates/TitleTemplate";
import CreditsTemplate from "./templates/CreditsTemplate";
import DefaultTemplate from "./templates/DefaultTemplate";

import { Wrap } from "@/lib/utils/interfaces";
import { PageType } from "@/lib/utils/enums";

const ViewContainer = ({ wrap }: { wrap: Wrap }) => {
  const [current, setCurrent] = useState(0);
  const length = wrap.pages.length;

  const renderSwitch = () => {
    switch (wrap.pages[current].type) {
      case PageType.TITLE:
        return <TitleTemplate />;
      case PageType.CREDITS:
        return <CreditsTemplate />;
      default:
        return <DefaultTemplate />;
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center">
      {renderSwitch()}

      <Pagination current={current} setCurrent={setCurrent} length={length} />
    </div>
  );
};

export default ViewContainer;
