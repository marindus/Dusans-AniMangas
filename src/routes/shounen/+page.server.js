import db from "$lib/server/db.js";

export async function load() {
  const genre = 'Shounen';
  // get both arrays in parallel with Promise.all()
  const [animangas, quotes] = await Promise.all([
    db.getAnimangasByGenre(genre),
    db.getQuotesByGenre(genre)
  ]);

  return {
    animangas,
    quotes
  };
}
