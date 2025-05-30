<svelte:options runes={true} />

<script>
    // gets all attributes from the forms and saves it
    let { form } = $props();
</script>

<div class="header-links">
    <a href="/sport" class="back-link">← Back to Sport</a>
    <h1 class="main-title">Add new Sport AniManga</h1>
</div>

<!-- centre box for the forms -->
<div class="form-center-box">
    <form method="POST" action="?/create" class="form-content">
        <div class="form-group">
            <label for="title">Title*</label>
            <input name="title" id="title" type="text" required />
        </div>
        <div class="form-group">
            <label for="image">Image (URL)*</label>
            <input
                name="image"
                id="image"
                type="text"
                required
                value="/images/placeholder.png"
            />
        </div>
        <div class="form-group">
            <label for="episodes">Episodes</label>
            <input
                name="episodes"
                id="episodes"
                type="number"
                min="0"
            />
        </div>
        <div class="form-group">
            <label for="chapters">Chapters</label>
            <input
                name="chapters"
                id="chapters"
                type="number"
                min="0"
            />
        </div>
        <div class="form-group">
            <label for="type">Type*</label>
            <select name="type" id="type" required>
                <option value="Anime">Anime</option>
                <option value="Manga">Manga</option>
                <option value="Animanga">Animanga</option>
            </select>
        </div>
        <div class="form-group">
            <label for="status">Status*</label>
            <select name="status" id="status" required>
                <option value="going on">going on</option>
                <option value="enjoying right now">enjoying right now</option>
                <option value="finished">finished</option>
            </select>
        </div>
        <div class="form-group">
            <label for="score">Score*</label>
            <input
                name="score"
                id="score"
                type="number"
                step="0.1"
                min="0"
                max="5"
                required
            />
        </div>
        <div class="form-group">
            <label for="favchar">Favorite Character*</label>
            <input name="favchar" id="favchar" type="text" required />
        </div>
        <input type="hidden" name="genre" value="Sport" />
        <button type="submit" class="submit-btn">Add AniManga</button>
    </form>

    <!-- gets success message from server.js -->
    {#if form?.success}
        <p class="success-msg">AniManga created!</p>
    {/if}
</div>

<style>
    /* positioning of the back button and title */
    .header-links {
        max-width: 1000px;
        margin: 2rem auto 0 auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    /* back button design */
    .back-link {
        margin-bottom: 0.8rem;
        color: #fff;
        font-size: 1.5rem;
        text-decoration: none;
        background: #222;
        border-radius: 6px;
        padding: 0.5rem 1.3rem;
        display: inline-block;
        transition: background 0.15s;
    }

    /* hover from back button */
    .back-link:hover {
        background: #444;
    }

    /* design main title */
    .main-title {
        margin-bottom: 1.5rem;
        font-size: 2.8rem;
        color: #fff;
        font-weight: 700;
        line-height: 1.2;
    }

    /* center-box is in the middle with all attributs */
    .form-center-box {
        margin: 0 auto;
        margin-top: 2.5rem;
        max-width: 1000px;
        background: #232323;
        border-radius: 22px;
        padding: 3.5rem 3rem;
        box-shadow: 0 4px 28px rgba(0, 0, 0, 0.34);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* positioning of label and input, select */
    .form-content {
        width: 100%;
        max-width: 850px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }

    /* design of the titles */
    label {
        font-size: 1.8rem;
        font-weight: 600;
        color: #fff;
    }

    /* design of the input and select fields */
    input,
    select {
        padding: 1rem;
        font-size: 1.4rem;
        border: none;
        border-radius: 8px;
        background: #191919;
        color: #fff;
        margin-top: 0.2rem;
    }

    /* disable the numberbar on the right in each number field */
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* design of submit button */
    .submit-btn {
        margin-top: 2rem;
        padding: 1.3rem 0;
        border: none;
        border-radius: 10px;
        background: #2a7fff;
        color: #fff;
        font-size: 1.6rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
    }
    
    /* hover from submit button */
    .submit-btn:hover {
        background: #186bd4;
    }

    /* success text when animanga created */
    .success-msg {
        color: #36ff7a;
        font-size: 1.5rem;
        text-align: center;
        margin-top: 2rem;
    }
</style>
