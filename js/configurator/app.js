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

// TEST

gsap.registerPlugin(Draggable);

Draggable.create("#star", {
    bounds: document.querySelector(".c-tv__screen"),
});

/* 


function start() {
    const urls = ["svg/car_config.svg", "svg/hot_rod_flames.svg", "svg/lips-01.svg"];
    urls.forEach((url) => {
        getSVG(url);
    });
    colorButtons();
    featureButtons();
}

async function getSVG(url) {
    let response = await fetch(url);
    let svgData = await response.text();
    document.querySelector(".carSVG").innerHTML += svgData;
    colorCar();
}

//car coloring
function colorCar() {
    const groups = document.querySelectorAll(".g-to-color");
    console.log(groups);
    groups.forEach((group) => {
        group.addEventListener("click", storeElement);
        group.style.fill = "#fff";

        function storeElement() {
            groups.forEach((group) => {
                group.classList.remove("g-to-color_active");
            });
            elementToPaint = group;
            group.classList.add("g-to-color_active");
            group.addEventListener("click", toggleActive);

            console.log(group);
        }

        function toggleActive() {
            group.classList.remove("g-to-color_active");
            group.removeEventListener("click", toggleActive);
            elementToPaint = undefined;
        }
    });
}

//----------FEATURE FUNCTION---------------
// The model of all features
const features = {
    gun: false,
    rims: false,
    lips: false,
    flames: false,
};

function featureButtons() {
    document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
    const target = event.currentTarget;
    const feature = target.dataset.feature;

    //Takes the state of the feature and makes it reverse aka toogle
    features[feature] = !features[feature];

    //Features feature is true
    if (features[feature]) {
        // feature added
        console.log(`Feature ${feature} is turned on!`);

        // If feature is (now) turned on:
        target.classList.add("chosen");
        // - un-hide the feature-layer(s) in the #product-preview;
        document.querySelector(`.carSVG [data-feature=${feature}]`).classList.remove("hide");
    } else {
        // feature removed
        console.log(`Feature ${feature} is turned off!`);

        // Else - if the feature (became) turned off:
        // - no longer mark target as chosen
        target.classList.remove("chosen");
        // - hide the feature-layer(s) in the #product-preview
        document.querySelector(`.carSVG [data-feature=${feature}]`).classList.add("hide");
    }
}

*/
