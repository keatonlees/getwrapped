import React from "react";
import { Template } from "@/lib/utils/interfaces";
import AnimateIn from "@/lib/animations/AnimateIn";

const TitleTemplate = ({ wrap, current, editing }: Template) => {
  const page = wrap.pages[current];

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center">
      <AnimateIn
        from="opacity-0 translate-y-4"
        to="opacity-100 translate-y-0"
        delay={250}
      >
        <h1 className="font-yeseva text-8xl font-bold text-shadow-p shadow-neutral mb-4">
          {wrap.title}
        </h1>
      </AnimateIn>
      <AnimateIn
        from="opacity-0 translate-y-4"
        to="opacity-100 translate-y-0"
        delay={500}
      >
        <h1 className="font-yeseva text-4xl font-bold text-shadow-psm shadow-neutral">
          {page.subtitle}
        </h1>
      </AnimateIn>
    </div>
  );
};

export default TitleTemplate;
