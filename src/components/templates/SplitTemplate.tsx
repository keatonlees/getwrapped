import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";
import { isEven } from "@/lib/utils/isEven";
import React from "react";

const SplitTemplate = ({ wrap, current }: Template) => {
  const page = wrap.pages[current];

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center overflow-hidden">
      <AnimateIn
        from="opacity-0 -translate-y-4"
        to="opacity-100 translate-y-0"
        delay={250}
      >
        <h1 className="font-yeseva text-4xl font-bold mb-4 text-shadow-psm shadow-neutral">
          {page.title}
        </h1>
      </AnimateIn>

      <div className="h-fit flex flex-col md:flex-row justify-between gap-4 md:gap-32 mb-4">
        {page.columns &&
          page.columns.map((col, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <AnimateIn
                from={`opacity-0 ${isEven(i) ? "-" : ""}translate-x-4`}
                to="opacity-100 translate-y-0"
                delay={250 * (i + 2)}
              >
                <div className="aspect-video w-[65dvw] sm:w-[60dvw] md:w-[32dvw] rounded-lg drop-shadow-lg bg-pink-200"></div>
                <div className="font-yeseva font-bold text-lg md:text-2xl my-1">
                  {col.title}
                </div>
                <div className="text-sm 2xl:text-md">{col.content}</div>
              </AnimateIn>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SplitTemplate;
