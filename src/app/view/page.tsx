"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import LoadingWrap from "@/components/LoadingWrap";
import ViewContainer from "@/components/ViewContainer";
import WrapNotFound from "@/components/WrapNotFound";
import { Wrap } from "@/lib/utils/interfaces";

import { getWrapById } from "./actions";

const ViewWrap = () => {
  const params = useSearchParams();
  const id = params.get("id") ?? "";

  const [loading, setLoading] = useState(true);
  const [wrap, setWrap] = useState<Wrap>();

  useEffect(() => {
    const getWrap = async () => {
      const res = await getWrapById(id);
      setWrap(res);
      setLoading(false);
    };

    if (id) getWrap();
  }, [id]);

  if (loading && (!wrap || JSON.stringify(wrap) === "{}"))
    return <LoadingWrap />;

  if (!wrap || JSON.stringify(wrap) === "{}") return <WrapNotFound />;

  return <ViewContainer wrap={wrap} editing={false} />;
};

export default ViewWrap;
