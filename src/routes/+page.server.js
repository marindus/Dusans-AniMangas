import { getGenres } from "$lib/server/db.js";

// get all data for genres
export async function load() {
  return {
    genres: await getGenres()
  };
}
