import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

const dbName = "getwrapped";
const collectionName = "wraps";

export async function GET() {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find({}).limit(10).toArray();

    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    return NextResponse.json(e);
  }
}

// export async function getWrapById(id: string) {
//   try {
//     if (!wraps) await init();
//     const result = await wraps.findOne({ _id: new mongo.ObjectId(id) });

//     return {
//       wrap: {
//         title: result?.title,
//         colors: result?.colors,
//         pages: result?.pages,
//       },
//     };
//   } catch (error) {
//     return { error: `Failed to get Wrap with id: ${id}. ${error}` };
//   }
// }
