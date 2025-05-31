<svelte:options runes={true} />

<script>
  // get props when CharacterCard is called
  let {
    normalSrc,
    hoverSrc,
    alt = "",
    genre = "",
    link = "#"
  } = $props();
</script>

<a href={link} class="character-card">
  <div class="hover-image-wrapper">
    <img src={normalSrc} alt={alt} class="img normal" />
    <img src={hoverSrc} alt={alt + " action"} class="img hover" />
  </div>
  <p class="genre-label">{genre}</p>
</a>

<style>
  /* design of the picture and genretext */
  .character-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    text-decoration: none;
  }

  /* container for the images */
  .hover-image-wrapper {
    position: relative;
    width: 160px;
    height: 250px;
  }

  /* both pictures are exaytly over each other, smooth transition */
  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    transition: opacity 0.3s ease;
    object-fit: contain;
  }

  /* hover is invisble */
  .img.hover {
    opacity: 0;
    z-index: 1;
  }

  /* when you hover, then normal is invisble */
  .hover-image-wrapper:hover .img.hover {
    opacity: 1;
  }
  .hover-image-wrapper:hover .img.normal {
    opacity: 0;
  }

  /* design genre text */
  .genre-label {
    margin-top: 0.75rem;
    color: white;
    font-size: 1rem;
  }
</style>
