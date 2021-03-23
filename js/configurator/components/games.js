const settings = {
    templates: {
        game: document.querySelector(".t-game").content,
        gameOption: document.querySelector(".t-game-option").content,
    },
    games: ["super-mario-world", "mega-man-7", "maximum-carnage", "killer-instinct", "dracula-x"],
};

export function games() {
    console.log("Games component is loaded...");

    settings.games.forEach((game) => {
        makeGameOption(game, settings.templates.gameOption);
    });
}

function makeGameOption(game, template) {
    const clone = template.cloneNode(true);
    const gameOptionList = document.querySelector("[data-option=games]");

    // Add image
    clone.querySelector(".c-option__image").src = `images/cartridges/${game}.png`;
    // Add sticker to page on click

    clone.querySelector(".c-option--game").addEventListener("click", addGame);

    // Show sticker option
    gameOptionList.append(clone);

    function addGame() {
        console.log("add game", game);

        const screen = document.querySelector("[data-js-hook=screen]");

        const clone = settings.templates.game.cloneNode(true);
        console.log(clone);
        clone.querySelector(".c-game__image").src = `images/cartridges/${game}.png`;

        screen.append(clone);

        makeEditable(settings);
    }
}

function makeEditable(settings) {
    const screen = document.querySelector("[data-js-hook=screen]");

    const game = document.querySelector(".c-game");

    const snesInsertGame = document.querySelector(".js-snes-insert-game").getBoundingClientRect();
    console.log(snesInsertGame);

    const update = function () {
        point;
    };

    // Move
    const moveSnap = Draggable.create(game, {
        type: "x, y",
        bounds: screen,
        liveSnap: {
            //snaps to the closest point in the array, but only when it's within 15px (new in GSAP 1.20.0 release):
            points: [{ x: snesInsertGame.x, y: -snesInsertGame.y }],
            radius: 100,
        },
    });

    console.log(`x: ${snesInsertGame.x} y: ${snesInsertGame.y}`);

    game.style.width = `${snesInsertGame.width + 15}px`;

    // // Move event
    // game.addEventListener("mousedown", function (event) {
    //     event.stopPropagation();
    //     rotate.disable();
    //     resize.disable();
    //     changeActiveSticker(sticker);
    //     move.enable().startDrag(event);
    // });
}
