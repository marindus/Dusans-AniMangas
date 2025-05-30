<svelte:options runes={true} />

<script>
  import CharacterCard from '$lib/components/CharacterCard.svelte';
  let { data } = $props();
  let genres = data.genres;
</script>

<div class="center-box">
  <h1>Welcome to Dusan's favorite AniMangas</h1>
  <p>
    My journey into the world of anime began 10 years ago, and five years
    later I discovered my passion for manga.
  </p>
  <h4 class="spacing-top">These are my three favorite genres</h4>
  <p class="subtle-text">pick one to explore it further</p>

  <div class="character-row">
    <!-- loops through each genre and creates a CharacterCard -->
    {#each genres as genre}
      <CharacterCard
        normalSrc={genre.normalSrc}
        hoverSrc={genre.hoverSrc}
        alt={genre.alt}
        genre={genre.genre}
        link={genre.link}
      />
    {/each}
  </div>
</div>
