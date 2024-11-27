import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongo";

const dbName = "getwrapped";
const collectionName = "wraps";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id") ?? "";

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const client = await clientPromise;
    const wrapsDB = client.db(dbName).collection(collectionName);

    const result = await wrapsDB.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}

export async function PUT(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id") ?? "";

  const body = await request.json();

  try {
    const client = await clientPromise;
    const wrapsDB = client.db(dbName).collection(collectionName);

    const result = await wrapsDB.updateOne(
      { _id: new ObjectId(id) },
      { $set: body.query }
    );
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
