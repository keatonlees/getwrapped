import clientPromise from "@/lib/mongo";

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const url = request.nextUrl;
//   return Response.json({ message: url });
// }

export async function GET() {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("getwrapped");
    const collection = db.collection("wraps");
    const result = await collection.find({}).limit(10).toArray();

    return Response.json(result);
  } catch (e) {
    console.log(e);
    return Response.json(e);
  }
}
