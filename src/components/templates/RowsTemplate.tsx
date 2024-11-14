import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";
import React from "react";

const RowsTemplate = ({ wrap, current }: Template) => {
  const page = wrap.pages[current];

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center overflow-hidden">
      <AnimateIn from="opacity-0 -translate-y-4" to="opacity-100 translate-y-0">
        <h1 className="font-yeseva text-4xl font-bold mb-4 text-shadow-psm shadow-neutral">
          {page.title}
        </h1>
      </AnimateIn>

      <div className="flex flex-col gap-4 mb-4 max-w-[90%] md:max-w-[50%]">
        {page.rows &&
          page.rows.map((row, i) => (
            <AnimateIn
              key={i}
              from="opacity-0 -translate-x-4"
              to="opacity-100 translate-x-0"
              delay={200 * i}
            >
              <div className="flex gap-4">
                <div className="aspect-video h-[9dvh] 2xl:h-[11dvh] max-h-[11dvh] rounded-lg drop-shadow-lg bg-pink-200"></div>
                <div className="flex flex-col justify-center max-h-[100%]">
                  <div className="font-yeseva font-bold text-lg md:text-xl">
                    {row.title}
                  </div>
                  <div className="text-sm md:text-md">{row.content}</div>
                </div>
              </div>
            </AnimateIn>
          ))}
      </div>
    </div>
  );
};

export default RowsTemplate;
