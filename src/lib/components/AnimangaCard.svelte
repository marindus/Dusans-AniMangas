<svelte:options runes={true} />

<script>
  let { animanga, rank, genre } = $props();
</script>

<tr class="animanga-row">
  <td class="rank">{rank}</td>
  <td class="title-cell">
    <img class="cover" src={animanga.image} alt={animanga.title} />
    <div class="info">
      <a href={"/" + genre + "/" + animanga._id}
        ><strong>{animanga.title}</strong></a
      >
      <div>Episodes: {animanga.episodes}</div>
      <div>Chapters: {animanga.chapters}</div>
    </div>
  </td>
  <td class="type-cell">
    <span>{animanga.type}</span>
  </td>
  <td class="status-cell">
    <span>{animanga.status}</span>
  </td>
  <td class="center-cell stars-cell">
    <div class="score-stars">
      <span class="score-number">{Number(animanga.score).toFixed(1)}</span>
      <span class="star-icons">
        {#each Array(5) as _, i}
          <span class={i < Math.round(animanga.score) ? "filled" : "empty"}
            >⭐</span
          >
        {/each}
      </span>
    </div>
  </td>
</tr>

<style>
  .animanga-row {
    border-bottom: 2px solid #444;
    height: 110px;
    vertical-align: middle;
  }
  td {
    vertical-align: middle !important;
  }
  .rank {
    font-size: 2rem;
    text-align: center;
    min-width: 50px;
    vertical-align: middle;
  }
  .title-cell {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    min-width: 200px;
    padding: 0.6rem 0;
    vertical-align: middle;
  }
  .center-cell {
    text-align: center;
    vertical-align: middle !important;
  }
  .cover {
    width: 65px;
    height: 90px;
    object-fit: cover;
    border-radius: 6px;
    background: #222;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .stars-cell {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
  .score-stars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    height: 100%;
  }
  .score-number {
    font-size: 1.3rem;
    color: gold;
    font-weight: bold;
    min-width: 2.2em;
    text-align: right;
    margin-right: 0.2em;
    display: inline-block;
    vertical-align: middle;
  }
  .star-icons {
    display: flex;
    align-items: center;
    vertical-align: middle;
  }
  .star-icons span {
    font-size: 1.5rem;
    margin-right: 2px;
  }
  .star-icons .filled {
    color: gold;
  }
  .star-icons .empty {
    color: #555;
    opacity: 0.3;
  }

/* making sure the rankings are still readable when small screen */
@media (max-width: 768px) {
  .type-cell,
  .status-cell,
  .star-icons {
    display: none;
  }

  /* makes sure the title score is in the middle */
  :global(.list-table th:nth-child(5)),
  .stars-cell {
    text-align: center;
  }
}

</style>
