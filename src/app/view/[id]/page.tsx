import React from "react";

import ViewContainer from "@/components/ViewContainer";
import WrapNotFound from "@/components/WrapNotFound";

import { getWrapById } from "./actions";

const ViewWrap = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const wrap = await getWrapById(id);

  if (JSON.stringify(wrap) === "{}") return <WrapNotFound />;

  return <ViewContainer wrap={wrap} editing={false} />;
};

export default ViewWrap;
