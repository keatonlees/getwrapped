import React, { useState } from "react";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";

import ImageComponent from "../ImageComponent";

const SingleTemplate = (props: Template) => {
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
      {page.items && (
        <div className="flex flex-col items-center w-[70dvw] xl:w-[40dvw]">
          <AnimateIn
            from="opacity-0 translate-y-4"
            to="opacity-100 translate-y-0"
            delay={250}
            as="div"
          >
            <div className="aspect-video w-[65dvw] xl:w-[35dvw]">
              <ImageComponent
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
            </div>
          </AnimateIn>

          <div className="flex flex-col items-center w-[100%] xl:w-[80%] my-2 gap-2">
            <AnimateIn
              from="opacity-0 translate-y-4"
              to="opacity-100 translate-y-0"
              delay={500}
              className="w-full"
            >
              {editing ? (
                <input
                  className="input input-ghost font-yeseva font-bold text-4xl text-center w-full"
                  maxLength={50}
                  defaultValue={page.items[0].title}
                  onChange={(e) => handleItemTitles(e, 0)}
                />
              ) : (
                <h1 className="font-yeseva font-bold text-4xl w-full text-shadow-psm shadow-neutral">
                  {page.items[0].title}
                </h1>
              )}
            </AnimateIn>

            <AnimateIn
              from="opacity-0 translate-y-4"
              to="opacity-100 translate-y-0"
              delay={750}
              className="w-full"
            >
              {editing ? (
                <textarea
                  className="input input-ghost text-center resize-none overflow-auto w-full h-28"
                  maxLength={300}
                  defaultValue={page.items[0].content}
                  onChange={(e) => handleItemContents(e, 0)}
                />
              ) : (
                <h1 className="text-sm md:text-md">{page.items[0].content}</h1>
              )}
            </AnimateIn>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTemplate;
