import { flap } from "./bird.js";
import { playFlapSound } from "./audio.js";

document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("touchstart", e => {
  if (e.touches.length > 1) e.preventDefault();
},{ passive:false });

let audioUnlocked = false;

function unlockAudio() {

  if (audioUnlocked) return;

  playFlapSound();

  audioUnlocked = true;
}

document.addEventListener("keydown", (e) => {
  unlockAudio();
  flap(e);
});

document.addEventListener("mousedown", (e) => {
  unlockAudio();
  flap(e);
});

document.addEventListener("touchstart", (e) => {
  unlockAudio();
  flap(e);
});
