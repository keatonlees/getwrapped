import React from "react";

import { updateWrapPage } from "@/app/make/[id]/actions";
import EditBar from "@/app/make/[id]/EditBar";
import { getWrapById } from "@/app/view/[id]/actions";

import AnimateIn from "@/lib/animations/AnimateIn";
import { formatColorData } from "@/lib/mongo/formatData";
import { Template } from "@/lib/utils/interfaces";

import ImageComponent from "../ImageComponent";

const SingleTemplate = (props: Template) => {
  const {
    editing,
    wrap,
    current,
    bgColor,
    color,
    setWrap,
    setBgColor,
    setColor,
  } = props;

  const id = wrap._id.toString();
  const page = wrap.pages[current];

  const saveSinglePage = async () => {
    const data = formatColorData({ page, current, bgColor, color });

    // send data to action and refetch
    if (JSON.stringify(data) !== "{}") {
      await updateWrapPage(id, data);
      setWrap(await getWrapById(id));
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center overflow-hidden">
      {editing && page && (
        <EditBar
          id={id}
          page={page}
          setBgColor={setBgColor}
          setColor={setColor}
          savePage={saveSinglePage}
        />
      )}

      <AnimateIn
        from="opacity-0 translate-y-4"
        to="opacity-100 translate-y-0"
        delay={250}
        as="div"
      >
        <div className="aspect-video w-[80dvw] 2xl:w-[40dvw]">
          <ImageComponent src={page.imageURL} editing={editing} />
        </div>
      </AnimateIn>

      <div className="flex flex-col items-center max-w-[100%]">
        <AnimateIn
          from="opacity-0 translate-y-4"
          to="opacity-100 translate-y-0"
          delay={500}
        >
          <h1 className="font-yeseva text-4xl font-bold my-4 text-shadow-psm shadow-neutral">
            {page.title}
          </h1>
        </AnimateIn>

        <AnimateIn
          from="opacity-0 translate-y-4"
          to="opacity-100 translate-y-0"
          delay={750}
        >
          <h1 className="text-sm md:text-md">{page.content}</h1>
        </AnimateIn>
      </div>
    </div>
  );
};

export default SingleTemplate;
