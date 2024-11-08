import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongo";

const dbName = "getwrapped";
const collectionName = "wraps";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  // TODO: remove fake throttling
  await new Promise((r) => setTimeout(r, 3000));

  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}
