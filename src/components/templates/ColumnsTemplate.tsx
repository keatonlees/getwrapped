"use client";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";
import useWindowDimensions from "@/lib/utils/window";
import React from "react";

const ColumnsTemplate = ({ wrap, current }: Template) => {
  const page = wrap.pages[current];
  const { width } = useWindowDimensions();

  const DesktopView = () => {
    return (
      <div className="h-fit flex justify-between gap-8 xl:gap-16 mb-8">
        {page.columns &&
          page.columns.map((col, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center 2xl:max-w-60 xl:max-w-40"
            >
              <AnimateIn
                from="opacity-0 translate-y-4"
                to="opacity-100 translate-y-0"
                delay={250 * (i + 2)}
              >
                <div className="aspect-square w-40 2xl:w-60 rounded-lg drop-shadow-lg bg-pink-200"></div>
                <div className="font-yeseva font-bold text-lg 2xl:text-2xl my-4">
                  {col.title}
                </div>
                <div className="text-sm 2xl:text-md">{col.content}</div>
              </AnimateIn>
            </div>
          ))}
      </div>
    );
  };

  // TODO: Mobile View
  const MobileView = () => {
    // const [column, setColumn] = useState(0);

    return <div>Mobile</div>;
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center overflow-hidden">
      <AnimateIn
        from="opacity-0 -translate-y-4"
        to="opacity-100 translate-y-0"
        delay={250}
      >
        <h1 className="font-yeseva text-4xl font-bold mb-8 text-shadow-psm shadow-neutral">
          {page.title}
        </h1>
      </AnimateIn>

      {width < 1024 ? <MobileView /> : <DesktopView />}
    </div>
  );
};

export default ColumnsTemplate;
