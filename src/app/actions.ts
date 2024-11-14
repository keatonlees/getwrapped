"use server";

import { baseURL } from "@/lib/utils/constants";

export async function createNewWrap(title: string) {
  try {
    const res = await fetch(`${baseURL}/api/wraps`, {
      method: "POST",
      body: JSON.stringify({ title: title }),
    });
    return await res.json();
  } catch (e) {
    console.log(e);
    return e;
  }
}
