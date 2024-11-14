import AnimateIn from "@/lib/animations/AnimateIn";
import { Wrap } from "@/lib/utils/interfaces";
import React from "react";
import {
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";

const Pagination = ({
  current,
  setCurrent,
  wrap,
}: {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  wrap: Wrap;
}) => {
  const length = wrap.pages.length;

  return (
    <div className="absolute bottom-4">
      <AnimateIn
        from="opacity-0 translate-y-8"
        to="opacity-100 translate-y-0"
        delay={500}
        className="flex items-center"
      >
        <button
          className="btn btn-outline btn-square text-3xl m-2"
          onClick={() => setCurrent(current - 1 < 0 ? 0 : current - 1)}
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
                onClick={() => setCurrent(i)}
              />
            );
          })}
        </div>

        <button
          className="btn btn-outline btn-square text-3xl m-2"
          onClick={() =>
            setCurrent(current + 1 > length - 1 ? length - 1 : current + 1)
          }
        >
          <TbArrowBadgeRightFilled />
        </button>
      </AnimateIn>
    </div>
  );
};

export default Pagination;
