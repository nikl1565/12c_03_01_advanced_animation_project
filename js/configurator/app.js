// Layouts
import { sidebar } from "/js/configurator/layouts/sidebar.js";

// Components

document.addEventListener("DOMContentLoaded", start);

const config = {
    settings: {
        elementToPaint: undefined,
    },
    features: {},
};

async function start() {
    await getData("../svg/snes.svg");

    sidebar();
}

async function getData(url) {
    const response = await fetch(url);
    const data = await response.text();

    document.querySelector("[data-js-hook=screen]").innerHTML += data;
}
