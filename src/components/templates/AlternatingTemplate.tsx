import React, { useState } from "react";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";
import { isEven } from "@/lib/utils/isEven";

import ImageComponent from "../ImageComponent";

const AlternatingTemplate = (props: Template) => {
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
    <div className="w-full h-dvh flex flex-col items-center justify-center overflow-hidden">
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
          <h1 className="font-yeseva text-4xl font-bold mb-4 text-shadow-psm shadow-neutral">
            {page.title}
          </h1>
        )}
      </AnimateIn>

      <div className="flex flex-col gap-4 mb-4 max-w-[90%] md:w-[40%] mt-2">
        {page.items &&
          page.items.map((item, i) => (
            <AnimateIn
              key={i}
              from={`opacity-0 ${isEven(i) ? "-" : ""}translate-x-4`}
              to="opacity-100 translate-x-0"
              delay={250 * (i + 2)}
            >
              <div
                className={`flex ${isEven(i) ? "" : "flex-row-reverse"} gap-4`}
              >
                <div className="aspect-video h-[10dvh] xl:h-[12dvh] max-h-[12dvh]">
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

                <div
                  className={`flex flex-col justify-center max-h-[100%] gap-2 ${
                    isEven(i) ? "" : "items-end"
                  }`}
                >
                  {editing ? (
                    <input
                      className={`input input-ghost font-yeseva font-bold text-lg md:text-2xl w-full ${
                        isEven(i) ? "" : "text-right"
                      }`}
                      maxLength={20}
                      defaultValue={item.title}
                      onChange={(e) => handleItemTitles(e, i)}
                    />
                  ) : (
                    <div className="font-yeseva font-bold text-lg md:text-2xl">
                      {item.title}
                    </div>
                  )}

                  {editing ? (
                    <textarea
                      className={`input input-ghost resize-none overflow-auto w-full h-10 md:h-12 ${
                        isEven(i) ? "" : "text-right"
                      }`}
                      maxLength={150}
                      defaultValue={item.content}
                      onChange={(e) => handleItemContents(e, i)}
                    />
                  ) : (
                    <div className="text-sm md:text-md">{item.content}</div>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
      </div>
    </div>
  );
};

export default AlternatingTemplate;
