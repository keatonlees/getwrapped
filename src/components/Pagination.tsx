import React from "react";
import {
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";

import AnimateIn from "@/lib/animations/AnimateIn";
import { Wrap } from "@/lib/utils/interfaces";

interface Pagination {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  wrap: Wrap;
  setPageData: React.Dispatch<React.SetStateAction<object>>;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const Pagination = (props: Pagination) => {
  const { wrap, current, setCurrent, setPageData, setBgColor, setColor } =
    props;

  const length = wrap.pages.length;

  const reset = () => {
    setBgColor("");
    setColor("");
    setPageData({});
  };

  const prev = async () => {
    if (current - 1 >= 0) {
      reset();
      setCurrent(-1);
      await new Promise((r) => setTimeout(r, 1));
      setCurrent(current - 1);
    } else {
      setCurrent(0);
    }
  };

  const next = async () => {
    if (current + 1 <= length - 1) {
      reset();
      setCurrent(-1);
      await new Promise((r) => setTimeout(r, 1));
      setCurrent(current + 1);
    } else {
      setCurrent(length - 1);
    }
  };

  const goTo = async (i: number) => {
    reset();
    setCurrent(-1);
    await new Promise((r) => setTimeout(r, 1));
    setCurrent(i);
  };

  return (
    <div className="absolute bottom-4 overflow-hidden">
      <AnimateIn
        from="opacity-0 translate-y-8"
        to="opacity-100 translate-y-0"
        delay={1000}
        className="flex items-center"
      >
        <button
          className="btn btn-outline btn-square text-3xl m-2"
          onClick={prev}
        >
          <TbArrowBadgeLeftFilled />
        </button>

        <div className="flex gap-1">
          {wrap.pages.map((_, i) => {
            return (
              <button
                key={i}
                className={`btn btn-2xs btn-circle ${
                  i === current ? "btn-neutral" : "btn-outline"
                }`}
                onClick={() => goTo(i)}
              />
            );
          })}
        </div>

        <button
          className="btn btn-outline btn-square text-3xl m-2"
          onClick={next}
        >
          <TbArrowBadgeRightFilled />
        </button>
      </AnimateIn>
    </div>
  );
};

export default Pagination;
