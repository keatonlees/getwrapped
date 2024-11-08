import React from "react";

import { baseURL } from "@/lib/utils/constants";
import ViewContainer from "@/components/ViewContainer";

const ViewWrap = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  let wrap = null;
  try {
    const res = await fetch(`${baseURL}/api/wrap/${id}`, {
      method: "GET",
    });
    wrap = await res.json();
  } catch (e) {
    console.log(e);
  }

  if (JSON.stringify(wrap) === "{}") {
    return <h1>Wrap not found</h1>;
  }

  return <ViewContainer wrap={wrap} />;
};

export default ViewWrap;
