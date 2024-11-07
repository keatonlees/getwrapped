import clientPromise from "@/lib/mongo";
import mongo from "mongodb";

let client;
let db: mongo.Db;
let wraps: mongo.Collection;

async function init() {
  if (db) return;

  try {
    client = await clientPromise;
    db = await client.db("getwrapped");
    wraps = await db.collection("wraps");
  } catch (error) {
    console.log(`Failed to connect to MongoDB: ${error}`);
  }
}

(async () => {
  await init();
})();

export async function getWrapById(id: string) {
  try {
    if (!wraps) await init();
    const result = await wraps.findOne({ _id: new mongo.ObjectId(id) });

    return {
      wrap: {
        title: result?.title,
        colors: result?.colors,
        pages: result?.pages,
      },
    };
  } catch (error) {
    return { error: `Failed to get Wrap with id: ${id}. ${error}` };
  }
}
