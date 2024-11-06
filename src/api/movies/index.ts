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

// export async function getMovies() {
//   try {
//     if (!movies) await init();
//     const result = await movies
//       .find({})
//       .limit(10)
//       // .map((user: any) => ({ ...user, _id: user._id.toString() }))
//       .toArray();

//     return { movies: result };
//   } catch (error) {
//     return { error: `Failed to get movies. ${error}` };
//   }
// }

export async function getMovieById(id: string) {
  try {
    if (!wraps) await init();
    const result = await wraps.findOne({ _id: new mongo.ObjectId(id) });
    return { wrap: result };
  } catch (error) {
    return { error: `Failed to get wrap with id: ${id}. ${error}` };
  }
}
