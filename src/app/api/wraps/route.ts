import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongo";
import { newWrap } from "@/lib/utils/constants";

const dbName = "getwrapped";
const collectionName = "wraps";

export async function GET() {
  try {
    const client = await clientPromise;
    const wrapsDB = client.db(dbName).collection(collectionName);

    const result = await wrapsDB.find({}).limit(10).toArray();
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

    const result = await wrapsDB.insertOne({ ...newWrap, title: body.title });
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}