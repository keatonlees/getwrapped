import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";
import React from "react";

const SingleTemplate = ({ wrap, current }: Template) => {
  const page = wrap.pages[current];

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center overflow-hidden">
      <AnimateIn
        from="opacity-0 translate-y-4"
        to="opacity-100 translate-y-0"
        delay={250}
        as="div"
      >
        <div className="aspect-video w-[80dvw] 2xl:w-[40dvw] rounded-lg drop-shadow-lg bg-pink-200"></div>
      </AnimateIn>

      <div className="flex flex-col items-center max-w-[100%]">
        <AnimateIn
          from="opacity-0 translate-y-4"
          to="opacity-100 translate-y-0"
          delay={500}
        >
          <h1 className="font-yeseva text-4xl font-bold my-4 text-shadow-psm shadow-neutral">
            {page.title}
          </h1>
        </AnimateIn>

        <AnimateIn
          from="opacity-0 translate-y-4"
          to="opacity-100 translate-y-0"
          delay={750}
        >
          <h1 className="text-sm md:text-md">{page.content}</h1>
        </AnimateIn>
      </div>
    </div>
  );
};

export default SingleTemplate;
