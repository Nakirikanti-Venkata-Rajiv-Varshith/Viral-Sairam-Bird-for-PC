export const crashSound = new Audio("./assets/audio/SairamSairam.mp3");
export const nearSound = new Audio("./assets/audio/Sairam.mp3");

const flapBase = new Audio("./assets/audio/sfx_wing.mp3");
flapBase.preload = "auto";

export function playFlapSound() {

    const sound = flapBase.cloneNode(); 
    sound.play().catch(()=>{});

}