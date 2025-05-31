<svelte:options runes={true} />

<script>
  import AnimangaCard from "$lib/components/AnimangaCard.svelte";

  // result of load() in data where then an array entries gets created with all the attributes
  let { data } = $props();
  let entries = data.animangas;
  let quotesData = data.quotes;

  // creates a copy of entries (Sprea Operator[...entries]), sorts it descending and saves it in the new array ranked
  let ranked = [...entries].sort((a, b) => b.score - a.score);

  // const for all the quotes with new structure
  let quotes = quotesData.map((q) => `${q.name}: ${q.quote}`);

  // gets a random number from 0-1 multiplies it by the number of all quotes and rounds it down to the next number
  let currentQuote = $state(quotes[Math.floor(Math.random() * quotes.length)]);

  // checks if the new quote is different from the current one, and loops until it gets a new one
  function shuffleQuote() {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === currentQuote);
    currentQuote = newQuote;
  }
</script>

<header class="header">
  <div class="left">
    <a href="/shounen/create" class="add-button">Add AniManga</a>
  </div>
  <div class="center-left">
    <div class="quote">
      <em>{currentQuote}</em>
      <button class="refresh-button" onclick={shuffleQuote}>↻</button>
    </div>
  </div>
  <div class="right">
    <span>Welcome Luffy</span>
    <img src="/images/luffy_pb.png" alt="Luffy" class="profile-pic" />
  </div>
</header>

<div class="center-box shounen">
  <table class="list-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Title</th>
        <th class="column-typ">Typ</th>
        <th class="column-status">Status</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <!-- loops through each ranked and creates a AnimangaCard -->
      {#each ranked as animanga, i}
        <AnimangaCard {animanga} rank={i + 1} genre="shounen" />
      {/each}
    </tbody>
  </table>
</div>

<style>
  /* definying hot the center box should look */
  .center-box.shounen {
    background: #2d2d2d;
    color: white;
    max-width: 1200px;
    margin: 5rem auto;
    padding: 3rem 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  /* making sure the whole width is getting used in the center box */
  .list-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  /* line under the titles in the center box */
  th {
    border-bottom: 1px solid #444;
  }

  /* format of the center box where each value must stand */
  th:nth-child(1) {
    width: 10%;
    min-width: 50px;
    text-align: center;
  }
  th:nth-child(2) {
    width: 35%;
    min-width: 200px;
  }
  th:nth-child(3) {
    width: 18%;
  }
  th:nth-child(4) {
    width: 18%;
  }
  th:nth-child(5) {
    width: 19%;
    min-width: 120px;
  }

  /* whole format of the header */
  .header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #1a1a1a;
    color: white;
    gap: 1rem;
  }
  .header .left {
    justify-self: start;
  }
  .header .center-left {
    justify-self: center;
    text-align: center;
  }
  .header .right {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* luffy profile picture*/
  .profile-pic {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }

  /* add Animanga button */
  .add-button {
    background: #444;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  /* background refresh button grey*/
  .refresh-button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
  }

  /* remove typ and status titles*/
  @media (max-width: 992px) {
    .column-typ,
    .column-status {
      display: none;
    }
  }
</style>
