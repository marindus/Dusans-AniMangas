<svelte:options runes={true} />

<script>
  import "./styles.css";
  let { children } = $props();
</script>

<!-- navbar goes away on small displays -->
<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Dusan's AniMangas</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">

        <!-- rankings dropdown -->
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            id="rankingsDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Rankings
          </a>
          <ul class="dropdown-menu" aria-labelledby="rankingsDropdown">
            <li><a class="dropdown-item" href="/shounen">Shounen</a></li>
            <li><a class="dropdown-item" href="/seinen">Seinen</a></li>
            <li><a class="dropdown-item" href="/sport">Sport</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="/animangas">All</a></li>
          </ul>
        </li>

        <!-- direct link for quotes game -->
        <li class="nav-item">
          <a class="nav-link" href="/game">Quotes Game</a>
        </li>

      </ul>
    </div>
  </div>
</nav>

<!-- makes sure that the navbbar is on top of every page -->
<div class="container mt-3">
  {@render children()}
</div>
