import db from "$lib/server/db.js";
import { redirect } from "@sveltejs/kit";

// gets the corresponding id and gives it to page.svelte as data
export async function load({ params }) {
  return {
    animanga: await db.getAnimanga(params.shounen_id),
  };
}

// gets the id, deletes it from the db and sends you back to shounen
export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    await db.deleteAnimanga(data.get("id"));
    throw redirect(303, "/shounen");
  },
};
