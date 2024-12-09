import React, { useState } from "react";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";

import ImageComponent from "../ImageComponent";

const RowsTemplate = (props: Template) => {
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
    undefined,
    undefined,
    undefined,
  ]);
  const [fileURLs, setFileURLs] = useState<(string | undefined)[]>([
    undefined,
    undefined,
    undefined,
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
          <h1 className="font-yeseva font-bold text-4xl w-full text-shadow-psm shadow-neutral mb-4">
            {page.title}
          </h1>
        )}
      </AnimateIn>

      <div className="flex flex-col gap-4 mb-4 mt-2 w-[90%] md:w-[20%]">
        {page.items &&
          page.items.map((item, i) => (
            <AnimateIn
              key={i}
              from="opacity-0 -translate-x-4"
              to="opacity-100 translate-x-0"
              delay={250 * (i + 2)}
            >
              <div className="flex gap-4 justify-start md:justify-start">
                <div className="flex items-center w-12">
                  <h1 className="font-yeseva text-4xl font-bold">#{i + 1}</h1>
                </div>

                <div className="aspect-square h-[12dvh] 2xl:h-[12dvh] max-h-[12dvh]">
                  <ImageComponent
                    shape="square"
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

                <div className="flex flex-col justify-center">
                  {editing ? (
                    <input
                      className="input input-ghost font-yeseva font-bold text-lg md:text-2xl w-full"
                      maxLength={30}
                      defaultValue={item.title}
                      onChange={(e) => handleItemTitles(e, i)}
                    />
                  ) : (
                    <div className="font-yeseva font-bold text-lg md:text-xl">
                      {item.title}
                    </div>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
      </div>
    </div>
  );
};

export default RowsTemplate;
