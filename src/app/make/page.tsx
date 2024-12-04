"use client";

import React, { use, useEffect, useState } from "react";

import ViewContainer from "@/components/ViewContainer";
import WrapNotFound from "@/components/WrapNotFound";
import { useRouter, useSearchParams } from "next/navigation";
import { getWrapById } from "../view/actions";
import { Wrap } from "@/lib/utils/interfaces";
import LoadingWrap from "@/components/LoadingWrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";

const MakeWrap = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

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

    if (!user) router.push("/login");
    if (id) getWrap();
    if (user && wrap && user.uid !== wrap.user) router.push("/login");
  }, []);

  if (loading && (!wrap || JSON.stringify(wrap) === "{}"))
    return <LoadingWrap />;

  if (!wrap || JSON.stringify(wrap) === "{}") return <WrapNotFound />;

  return <ViewContainer wrap={wrap} editing />;
};

export default MakeWrap;
