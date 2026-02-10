import { flap } from "./bird.js";

document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("touchstart", e => {
  if (e.touches.length > 1) e.preventDefault();
},{ passive:false });

document.addEventListener("keydown", flap);
document.addEventListener("mousedown", flap);
document.addEventListener("touchstart", flap);
