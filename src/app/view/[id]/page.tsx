import React from "react";
import { getWrapById } from "@/api/movies";
import ViewContainer from "@/components/ViewContainer";

async function fetchWrapById(id: string) {
  const { wrap } = await getWrapById(id);
  return wrap;
}

type Params = Promise<{ id: string }>;

const ViewWrap = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const wrap = await fetchWrapById(id);

  if (!wrap) {
    return <div>Wrap loading...</div>;
  }

  return <ViewContainer wrap={wrap} />;
};

export default ViewWrap;
