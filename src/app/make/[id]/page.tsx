import React from "react";

import { getWrapById } from "@/app/view/[id]/actions";

import ViewContainer from "@/components/ViewContainer";
import WrapNotFound from "@/components/WrapNotFound";

const MakeWrap = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const wrap = await getWrapById(id);

  if (JSON.stringify(wrap) === "{}") return <WrapNotFound />;

  return <ViewContainer wrap={wrap} editing />;
};

export default MakeWrap;
