import { Page } from "@/lib/utils/interfaces";
import React from "react";

const TitleTemplate = ({ page }: { page: Page }) => {
  return (
    <div
      className="w-full h-dvh flex flex-col items-center justify-center text-center"
      style={{
        background: page.bgColor,
        color: page.color,
      }}
    >
      <h1 className="text-8xl font-bold mb-4">This is a title</h1>
      <h1 className="text-4xl font-bold">This is a subtitle</h1>
    </div>
  );
};

export default TitleTemplate;
