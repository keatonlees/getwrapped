import React from "react";

import { updateWrapPage } from "@/app/make/[id]/actions";
import EditBar from "@/app/make/[id]/EditBar";
import { getWrapById } from "@/app/view/[id]/actions";

import AnimateIn from "@/lib/animations/AnimateIn";
import { formatColorData } from "@/lib/mongo/formatData";
import { Template } from "@/lib/utils/interfaces";
import { isEven } from "@/lib/utils/isEven";

import ImageComponent from "../ImageComponent";

const SplitTemplate = (props: Template) => {
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

  const saveSplitPage = async () => {
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
          savePage={saveSplitPage}
        />
      )}

      <AnimateIn
        from="opacity-0 -translate-y-4"
        to="opacity-100 translate-y-0"
        delay={250}
      >
        <h1 className="font-yeseva text-4xl font-bold mb-4 text-shadow-psm shadow-neutral">
          {page.title}
        </h1>
      </AnimateIn>

      <div className="h-fit flex flex-col md:flex-row justify-between gap-4 md:gap-32 mb-4">
        {page.columns &&
          page.columns.map((col, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <AnimateIn
                from={`opacity-0 ${isEven(i) ? "-" : ""}translate-x-4`}
                to="opacity-100 translate-y-0"
                delay={250 * (i + 2)}
              >
                <div className="aspect-video w-[65dvw] sm:w-[60dvw] md:w-[32dvw]">
                  <ImageComponent src={page.imageURL} editing={editing} />
                </div>
                <div className="font-yeseva font-bold text-lg md:text-2xl mt-4 mb-2">
                  {col.title}
                </div>
                <div className="text-sm 2xl:text-md">{col.content}</div>
              </AnimateIn>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SplitTemplate;
