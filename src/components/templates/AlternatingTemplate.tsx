/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";
import { isEven } from "@/lib/utils/isEven";

import ImageComponent from "../ImageComponent";

const AlternatingTemplate = (props: Template) => {
  const { editing, wrap, current, pageData, setPageData } = props;

  // const id = wrap._id.toString();
  const page = wrap.pages[current];

  const [title, setTitle] = useState(page.title || "");
  const [items, setItems] = useState(page.items || []);

  const [file1, setFile1] = useState<File | undefined>(undefined);
  const [file2, setFile2] = useState<File | undefined>(undefined);
  const [file3, setFile3] = useState<File | undefined>(undefined);
  const [file4, setFile4] = useState<File | undefined>(undefined);
  const [fileURL1, setFileURL1] = useState<string | undefined>(undefined);
  const [fileURL2, setFileURL2] = useState<string | undefined>(undefined);
  const [fileURL3, setFileURL3] = useState<string | undefined>(undefined);
  const [fileURL4, setFileURL4] = useState<string | undefined>(undefined);

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

  // const saveAlternatingPage = async () => {
  //   const fileURLs = [];
  //   if (file1) {
  //     const imageURL1 = await getUploadedImageURL(file1);
  //     if (imageURL1 === "error") {
  //       setToast("Error uploading image!");
  //       return;
  //     } else fileURLs.push(imageURL1);
  //   } else fileURLs.push("");
  //   if (file2) {
  //     const imageURL2 = await getUploadedImageURL(file2);
  //     if (imageURL2 === "error") {
  //       setToast("Error uploading image!");
  //       return;
  //     } else fileURLs.push(imageURL2);
  //   } else fileURLs.push("");
  //   if (file3) {
  //     const imageURL3 = await getUploadedImageURL(file3);
  //     if (imageURL3 === "error") {
  //       setToast("Error uploading image!");
  //       return;
  //     } else fileURLs.push(imageURL3);
  //   } else fileURLs.push("");
  //   if (file4) {
  //     const imageURL4 = await getUploadedImageURL(file4);
  //     if (imageURL4 === "error") {
  //       setToast("Error uploading image!");
  //       return;
  //     } else fileURLs.push(imageURL4);
  //   } else fileURLs.push("");

  //   const colorData = formatColorData({ page, current, bgColor, color });
  //   const imageData = formatImageArrayData({
  //     page,
  //     current,
  //     fileURLs,
  //   });

  //   const data = {
  //     ...colorData,
  //     ...imageData,
  //   };

  //   // clear old images from S3
  //   if (JSON.stringify(imageData) !== "{}") {
  //     let originalImageId = "";
  //     for (let i = 0; i < fileURLs.length; i++) {
  //       if (page.items && fileURLs[i] !== "")
  //         originalImageId = page.items[i].imageURL?.split("/")[3] ?? "";
  //       if (originalImageId !== "") await deleteImageById(originalImageId);
  //     }
  //   }

  //   // send data to action and refetch
  //   if (JSON.stringify(data) !== "{}") {
  //     await updateWrapPage(id, { $set: data });
  //     setWrap(await getWrapById(id));
  //     setFile1(undefined);
  //     setFile2(undefined);
  //     setFile3(undefined);
  //     setFile4(undefined);
  //     setFileURL1(undefined);
  //     setFileURL2(undefined);
  //     setFileURL3(undefined);
  //     setFileURL4(undefined);
  //     setToast("Saved page!");
  //   }
  // };

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
                  {/* <ImageComponent
                    src={item.imageURL}
                    editing={editing}
                    file={eval(`file${i + 1}`)}
                    fileURL={eval(`fileURL${i + 1}`)}
                    setFile={eval(`setFile${i + 1}`)}
                    setFileURL={eval(`setFileURL${i + 1}`)}
                  /> */}
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
