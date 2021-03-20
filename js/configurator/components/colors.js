export function colors() {
    colorButtons();
    colorCar();

    console.log("Colors component is loaded...");
}

const settings = {
    elementToPaint: undefined,
    colors: [
        "#FF0000", //
        "#FF8000",
        "#FFFF00",
        "#00FF00",
        "#00FF80",
        "#00FFFF",
        "#0080FF",
        "#0000FF",
        "#8000FF",
        "#FF00FF",
        "#FF0080",
        "#FFFFFF",
    ],
    templates: {
        color: document.querySelector(".t-color").content,
    },
    hooks: {
        colorList: document.querySelector("[data-field=colors]"),
    },
};

function colorButtons() {
    showColorButtons();

    function showColorButtons() {
        const templateColor = settings.templates.color;
        settings.colors.forEach((color) => {
            const clone = templateColor.cloneNode(true);

            clone.querySelector(".c-color").setAttribute("data-color", color);
            clone.querySelector(".c-color").style.setProperty("--color", color);

            // TODO: Highlight pickedColor
            // if (color === settings.pickedColor) {
            //     clone.querySelector(".c-color-picker__color").classList.add("is-active");
            // }

            clone.querySelector(".c-color").addEventListener("click", changeColor);

            settings.hooks.colorList.appendChild(clone);
        });
    }

    function changeColor() {
        const clickedColorButton = this;
        console.log(clickedColorButton.dataset.color);
        console.log("clicked button", clickedColorButton);
        const clickedColorButtonInner = clickedColorButton;

        if (settings.elementToPaint === undefined) {
            console.log("no part chosen");
        } else {
            const start = clickedColorButtonInner.getBoundingClientRect();
            const end = settings.elementToPaint.getBoundingClientRect();

            const elementHeight = end.height / 2;
            console.log(elementHeight);

            const elementWidth = end.width / 2;

            const diffX = end.x - start.x + elementWidth;
            console.log(diffX);
            const diffY = end.y - start.y + elementHeight;
            console.log(diffY);

            clickedColorButtonInner.style.setProperty("--diffX", diffX);
            clickedColorButtonInner.style.setProperty("--diffY", diffY);
            clickedColorButtonInner.classList.add("animate-color-in");

            clickedColorButtonInner.addEventListener("animationend", animateColor);
            // TODO:
            // document.querySelector(".c-color-picker__color").classList.add("animate-color-scale");

            function animateColor() {
                clickedColorButtonInner.classList.remove("animate-color-in");
                clickedColorButtonInner.removeEventListener("animationend", animateColor);
                settings.elementToPaint.style.fill = clickedColorButton.dataset.color;
            }
        }

        settings.pickedColor = clickedColorButton.dataset.color;

        // TODO:
        // const findLatestClickedColor = document.querySelector(".c-color-picker__color.is-active");
        // if (findLatestClickedColor) {
        //     findLatestClickedColor.classList.remove("is-active");
        // }
        // clickedColorButton.classList.add("is-active");
    }
}

//car coloring
function colorCar() {
    const groups = document.querySelectorAll(".snes__part");
    console.log(groups);
    groups.forEach((group) => {
        group.addEventListener("click", storeElement);
        group.style.fill = "#fff";

        function storeElement() {
            groups.forEach((group) => {
                group.classList.remove("g-to-color_active");
            });
            settings.elementToPaint = group;
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
