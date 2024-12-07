import React, { useState } from "react";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";
import { isEven } from "@/lib/utils/isEven";

import ImageComponent from "../ImageComponent";

const SplitTemplate = (props: Template) => {
  const {
    editing,
    wrap,
    current,
    pageData,
    pageImageData,
    setPageData,
    setPageImageData,
  } = props;

  const page = wrap.pages[current];

  const [title, setTitle] = useState(page.title || "");
  const [items, setItems] = useState(page.items || []);

  const [files, setFiles] = useState<(File | undefined)[]>([
    undefined,
    undefined,
  ]);
  const [fileURLs, setFileURLs] = useState<(string | undefined)[]>([
    undefined,
    undefined,
  ]);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setPageData({ ...pageData, title: e.target.value });
  };

  const handleItemTitles = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const newItems = [...items];
    newItems[i].title = e.target.value;
    setItems(newItems);
    setPageData({ ...pageData, items: newItems });
  };

  const handleItemContents = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    i: number
  ) => {
    const newItems = [...items];
    newItems[i].content = e.target.value;
    setItems(newItems);
    setPageData({ ...pageData, items: newItems });
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center overflow-hidden">
      <AnimateIn
        from="opacity-0 -translate-y-4"
        to="opacity-100 translate-y-0"
        delay={250}
      >
        {editing ? (
          <input
            className="input input-ghost font-yeseva font-bold text-4xl text-center w-full"
            maxLength={20}
            defaultValue={title}
            onChange={handleTitle}
          />
        ) : (
          <h1 className="font-yeseva font-bold text-4xl w-full text-shadow-psm shadow-neutral mb-4">
            {page.title}
          </h1>
        )}
      </AnimateIn>

      <div className="h-fit flex flex-col md:flex-row justify-between gap-4 md:gap-32 mb-4 mt-2">
        {page.items &&
          page.items.map((item, i) => (
            <div key={i}>
              <AnimateIn
                from={`opacity-0 ${isEven(i) ? "-" : ""}translate-x-4`}
                to="opacity-100 translate-y-0"
                delay={250 * (i + 2)}
                className="flex flex-col items-center justify-center gap-2"
              >
                <div className="w-[65dvw] sm:w-[60dvw] md:w-[32dvw]">
                  <ImageComponent
                    src={item.imageURL}
                    i={i}
                    editing={editing}
                    files={files}
                    fileURLs={fileURLs}
                    pageImageData={pageImageData}
                    setFiles={setFiles}
                    setFileURLs={setFileURLs}
                    setPageImageData={setPageImageData}
                  />
                </div>

                {editing ? (
                  <input
                    className="input input-ghost font-yeseva font-bold text-lg md:text-2xl text-center w-full"
                    maxLength={20}
                    defaultValue={item.title}
                    onChange={(e) => handleItemTitles(e, i)}
                  />
                ) : (
                  <h1 className="font-yeseva font-bold text-lg md:text-2xl mt-2">
                    {item.title}
                  </h1>
                )}

                {editing ? (
                  <textarea
                    className="input input-ghost text-center resize-none overflow-auto w-full h-12 md:h-28"
                    maxLength={150}
                    defaultValue={item.content}
                    onChange={(e) => handleItemContents(e, i)}
                  />
                ) : (
                  <h1 className="text-sm 2xl:text-md">{item.content}</h1>
                )}
              </AnimateIn>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SplitTemplate;
