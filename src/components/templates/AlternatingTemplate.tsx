import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";
import { isEven } from "@/lib/utils/isEven";
import React from "react";

const AlternatingTemplate = ({ wrap, current }: Template) => {
  const page = wrap.pages[current];

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center overflow-hidden">
      <AnimateIn
        from="opacity-0 -translate-y-4"
        to="opacity-100 translate-y-0"
        delay={250}
      >
        <h1 className="font-yeseva text-4xl font-bold mb-4 text-shadow-psm shadow-neutral">
          {page.title}
        </h1>
      </AnimateIn>

      <div className="flex flex-col gap-4 mb-4 max-w-[90%] md:w-[40%]">
        {page.rows &&
          page.rows.map((row, i) => (
            <AnimateIn
              key={i}
              from={`opacity-0 ${isEven(i) ? "-" : ""}translate-x-4`}
              to="opacity-100 translate-x-0"
              delay={250 * (i + 2)}
            >
              <div
                className={`flex ${isEven(i) ? "" : "flex-row-reverse"} gap-4`}
              >
                <div className="aspect-video h-[10dvh] xl:h-[12dvh] max-h-[12dvh] rounded-lg drop-shadow-lg bg-pink-200"></div>

                <div
                  className={`flex flex-col justify-center max-h-[100%] ${
                    isEven(i) ? "" : "items-end text-right"
                  }`}
                >
                  <div className="font-yeseva font-bold text-lg md:text-2xl">
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

export default AlternatingTemplate;
