import React from "react";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";

const CreditsTemplate = (props: Template) => {
  const { wrap, current } = props;

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

      {/* TODO: Add more to Credits */}
    </div>
  );
};

export default CreditsTemplate;
