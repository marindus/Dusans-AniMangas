<svelte:options runes={true} />

<script>
// receiveing the data for id and save the data to animanga
  let { data } = $props();
  let animanga = data.animanga;
</script>

<a href="/seinen" class="btn btn-secondary mb-4">← Back to Seinen</a>

<div class="detail-box">
  <h1>{animanga.title}</h1>
  <div class="detail-row">
    <img class="cover" src={animanga.image} alt={animanga.title} />
    <div class="info">
      <div><strong>Episodes:</strong> {animanga.episodes}</div>
      <div><strong>Chapters:</strong> {animanga.chapters}</div>
      <div><strong>Type:</strong> {animanga.type}</div>
      <div><strong>Status:</strong> {animanga.status}</div>
      <div><strong>Score:</strong> {animanga.score}</div>
      <div><strong>Favorite Character:</strong> {animanga.favchar}</div>
      <!-- delete action that sends the server the id which needs to be deleted -->
      <form method="POST" action="?/delete" style="margin-top: 2rem;">
        <input type="hidden" name="id" value={animanga._id} />
        <button class="btn btn-danger">Delete AniManga</button>
      </form>
    </div>
  </div>
</div>

<style>
/* making sure that everything is in a grey box, like the center-box */
.detail-box {
  background: #222;
  color: white;
  border-radius: 18px;
  max-width: 950px;
  margin: 2.5rem auto 0 auto;
  padding: 2.5rem 2rem 2rem 2rem;
  box-shadow: 0 6px 24px rgba(0,0,0,0.28);         
}

/* making sure that the informations are next to the picture */
.detail-row {
  display: flex;
  align-items: flex-start;
  gap: 3.5rem;
  margin-top: 1rem;
}

/* design of the image, that it isn't so big */
.cover {
  width: 340px;
  height: 340px;
  object-fit: cover;
  border-radius: 12px;
  background: #191919;
  box-shadow: 0 4px 12px rgba(0,0,0,0.14);
}

/* design of the informations for this animanga */
.info {
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  gap: 1rem;
  margin-top: 0.2rem;
}

/* design of the title */
h1 {
  font-size: 3rem;
  margin-bottom: 0.7rem;
}

/* design of the back to seinen button */
.btn-secondary {
  background: #444;
  color: white;
  border: none;
  padding: 0.4rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  display: inline-block;
}

/* design of the delete button */
.btn-danger {
  background: #c0392b;
  color: white;
  border: none;
  padding: 0.55rem 1.4rem;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
}

/* makes sure that the design is still nice and readable on smaller screens */
@media (max-width: 768px) {
  .detail-box { padding: 1.2rem; }
  .detail-row { flex-direction: column; align-items: center; gap: 1.7rem; }
  .cover { width: 220px; height: 220px; }
  h1 { font-size: 2.1rem; text-align: center; }
  .info { font-size: 1rem; align-items: flex-start; text-align: center; }
}
</style>
