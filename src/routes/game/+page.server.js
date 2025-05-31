import db from "$lib/server/db.js";

export async function load() {
  // gets all quotes
  const quotes = await db.getQuotes();
  // gives back name, quote, animanga and genre
  return {
    quotes: quotes.map(q => ({
      name: q.name,
      quote: q.quote,
      animanga: q.animanga,
      genre: q.genre
    }))
  };
}
