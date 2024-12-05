import React from "react";

import { PageType } from "@/lib/utils/enums";
import { Template } from "@/lib/utils/interfaces";

import AlternatingTemplate from "./templates/AlternatingTemplate";
// import ColumnsTemplate from "./templates/ColumnsTemplate";
import CreditsTemplate from "./templates/CreditsTemplate";
// import RowsTemplate from "./templates/RowsTemplate";
import SingleTemplate from "./templates/SingleTemplate";
import SplitTemplate from "./templates/SplitTemplate";
import TitleTemplate from "./templates/TitleTemplate";

const RenderSwitch = (props: Template) => {
  const { editing, wrap, current, pageData, setPageData } = props;

  if (!wrap.pages[current]) return;

  const template = {
    editing: editing,
    wrap: wrap,
    current: current,
    pageData: pageData,
    setPageData: setPageData,
  };

  switch (wrap.pages[current].type) {
    case PageType.TITLE:
      return <TitleTemplate {...template} />;

    case PageType.SINGLE:
      return <SingleTemplate {...template} />;

    case PageType.SPLIT:
      return <SplitTemplate {...template} />;

    // case PageType.COLUMNS:
    //   return <ColumnsTemplate {...template} />;

    // case PageType.ROWS:
    //   return <RowsTemplate {...template} />;

    case PageType.ALTERNATING:
      return <AlternatingTemplate {...template} />;

    case PageType.CREDITS:
      return <CreditsTemplate {...template} />;
  }

  return (
    <h1 className="font-yeseva text-4xl font-bold my-4 text-shadow-psm shadow-neutral">
      Could not load template
    </h1>
  );
};

export default RenderSwitch;
