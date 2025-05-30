import db from "$lib/server/db.js";

// actions gets called when you send the forms
export const actions = {
  create: async ({ request }) => {
    // get all data from forms
    const data = await request.formData();
    //extract data from forms and create a new object
    let animanga = {
      title: data.get("title"),
      image: data.get("image"),
      episodes: Number(data.get("episodes")),
      chapters: Number(data.get("chapters")),
      type: data.get("type"),
      status: data.get("status"),
      score: Number(data.get("score")),
      genre: data.get("genre"),
      favchar: data.get("favchar"),
    };
    // saves new animanga object
    await db.createAnimanga(animanga);
    return { success: true };
  }
};
