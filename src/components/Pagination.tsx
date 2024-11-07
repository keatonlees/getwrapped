import React from "react";

const Pagination = ({
  current,
  setCurrent,
  length,
}: {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  length: number;
}) => {
  return (
    <div className="flex gap-2 absolute bottom-12">
      <button
        className="btn btn-primary w-28"
        onClick={() => setCurrent(current - 1 < 0 ? 0 : current - 1)}
      >
        Previous
      </button>

      <button
        className="btn btn-primary w-28"
        onClick={() =>
          setCurrent(current + 1 > length - 1 ? length - 1 : current + 1)
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
