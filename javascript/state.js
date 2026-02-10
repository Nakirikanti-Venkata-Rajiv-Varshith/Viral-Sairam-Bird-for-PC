export const state = {

    bird: document.getElementById("bird"),
    game: document.getElementById("game-container"),
    gameOverBanner: document.getElementById("game-over"),
    finalScoreEl: document.getElementById("final-score"),
    liveScoreEl: document.getElementById("live-score"),

    gameHeight: 0,

    birdY: 0,
    velocity: 0,
    gravity: 0.4,

    score: 0,
    highestScore: Number(localStorage.getItem("flappy_highestscore")) || 0,

    gap: 280,
    gameRunning: false,
    audioUnlocked: false,
    pipeSpeed: 4,


    pillars: [],

    pillarSpawnerId: null,
    rafId: null,

    level_hard: 0,
    birdRectCached: null,

    canRestart: false,
    restartTimerId: null
};

state.gameHeight = state.game.clientHeight;
state.birdY = state.gameHeight * 0.3;
