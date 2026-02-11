import { state } from "./state.js";
import { updateBird } from "./bird.js";
import { crashSound, nearSound } from "./audio.js";


export function gameLoop() {

    if (!state.gameRunning) return;

    updateBird();

    const speed = state.pipeSpeed;
    const pillarWidthEstimate = 120;
    const birdRect = state.birdRectCached || state.bird.getBoundingClientRect();

    state.pillars.forEach((p, index) => {

        p.x -= speed;

        p.top.style.transform = `translate3d(${p.x}px,0,0) scaleY(-1)`;
        p.bottom.style.transform = `translate3d(${p.x}px,0,0)`;

        const topRect = p.top.getBoundingClientRect();
        const bottomRect = p.bottom.getBoundingClientRect();


        const nearDistance = state.gap * 0.22;

        const birdRect = state.birdRectCached || state.bird.getBoundingClientRect();

        const nearTop =
            Math.abs(birdRect.bottom - topRect.bottom) < nearDistance &&
            birdRect.right > topRect.left &&
            birdRect.left < topRect.right;

        const nearBottom =
            Math.abs(birdRect.top - bottomRect.top) < nearDistance &&
            birdRect.right > bottomRect.left &&
            birdRect.left < bottomRect.right;

        if ((nearTop || nearBottom) && !p.nearPlayed) {
            nearSound.currentTime = 0;
            nearSound.play().catch(() => { });
            p.nearPlayed = true;
        }



        if (
            birdRect.right > topRect.left &&
            birdRect.left < topRect.right &&
            (birdRect.top < topRect.bottom || birdRect.bottom > bottomRect.top)
        ) {
            endGame();
        }

        if (!p.passed && topRect.right < birdRect.left) {

            state.score++;
            p.passed = true;

            if (state.score > state.highestScore) {
                state.highestScore = state.score;
                localStorage.setItem("flappy_highestscore", state.highestScore);

                state.liveScoreEl.classList.add("new-record");

            }

            state.liveScoreEl.innerText =
                "Score: " + state.score + " | Highest Score: " + state.highestScore;


            state.level_hard++;

            if (state.level_hard >= 5) {
                state.gap = Math.max(50, Math.round(state.gap * 0.9));
                state.level_hard = 0;
                state.pipeSpeed = Math.min(9, state.pipeSpeed + 0.3);
            }
        }


        if (topRect.right < -pillarWidthEstimate) {
            p.top.remove();
            p.bottom.remove();
            state.pillars.splice(index, 1);
        }
    });

    state.rafId = requestAnimationFrame(gameLoop);
}

export function endGame() {

    if (!state.gameRunning) return;

    state.gameRunning = false;

    state.game.classList.add("shake");
    setTimeout(() => {
        state.game.classList.remove("shake");
    }, 200);


    clearInterval(state.pillarSpawnerId);
    cancelAnimationFrame(state.rafId);

    try {
        crashSound.src = "./assets/audio/SairamSairam.mp3";
        crashSound.currentTime = 0;
        crashSound.play().catch(() => { });
    } catch { }

    state.finalScoreEl.innerText =
        "Score: " + state.score + " | Highest Score: " + state.highestScore;
    state.gameOverBanner.style.display = "flex";

    state.canRestart = false;
    let countdown = 3;

    let timerEl = state.gameOverBanner.querySelector(".restart-timer");

    if (!timerEl) {
        timerEl = document.createElement("div");
        timerEl.className = "restart-timer";
        timerEl.style.marginTop = "8px";
        timerEl.style.fontSize = "24px";
        timerEl.style.opacity = "0.9";
        timerEl.style.color = "#000";

        state.gameOverBanner
            .querySelector(".game-over-box")
            ?.appendChild(timerEl);
    }

    timerEl.innerText = "Restart available in " + countdown + "s";

    state.restartTimerId = setInterval(() => {

        countdown--;

        if (countdown > 0) {
            timerEl.innerText = "Restart available in " + countdown + "s";
        } else {
            clearInterval(state.restartTimerId);
            state.canRestart = true;
            timerEl.innerText = "Click to restart";
        }

    }, 1000);
}

