"use server";

import { baseURL } from "@/lib/utils/constants";

export async function createNewWrap(user: string) {
  try {
    const res = await fetch(`${baseURL}/api/wraps`, {
      method: "POST",
      body: JSON.stringify({ user: user }),
    });
    return await res.json();
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function deleteWrapById(id: string) {
  try {
    const res = await fetch(`${baseURL}/api/wraps?id=${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (e) {
    console.log(e);
    return e;
  }
}
