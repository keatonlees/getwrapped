"use client";

import React from "react";

import { updateWrapPage } from "@/app/make/[id]/actions";
import EditBar from "@/app/make/[id]/EditBar";
import { getWrapById } from "@/app/view/[id]/actions";

import AnimateIn from "@/lib/animations/AnimateIn";
import { formatColorData } from "@/lib/mongo/formatData";
import { Template } from "@/lib/utils/interfaces";
import useWindowDimensions from "@/lib/utils/window";

// import ImageComponent from "../ImageComponent";

const ColumnsTemplate = (props: Template) => {
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
  const { width } = useWindowDimensions();

  const saveColumnsPage = async () => {
    const data = formatColorData({ page, current, bgColor, color });

    // send data to action and refetch
    if (JSON.stringify(data) !== "{}") {
      await updateWrapPage(id, data);
      setWrap(await getWrapById(id));
    }
  };

  const DesktopView = () => {
    return (
      <div className="h-fit flex justify-between gap-8 xl:gap-16 mb-8">
        {page.items &&
          page.items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center 2xl:max-w-60 xl:max-w-40"
            >
              <AnimateIn
                from="opacity-0 translate-y-4"
                to="opacity-100 translate-y-0"
                delay={250 * (i + 2)}
              >
                <div className="aspect-square w-40 2xl:w-60">
                  {/* <ImageComponent src={page.imageURL} editing={editing} /> */}
                </div>
                <div className="font-yeseva font-bold text-lg 2xl:text-2xl my-4">
                  {item.title}
                </div>
                <div className="text-sm 2xl:text-md">{item.content}</div>
              </AnimateIn>
            </div>
          ))}
      </div>
    );
  };

  // TODO: Mobile View
  const MobileView = () => {
    // const [column, setColumn] = useState(0);

    return <div>Mobile</div>;
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center text-center overflow-hidden">
      {editing && page && (
        <EditBar
          id={id}
          page={page}
          setBgColor={setBgColor}
          setColor={setColor}
          savePage={saveColumnsPage}
        />
      )}

      <AnimateIn
        from="opacity-0 -translate-y-4"
        to="opacity-100 translate-y-0"
        delay={250}
      >
        <h1 className="font-yeseva text-4xl font-bold mb-8 text-shadow-psm shadow-neutral">
          {page.title}
        </h1>
      </AnimateIn>

      {width < 1024 ? <MobileView /> : <DesktopView />}
    </div>
  );
};

export default ColumnsTemplate;
