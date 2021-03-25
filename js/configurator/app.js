// Layouts
import { sidebar } from "./layouts/sidebar.js";

// Components

document.addEventListener("DOMContentLoaded", start);

const config = {
    settings: {
        elementToPaint: undefined,
    },
    features: {},
};

async function start() {
    //REDIRECTS TO GAME IF STATE IS CURSED
    if (sessionStorage.getItem("cursed") === "true") {
        document.querySelector(".cursed_animation").classList.remove("hide");
        setTimeout(() => {
            window.location.href = "game.html";
        }, 1000);
    }
    await getData("./svg/snes.svg");

    sidebar();
}

async function getData(url) {
    const response = await fetch(url);
    const data = await response.text();

    document.querySelector("[data-js-hook=screen]").innerHTML += data;
}
