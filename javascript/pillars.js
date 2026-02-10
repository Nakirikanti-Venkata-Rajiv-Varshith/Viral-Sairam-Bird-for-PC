import { state } from "./state.js";

export function createPillars() {

    if (!state.gameRunning) return;

    const topHeight = Math.random() * (state.gameHeight - state.gap - 200) + 60;

    const top = document.createElement("div");
    const bottom = document.createElement("div");

    top.className = "pillar";
    bottom.className = "pillar";
    top.classList.add("top"); 

    const topCap = document.createElement("div");
    const bottomCap = document.createElement("div");

    topCap.className = "pillar-cap";
    bottomCap.className = "pillar-cap";

    top.appendChild(topCap);
    bottom.appendChild(bottomCap);

    top.style.height = topHeight + "px";
    top.style.top = "0px";

    bottom.style.height = state.gameHeight - topHeight - state.gap + "px";
    bottom.style.bottom = "0px";

    const startX = state.game.clientWidth + 120;

    state.game.appendChild(top);
    state.game.appendChild(bottom);

    state.pillars.push({
        top,
        bottom,
        x:startX,
        passed:false
    });
}
