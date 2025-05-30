import db from "$lib/server/db.js";

export async function load() {
  const genre = 'Seinen';
  // get both array in parallel animangas and quotes
  const [animangas, quotes] = await Promise.all([
    db.getAnimangasByGenre(genre),
    db.getQuotesByGenre(genre)
  ]);

  return {
    animangas,
    quotes
  };
}
