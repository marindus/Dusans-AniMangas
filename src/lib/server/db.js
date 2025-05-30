import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("DusansAniMangaDB"); // select database

//////////////////////////////////////////
// Animangas
//////////////////////////////////////////

// Get all animangas
async function getAnimangas() {
  let animangas = [];
  try {
    const collection = db.collection("animangas");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    animangas = await collection.find(query).toArray();
    animangas.forEach((animanga) => {
      animanga._id = animanga._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return animangas;
}

// Get all animangas in a given genre
async function getAnimangasByGenre(genre) {
  let animangas = [];
  try {
    const collection = db.collection("animangas");
    // Filtert nur die Dokumente, deren genre-Feld genau passt
    const query = { genre };
    animangas = await collection.find(query).toArray();
    animangas.forEach((animanga) => {
      animanga._id = animanga._id.toString();
    });
  } catch (error) {
    console.error("Error fetching animangas by genre:", error.message);
  }
  return animangas;
}

// Get animanga by id
async function getAnimanga(id) {
  let animanga = null;
  try {
    const collection = db.collection("animangas");
    const query = { _id: new ObjectId(id) }; // filter by id
    animanga = await collection.findOne(query);

    if (!animanga) {
      console.log("No animanga with id " + id);
      // TODO: errorhandling
    } else {
      animanga._id = animanga._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return animanga;
}

// create animanga
// Example movie object:
/* 
{ 
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten"
} 
*/
async function createAnimanga(animanga) {
  // Optional: Standardwerte setzen
  if (!animanga.image) animanga.image = "/images/placeholder.png";

  try {
    const collection = db.collection("animangas");
    const result = await collection.insertOne(animanga);
    return result.insertedId.toString();
  } catch (error) {
    console.error("Error creating animanga:", error.message);
    return null;
  }
}

// delete animanga by id
// returns: id of the deleted animanga or null, if animanga could not be deleted
async function deleteAnimanga(id) {
  try {
    const collection = db.collection("animangas");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No animanga with id " + id);
    } else {
      console.log("Animanga with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.error("Error deleting animanga:", error.message);
  }
  return null;
}

// get all genres
export async function getGenres() {
  const collection = db.collection("genres");
  const genres = await collection.find({}).toArray();
  // convert objectid to string, that it gets recognized
  genres.forEach((g) => (g._id = g._id.toString()));
  return genres;
}

// get all quotes by genre
export async function getQuotesByGenre(genre) {
  const collection = db.collection("quotes");
  // filter quotes for each genre
  const quotes = await collection.find({ genre }).toArray();
  quotes.forEach(q => {
    q._id = q._id.toString();
  });
  return quotes;
}

// get all quotes
export async function getQuotes() {
  const collection = db.collection("quotes");
  const quotes = await collection.find({}).toArray();
  quotes.forEach(q => {
    q._id = q._id.toString();
  });
  return quotes;
}


// export all functions so that they can be used in other files
export default {
  getAnimangas,
  getAnimangasByGenre,
  getAnimanga,
  createAnimanga,
  deleteAnimanga,
  getGenres,
  getQuotesByGenre,
  getQuotes
};
