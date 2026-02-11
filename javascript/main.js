import "./input.js";
import { startGame } from "./start_restart.js";
import { state } from "./state.js";


state.liveScoreEl.innerText =
   "Score: 0 | Highest Score: " + state.highestScore;

window.addEventListener("resize",()=>{
    state.gameHeight=state.game.clientHeight;
});

state.gameOverBanner.addEventListener("click", () => {
    if (!state.gameRunning && state.canRestart) {
        startGame();
    }
});

startGame();
