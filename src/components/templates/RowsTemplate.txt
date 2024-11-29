import React from "react";

import { updateWrapPage } from "@/app/make/[id]/actions";
import EditBar from "@/app/make/[id]/EditBar";
import { getWrapById } from "@/app/view/[id]/actions";

import AnimateIn from "@/lib/animations/AnimateIn";
import { formatColorData } from "@/lib/mongo/formatData";
import { Template } from "@/lib/utils/interfaces";

// import ImageComponent from "../ImageComponent";

const RowsTemplate = (props: Template) => {
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

  const saveRowsPage = async () => {
    const data = formatColorData({ page, current, bgColor, color });

    // send data to action and refetch
    if (JSON.stringify(data) !== "{}") {
      await updateWrapPage(id, data);
      setWrap(await getWrapById(id));
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center overflow-hidden">
      {editing && page && (
        <EditBar
          id={id}
          page={page}
          setBgColor={setBgColor}
          setColor={setColor}
          savePage={saveRowsPage}
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

      <div className="flex flex-col gap-4 mb-4 max-w-[90%] md:max-w-[50%]">
        {page.items &&
          page.items.map((item, i) => (
            <AnimateIn
              key={i}
              from="opacity-0 -translate-x-4"
              to="opacity-100 translate-x-0"
              delay={250 * (i + 2)}
            >
              <div className="flex gap-4">
                <div className="aspect-video h-[9dvh] 2xl:h-[11dvh] max-h-[11dvh]">
                  {/* <ImageComponent src={item.imageURL} editing={editing} /> */}
                </div>
                <div className="flex flex-col justify-center max-h-[100%]">
                  <div className="font-yeseva font-bold text-lg md:text-xl">
                    {item.title}
                  </div>
                  <div className="text-sm md:text-md">{item.content}</div>
                </div>
              </div>
            </AnimateIn>
          ))}
      </div>
    </div>
  );
};

export default RowsTemplate;
