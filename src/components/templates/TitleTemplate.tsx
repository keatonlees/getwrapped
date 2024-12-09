import React, { useState } from "react";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";

const TitleTemplate = (props: Template) => {
  const { editing, wrap, current, pageData, setPageData } = props;

  const page = wrap.pages[current];

  const [title, setTitle] = useState(page.title || "");
  const [content, setContent] = useState(page.content || "");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setPageData({ ...pageData, title: e.target.value });
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setPageData({ ...pageData, content: e.target.value });
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center">
      <div className="flex flex-col gap-2 items-center justify-center w-[90dvw] xl:w-[50dvw] h-full">
        <AnimateIn
          from="opacity-0 translate-y-4"
          to="opacity-100 translate-y-0"
          delay={250}
        >
          {editing ? (
            <input
              className="input input-ghost font-yeseva font-bold text-8xl text-center w-full h-full"
              maxLength={20}
              defaultValue={title}
              onChange={handleTitle}
            />
          ) : (
            <h1 className="font-yeseva font-bold text-8xl text-shadow-p shadow-neutral mb-4">
              {page.title}
            </h1>
          )}
        </AnimateIn>

        <AnimateIn
          from="opacity-0 translate-y-4"
          to="opacity-100 translate-y-0"
          delay={500}
        >
          {editing ? (
            <textarea
              className="input input-ghost font-yeseva font-bold text-4xl text-center resize-none overflow-auto w-[80dvw] xl:w-[40dvw] h-24"
              maxLength={80}
              defaultValue={content}
              onChange={handleContent}
            />
          ) : (
            <h1 className="font-yeseva font-bold text-4xl text-shadow-psm shadow-neutral w-[80dvw] xl:w-[40dvw]">
              {page.content}
            </h1>
          )}
        </AnimateIn>
      </div>
    </div>
  );
};

export default TitleTemplate;
