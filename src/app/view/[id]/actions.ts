"use server";

import { baseURL } from "@/lib/utils/constants";

export async function getWrapById(id: string) {
  try {
    const res = await fetch(`${baseURL}/api/wrap?id=${id}`, {
      method: "GET",
    });
    return await res.json();
  } catch (e) {
    console.log(e);
    return e;
  }
}
