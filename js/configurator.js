document.addEventListener("DOMContentLoaded", start);

const settings = {};

const templates = {};

async function start() {
    await getData("../svg/snes.svg");
}

async function getData(url) {
    const response = await fetch(url);
    const data = await response.text();

    document.querySelector("[data-js-hook=screen]").innerHTML += data;
}

const lol = ["0", "1"];
