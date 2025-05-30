import db from "$lib/server/db.js";

export async function load() {
  // get both array in parallel animangas and quotes
  const [animangas, quotes] = await Promise.all([
    db.getAnimangas(),
    db.getQuotes()
  ]);

  return {
    animangas,
    quotes
  };
}
