<svelte:options runes={true} />

<script>
    let { data } = $props();
    let allQuotes = data.quotes;
    let initialized = false;

    // State
    let usedIndexes = $state([]);
    let currentQuoteIndex = $state(-1);
    let options = $state([]);
    let score = $state(0);
    let highscore = $state(0);
    let gameOver = $state(false);
    let showJoker = $state(false);
    let jokerUsed = $state(false);
    let winner = $state(false);

    // Startet oder resettet das Spiel
    function startGame() {
        usedIndexes = [];
        score = 0;
        gameOver = false;
        showJoker = false;
        jokerUsed = false;
        winner = false;
        nextQuestion();
    }

    // Erstellt die nächste Frage/Zitat
    function nextQuestion() {
        if (usedIndexes.length === allQuotes.length) {
            // Alle Zitate durch, Gewinner!
            winner = true;
            gameOver = true;
            highscore = Math.max(highscore, score);
            return;
        }

        const unused = allQuotes
            .map((_, i) => i)
            .filter((i) => !usedIndexes.includes(i));
        const randomIndex = unused[Math.floor(Math.random() * unused.length)];
        currentQuoteIndex = randomIndex;
        usedIndexes = [...usedIndexes, randomIndex];

        const correctName = allQuotes[randomIndex].name;
        const names = [correctName];
        let availableNames = allQuotes
            .map((q) => q.name)
            .filter((n) => n !== correctName);

        while (names.length < 5 && availableNames.length > 0) {
            const pickIdx = Math.floor(Math.random() * availableNames.length);
            names.push(availableNames[pickIdx]);
            availableNames.splice(pickIdx, 1);
        }

        options = shuffle(names);
        showJoker = false;
    }

    // Mische-Helper
    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // Antwort auswerten
    function answer(name) {
        if (gameOver) return;
        if (name === allQuotes[currentQuoteIndex].name) {
            score++;
            nextQuestion();
        } else {
            gameOver = true;
            highscore = Math.max(highscore, score);
        }
    }

    // Joker verwenden
    function useJoker() {
        if (!jokerUsed) {
            showJoker = true;
            jokerUsed = true;
        }
    }

    // Auswahl per Button
    function selectName(event) {
        if (gameOver) return;
        const name = event.target.dataset.name;
        answer(name);
    }

    // Beim Laden direkt Spiel starten
    $effect(() => {
        if (!initialized && allQuotes?.length) {
            startGame();
            initialized = true;
        }
    });
</script>

<div class="game-container">
    <h1 class="game-title">Quotes Game</h1>

    {#if !gameOver && currentQuoteIndex !== -1}
        <div class="score-row">
            <span>Score: {score}</span>
            <span class="highscore">Highscore: {highscore}</span>
            <button class="joker-btn" disabled={jokerUsed} onclick={useJoker}>
                Joker {jokerUsed ? '(used)' : ''}
            </button>
        </div>

        <div class="quote-box">
            <span class="quote-mark">“</span>
            <span class="the-quote">{allQuotes[currentQuoteIndex].quote}</span>
            <span class="quote-mark">”</span>
        </div>

        {#if showJoker}
            <div class="joker-hint">
                <b>Animanga:</b> {allQuotes[currentQuoteIndex].animanga}
            </div>
        {/if}

        <div class="options-row">
            {#each options as name}
                <button class="option-btn" data-name={name} onclick={selectName}>
                    {name}
                </button>
            {/each}
        </div>

    {:else}
        {#if winner}
            <div class="winner-box">
                <h2 class="winner-text">WINNER WINNER CHICKEN DINNER!</h2>
                <div>Perfect performance! Your Score: <b>{score}</b></div>
                <div class="actions">
                    <button class="restart-btn" onclick={startGame}>
                        Play again
                    </button>
                    <a class="end-btn" href="/">Close</a>
                </div>
            </div>
        {:else}
            <div class="gameover-box">
                <h2>Game Over!</h2>
                <div>Your Highscore: <b>{score}</b></div>
                <div class="actions">
                    <button class="restart-btn" onclick={startGame}>
                        Play again
                    </button>
                    <a class="end-btn" href="/">Close</a>
                </div>
            </div>
        {/if}
    {/if}
</div>

<style>
    .game-container {
        max-width: 650px;
        margin: 4rem auto;
        background: #232323;
        border-radius: 20px;
        padding: 2.5rem 2rem;
        color: #fff;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.34);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .game-title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        font-weight: 700;
        letter-spacing: 2px;
    }
    .score-row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2.2rem;
        font-size: 1.15rem;
    }
    .highscore {
        font-weight: 600;
        color: #2a7fff;
    }
    .joker-btn {
        background: #ffbc05;
        color: #222;
        border: none;
        border-radius: 6px;
        padding: 0.5rem 1.2rem;
        font-weight: bold;
        font-size: 1.07rem;
        cursor: pointer;
        margin-left: 1.2rem;
        transition: background 0.18s;
    }
    .joker-btn:disabled {
        background: #ccc;
        color: #444;
        cursor: not-allowed;
    }
    .quote-box {
        font-size: 1.45rem;
        font-style: italic;
        margin-bottom: 1.4rem;
        margin-top: 0.5rem;
        background: #2d2d2d;
        padding: 1.4rem 1.2rem;
        border-radius: 11px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.13);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.2rem;
    }
    .quote-mark {
        font-size: 2.1rem;
        color: #ffe87a;
        font-family: serif;
    }
    .the-quote {
        margin: 0 0.6rem;
        letter-spacing: 1px;
        font-size: 1.32rem;
    }
    .options-row {
        display: flex;
        flex-direction: column;
        gap: 1.1rem;
        margin-top: 2.2rem;
        width: 100%;
    }
    .option-btn {
        padding: 1rem;
        font-size: 1.12rem;
        border: none;
        border-radius: 9px;
        background: #3a52d1;
        color: #fff;
        font-weight: 600;
        transition: background 0.18s;
        cursor: pointer;
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.09);
    }
    .option-btn:hover {
        background: #2a7fff;
    }
    .gameover-box {
        text-align: center;
        margin-top: 2.5rem;
    }
    .gameover-box h2 {
        font-size: 2.2rem;
        margin-bottom: 1.2rem;
        color: #ff5353;
    }
    .actions {
        margin-top: 1.8rem;
        display: flex;
        gap: 1.6rem;
        justify-content: center;
    }
    .restart-btn,
    .end-btn {
        padding: 0.8rem 1.7rem;
        font-size: 1.17rem;
        border-radius: 7px;
        border: none;
        cursor: pointer;
        text-decoration: none;
    }
    .restart-btn {
        background: #2a7fff;
        color: #fff;
        font-weight: 700;
    }
    .restart-btn:hover {
        background: #184ba1;
    }
    .end-btn {
        background: #333;
        color: #fff;
        font-weight: 500;
        border: 1.5px solid #999;
        transition: background 0.2s;
    }
    .end-btn:hover {
        background: #2d2d2d;
    }
    .joker-hint {
        margin: 1rem 0 0.8rem 0;
        color: #ffe87a;
        font-size: 1.05rem;
        font-weight: 500;
        background: #363636;
        padding: 0.7rem 1.3rem;
        border-radius: 7px;
        display: inline-block;
    }
    .winner-text {
        color: #4caf50;
        font-size: 2.2rem;
        margin-bottom: 1rem;
    }
    .winner-box {
        text-align: center;
        margin-top: 2rem;
    }
</style>
