export function colors() {
    colorButtons();
    paintElements();

    console.log("Colors component is loaded...");
}

const settings = {
    pickedColor: "#FF0000",
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

            clone.querySelector(".c-color").addEventListener("click", changeColor);

            settings.hooks.colorList.appendChild(clone);
        });
    }

    // Highlight pickedColor on load
    if (settings.pickedColor) {
        const defaultColor = document.querySelector(`.c-color[data-color="${settings.pickedColor}"]`);
        selectedColor(defaultColor);
    }

    function changeColor() {
        const clickedColor = this.dataset.color;

        // Set picked color
        settings.pickedColor = clickedColor;
        hoverElements(clickedColor);
        selectedColor(this);
    }

    function selectedColor(clickedColor) {
        const allColors = document.querySelectorAll(".c-color");
        allColors.forEach((color) => {
            color.classList.remove("selected_color");
        });
        clickedColor.classList.add("selected_color");
    }
}

function paintElements() {
    const elementsToPaint = document.querySelectorAll(".snes__part");

    console.log(elementsToPaint);

    elementsToPaint.forEach((elementToPaint) => {
        elementToPaint.addEventListener("click", paintElement);
    });

    function paintElement(event) {
        const clickedElement = event.target;

        // get pickedColor from settings
        const pickedColor = settings.pickedColor;
        const pickedColorElement = document.querySelector(`[data-color="${pickedColor}"]`);
        const pickedColorElementClone = document.querySelector(`[data-color="${pickedColor}"]`).cloneNode(true);
        console.log(pickedColorElementClone);

        console.log(pickedColorElement);

        const start = pickedColorElement.getBoundingClientRect();
        const end = clickedElement.getBoundingClientRect();

        const elementHeight = end.height / 2;
        console.log(elementHeight);

        const elementWidth = end.width / 2;

        const diffX = end.x - start.x + elementWidth;
        console.log(diffX);
        const diffY = end.y - start.y + elementHeight;
        console.log(diffY);

        pickedColorElement.style.setProperty("--diffX", diffX);
        pickedColorElement.style.setProperty("--diffY", diffY);
        pickedColorElement.classList.add("animate-color-in");

        pickedColorElement.addEventListener("animationend", animateColor);
        // TODO:
        // document.querySelector(".c-color-picker__color").classList.add("animate-color-scale");

        function animateColor() {
            pickedColorElement.classList.remove("animate-color-in");
            pickedColorElement.removeEventListener("animationend", animateColor);
            clickedElement.style.fill = settings.pickedColor;
        }
    }

    // TODO:
    // const findLatestClickedColor = document.querySelector(".c-color-picker__color.is-active");
    // if (findLatestClickedColor) {
    //     findLatestClickedColor.classList.remove("is-active");
    // }
    // clickedColorButton.classList.add("is-active");
}

//Hover effect
function hoverElements(clickedColor) {
    const parts = document.querySelectorAll("svg .snes__part");
    console.log(clickedColor);
    parts.forEach((part) => {
        part.addEventListener("mouseover", () => {
            // part.classList.add("g-to-color_active");
            part.style.fill = clickedColor;
        });
    });

    parts.forEach((part) => {
        part.addEventListener("mouseout", () => {
            //   part.classList.remove("g-to-color_active");
            part.style.fill = "#FFFFFF";
        });
    });
}
