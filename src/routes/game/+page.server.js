import db from "$lib/server/db.js";

export async function load() {
  // Holt ALLE Quotes
  const quotes = await db.getQuotes();
  // Gebe nur name, quote, animanga und genre zurück
  return {
    quotes: quotes.map(q => ({
      name: q.name,
      quote: q.quote,
      animanga: q.animanga,
      genre: q.genre
    }))
  };
}
