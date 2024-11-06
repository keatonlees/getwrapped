import React from "react";
import { getMovieById } from "@/api/movies";

async function fetchWrapById(id: string) {
  const { wrap } = await getMovieById(id);
  return wrap;
}

const ViewWrap = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const wrap = await fetchWrapById(id);

  return (
    <>
      <div>ViewWrap</div>
      {wrap?.title}
    </>
  );
};

export default ViewWrap;
