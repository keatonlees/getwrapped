import React from "react";

import ViewContainer from "@/components/ViewContainer";
import { getWrapById } from "@/app/view/[id]/actions";

const MakeWrap = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const wrap = await getWrapById(id);

  // TODO: Better error handling
  if (JSON.stringify(wrap) === "{}") return <h1>Wrap not found</h1>;

  return <ViewContainer id={id} wrap={wrap} editing />;
};

export default MakeWrap;
