import { state } from "./state.js";
import { createPillars } from "./pillars.js";
import { gameLoop } from "./game.js";

export function startGame(){

    state.pillars.forEach(p=>{
        p.top.remove();
        p.bottom.remove();
    });

    state.pillars.length=0;

    state.birdY=state.gameHeight*0.3;
    state.velocity=0;
    state.score=0;
    state.gameRunning=true;
    state.audioUnlocked=false;
    state.level_hard=0;
    state.pipeSpeed = 4; 
    state.gravity = 0.4,
    state.gap = 280,

    state.gameOverBanner.style.display="none";
    state.liveScoreEl.innerText =
   "Score: 0 | Highest Score: " + state.highestScore;

    createPillars();
    state.pillarSpawnerId=setInterval(createPillars,1800);

    gameLoop();
}
