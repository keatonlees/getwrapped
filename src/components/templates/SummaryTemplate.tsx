import React, { useState } from "react";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";

import ImageComponent from "../ImageComponent";

const SummaryTemplate = (props: Template) => {
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

  const [items, setItems] = useState(page.items || []);

  const [files, setFiles] = useState<(File | undefined)[]>([undefined]);
  const [fileURLs, setFileURLs] = useState<(string | undefined)[]>([undefined]);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const newItems = [...items];
    newItems[i].content = e.target.value;
    setItems(newItems);
    setPageData({ ...pageData, items: newItems });
  };

  return (
    <div className="w-[90%] h-dvh flex flex-col items-center justify-center text-center overflow-hidden">
      {page.items && (
        <div className="flex flex-col md:flex-row gap-12 md:gap-32 items-center justify-center">
          {/* left */}
          <AnimateIn
            from={`opacity-0 -translate-y-4`}
            to="opacity-100 translate-y-0"
            delay={250}
            as="div"
            className="aspect-square w-[50%] md:w-[25%]"
          >
            <ImageComponent
              shape="square"
              src={page.items[0].imageURL}
              i={0}
              editing={editing}
              files={files}
              fileURLs={fileURLs}
              pageImageData={pageImageData}
              setFiles={setFiles}
              setFileURLs={setFileURLs}
              setPageImageData={setPageImageData}
            />
          </AnimateIn>

          {/* right */}
          <AnimateIn
            from={`opacity-0 translate-y-4`}
            to="opacity-100 translate-y-0"
            delay={500}
            as="div"
            className="flex flex-col w-full md:w-[40%] text-left px-2"
          >
            <div className="flex mb-1 gap-2">
              {editing ? (
                <>
                  <input
                    className="input input-ghost font-yeseva font-bold text-lg md:text-2xl w-full h-10 px-3"
                    maxLength={20}
                    defaultValue={page.items[0].title}
                    onChange={(e) => handleItemTitles(e, 0)}
                  />
                  <input
                    className="input input-ghost font-yeseva font-bold text-lg md:text-2xl w-full h-10 px-3"
                    maxLength={20}
                    defaultValue={page.items[0].content}
                    onChange={(e) => handleItemContents(e, 0)}
                  />
                </>
              ) : (
                <>
                  <h1 className="font-yeseva font-bold text-lg md:text-2xl w-full">
                    {page.items[0].title}
                  </h1>
                  <h1 className="font-yeseva font-bold text-lg md:text-2xl w-full">
                    {page.items[0].content}
                  </h1>
                </>
              )}
            </div>

            {page.items
              .filter((_, i) => i > 0 && i < 6)
              .map((item, i) => (
                <div key={i} className="flex gap-2 mb-1">
                  {editing ? (
                    <>
                      <input
                        className="input input-ghost text-md md:text-lg w-full h-8 md:h-10 px-3"
                        maxLength={20}
                        defaultValue={item.title}
                        onChange={(e) => handleItemTitles(e, i + 1)}
                      />
                      <input
                        className="input input-ghost text-md md:text-lg w-full h-8 md:h-10 px-3"
                        maxLength={20}
                        defaultValue={item.content}
                        onChange={(e) => handleItemContents(e, i + 1)}
                      />
                    </>
                  ) : (
                    <>
                      <h1 className="text-md md:text-lg w-full">
                        {item.title}
                      </h1>
                      <h1 className="text-md md:text-lg w-full">
                        {item.content}
                      </h1>
                    </>
                  )}
                </div>
              ))}

            <div className="flex mt-4 gap-2">
              {editing ? (
                <>
                  <input
                    className="input input-ghost font-yeseva font-bold text-lg md:text-2xl w-full h-10 px-3"
                    maxLength={20}
                    defaultValue={page.items[6].title}
                    onChange={(e) => handleItemTitles(e, 6)}
                  />
                  <input
                    className="input input-ghost font-yeseva font-bold text-lg md:text-2xl w-full h-10 px-3"
                    maxLength={20}
                    defaultValue={page.items[6].content}
                    onChange={(e) => handleItemContents(e, 6)}
                  />
                </>
              ) : (
                <>
                  <h1 className="font-yeseva font-bold text-lg md:text-2xl w-full">
                    {page.items[6].title}
                  </h1>
                  <h1 className="font-yeseva font-bold text-lg md:text-2xl w-full">
                    {page.items[6].content}
                  </h1>
                </>
              )}
            </div>

            <div className="flex gap-2">
              {editing ? (
                <>
                  <input
                    className="input input-ghost font-bold text-xl md:text-2xl w-full h-10 px-3 mt-1"
                    maxLength={20}
                    defaultValue={page.items[7].title}
                    onChange={(e) => handleItemTitles(e, 7)}
                  />
                  <input
                    className="input input-ghost font-bold text-xl md:text-2xl w-full h-10 px-3 mt-1"
                    maxLength={20}
                    defaultValue={page.items[7].content}
                    onChange={(e) => handleItemContents(e, 7)}
                  />
                </>
              ) : (
                <>
                  <h1 className="font-bold text-lg md:text-2xl w-full">
                    {page.items[7].title}
                  </h1>
                  <h1 className="font-bold text-lg md:text-2xl w-full">
                    {page.items[7].content}
                  </h1>
                </>
              )}
            </div>
          </AnimateIn>
        </div>
      )}
    </div>
  );
};

export default SummaryTemplate;
