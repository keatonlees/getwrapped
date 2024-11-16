import React from "react";
import { Template } from "@/lib/utils/interfaces";
import AnimateIn from "@/lib/animations/AnimateIn";

import ImageComponent from "../ImageComponent";
import EditBar from "@/app/make/[id]/EditBar";
import { updateWrapPage } from "@/app/make/[id]/actions";

const SingleTemplate = ({
  wrap,
  current,
  editing,
  color,
  bgColor,
  setBgColor,
  setColor,
}: Template) => {
  const page = wrap.pages[current];

  const savePage = async () => {
    const currentBgColor = wrap.pages[current].bgColor;
    const currentColor = wrap.pages[current].color;
    // console.log(currentBgColor, currentColor);
    // console.log(bgColor, color);

    let data = {};

    if (currentBgColor !== bgColor && bgColor !== "") {
      console.log(bgColor);
      data = {
        ...data,
        [`pages.${current}.bgColor`]: bgColor,
      };
    }
    if (currentColor !== color && color !== "") {
      console.log(color);
      data = {
        ...data,
        [`pages.${current}.color`]: color,
      };
    }

    if (JSON.stringify(data) !== "{}") {
      console.log(await updateWrapPage("6733d8067e6ceb6971cd2aca", data));
    } else {
      console.log("no changes");
    }

    // TODO: refetch page ?
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center overflow-hidden">
      {editing && wrap.pages[current] && (
        <EditBar
          id={undefined}
          page={wrap.pages[current]}
          setBgColor={setBgColor}
          setColor={setColor}
          savePage={savePage}
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
