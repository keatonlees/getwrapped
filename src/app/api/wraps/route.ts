import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongo";
import { newWrap } from "@/lib/utils/constants";
import { ObjectId } from "mongodb";

const dbName = "getwrapped";
const collectionName = "wraps";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const userUID = params.get("user") ?? "";

  try {
    const client = await clientPromise;
    const wrapsDB = client.db(dbName).collection(collectionName);

    const result = await wrapsDB.find({ user: userUID }).toArray();
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const client = await clientPromise;
    const wrapsDB = client.db(dbName).collection(collectionName);

    const result = await wrapsDB.insertOne({ ...newWrap, user: body.user });
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}

export async function DELETE(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id = params.get("id") ?? "";

  try {
    const client = await clientPromise;
    const wrapsDB = client.db(dbName).collection(collectionName);

    const result = await wrapsDB.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
