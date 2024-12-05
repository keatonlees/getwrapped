import React, { useState } from "react";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";

import ImageComponent from "../ImageComponent";

const SingleTemplate = (props: Template) => {
  const { editing, wrap, current, pageData, setPageData } = props;

  const page = wrap.pages[current];

  const [title, setTitle] = useState(page.title || "");
  const [content, setContent] = useState(page.content || "");
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [fileURL, setFileURL] = React.useState<string | undefined>(undefined);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setPageData({ ...pageData, title: e.target.value });
  };
  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setPageData({ ...pageData, content: e.target.value });
  };

  // const saveSinglePage = async () => {
  //   let imageURL = undefined;
  //   if (file) imageURL = await getUploadedImageURL(file);

  //   if (imageURL === "error") {
  //     setToast("Error uploading image!");
  //     return;
  //   }

  //   const colorData = formatColorData({ page, current, bgColor, color });
  //   const textData = formatTextData({ page, current, title, content });
  //   const imageData = formatImageData({ page, current, imageURL });

  //   const data = {
  //     ...colorData,
  //     ...textData,
  //     ...imageData,
  //   };

  //   // TODO: restructure deletion order
  //   // clear old images from S3
  //   if (JSON.stringify(imageData) !== "{}") {
  //     const originalImageId = page.imageURL?.split("/")[3] ?? "";
  //     if (originalImageId !== "") await deleteImageById(originalImageId);
  //   }

  //   // send data to action and refetch
  //   if (JSON.stringify(data) !== "{}") {
  //     await updateWrapPage(id, { $set: data });
  //     setWrap(await getWrapById(id));
  //     setFile(undefined);
  //     setFileURL(undefined);
  //     setToast("Saved page!");
  //   }
  // };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="flex flex-col items-center w-[70dvw] xl:w-[40dvw]">
        <AnimateIn
          from="opacity-0 translate-y-4"
          to="opacity-100 translate-y-0"
          delay={250}
          as="div"
        >
          <div className="aspect-video w-[65dvw] xl:w-[35dvw]">
            <ImageComponent
              src={page.imageURL}
              editing={editing}
              file={file}
              fileURL={fileURL}
              setFile={setFile}
              setFileURL={setFileURL}
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
                defaultValue={title}
                onChange={handleTitle}
              />
            ) : (
              <h1 className="font-yeseva font-bold text-4xl w-full text-shadow-psm shadow-neutral">
                {page.title}
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
                defaultValue={content}
                onChange={handleContent}
              />
            ) : (
              <h1 className="text-sm md:text-md">{page.content}</h1>
            )}
          </AnimateIn>
        </div>
      </div>
    </div>
  );
};

export default SingleTemplate;
