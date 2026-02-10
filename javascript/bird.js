import { state } from "./state.js";
import { flapSound } from "./audio.js";
import { endGame } from "./game.js";

export function flap() {

    if (!state.gameRunning) return;

    state.velocity = -7;

    if (!state.audioUnlocked) {
        flapSound.play().catch(()=>{});
        state.audioUnlocked = true;
    }

    flapSound.currentTime = 0;
    flapSound.play().catch(()=>{});
}

export function updateBird() {

    state.velocity += state.gravity;
    state.birdY += state.velocity;

    const maxY = state.gameHeight - state.bird.offsetHeight;

    if (state.birdY < 0) state.birdY = 0;
    if (state.birdY > maxY) state.birdY = maxY;

    state.bird.style.top = state.birdY + "px";
    
    const angle = Math.max(-25, Math.min(60, state.velocity * 3));
    state.bird.style.transform = `rotate(${angle}deg)`;


    state.birdRectCached = state.bird.getBoundingClientRect();

    if (state.birdY <= 0 || state.birdY >= maxY) {
        endGame();
    }
}
