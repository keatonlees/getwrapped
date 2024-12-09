import React, { useState } from "react";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Template } from "@/lib/utils/interfaces";

const StatsTemplate = (props: Template) => {
  const { editing, wrap, current, pageData, setPageData } = props;

  const page = wrap.pages[current];

  const [items, setItems] = useState(page.items || []);

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
        <>
          <AnimateIn
            from="opacity-0 -translate-y-4"
            to="opacity-100 translate-y-0"
            delay={250}
            as="div"
            className="w-full md:w-[30%]"
          >
            {editing ? (
              <input
                className="input input-ghost font-yeseva font-bold text-lg md:text-2xl text-center w-full mt-16"
                maxLength={30}
                defaultValue={page.items[0].title}
                onChange={(e) => handleItemTitles(e, 0)}
              />
            ) : (
              <h1 className="font-yeseva font-bold text-lg md:text-2xl mt-16">
                {page.items[0].title}
              </h1>
            )}
          </AnimateIn>

          <AnimateIn
            from="opacity-0 -translate-y-4"
            to="opacity-100 translate-y-0"
            delay={500}
            as="div"
            className="w-full md:w-[50%]"
          >
            {editing ? (
              <input
                className="input input-ghost font-yeseva font-bold text-6xl md:text-8xl text-center w-full h-16 md:h-28 my-2"
                maxLength={20}
                defaultValue={page.items[0].content}
                onChange={(e) => handleItemContents(e, 0)}
              />
            ) : (
              <h1 className="font-yeseva font-bold text-6xl md:text-8xl my-2 text-shadow-psm shadow-neutral">
                {page.items[0].content}
              </h1>
            )}
          </AnimateIn>

          <AnimateIn
            from="opacity-0 -translate-y-4"
            to="opacity-100 translate-y-0"
            delay={750}
            as="div"
            className="w-full md:w-[30%]"
          >
            {editing ? (
              <input
                className="input input-ghost font-yeseva font-bold text-lg md:text-2xl text-center w-full mb-12"
                maxLength={30}
                defaultValue={page.items[1].title}
                onChange={(e) => handleItemTitles(e, 1)}
              />
            ) : (
              <h1 className="font-yeseva font-bold text-lg md:text-2xl mb-12">
                {page.items[1].title}
              </h1>
            )}
          </AnimateIn>

          <AnimateIn
            from="opacity-0 -translate-y-4"
            to="opacity-100 translate-y-0"
            delay={1000}
            as="div"
            className="w-full md:w-[30%]"
          >
            {editing ? (
              <textarea
                className="input input-ghost text-center resize-none overflow-auto w-full h-16 md:h-32"
                maxLength={50}
                defaultValue={page.items[1].content}
                onChange={(e) => handleItemContents(e, 1)}
              />
            ) : (
              <h1 className="text-sm 2xl:text-md">{page.items[1].content}</h1>
            )}
          </AnimateIn>
        </>
      )}
    </div>
  );
};

export default StatsTemplate;
