import React from "react";

import { updateWrapPage } from "@/app/make/[id]/actions";
import EditBar from "@/app/make/[id]/EditBar";
import { getWrapById } from "@/app/view/[id]/actions";

import AnimateIn from "@/lib/animations/AnimateIn";
import { formatColorData } from "@/lib/mongo/formatData";
import { Template } from "@/lib/utils/interfaces";

const CreditsTemplate = (props: Template) => {
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

  const saveCreditsPage = async () => {
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
          savePage={saveCreditsPage}
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
    </div>
  );
};

export default CreditsTemplate;
