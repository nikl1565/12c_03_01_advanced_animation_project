const settings = {
    templates: {
        game: document.querySelector(".t-game").content,
        gameOption: document.querySelector(".t-game-option").content,
    },
    games: ["super-mario-world", "mega-man-7", "maximum-carnage", "killer-instinct", "dracula-x"],
    gameId: 1,
};

export function games() {
    console.log("Games component is loaded...");

    settings.games.forEach((game) => {
        makeGameOption(game, settings.templates.gameOption);
    });

    makeEditable();
}

function makeGameOption(game, template) {
    const clone = template.cloneNode(true);
    const gameOptionList = document.querySelector("[data-option=games]");

    clone.querySelector(".c-option");

    // Add image
    clone.querySelector(".c-option__image").src = `images/cartridges/${game}.png`;
    // Add sticker to page on click

    // clone.querySelector(".c-option--game").addEventListener("mousedown", addGame);

    // Show sticker option
    gameOptionList.append(clone);
}

function makeEditable(game) {
    const games = document.querySelectorAll(`[data-option=games] .c-option__image`);

    const screen = document.querySelector("[data-js-hook=screen]");
    const snesInsertGame = document.querySelector(".js-snes-insert-game").getBoundingClientRect();

    games.forEach((game) => {
        console.log(game);

        const gamePosition = game.getBoundingClientRect();

        let updatedGamePosition = game.getBoundingClientRect();

        // Move
        const moveSnap = Draggable.create(game, {
            type: "x, y",
            liveSnap: {
                points: function (event) {
                    console.log(snesInsertGame.y - gamePosition.y - snesInsertGame.height);
                    return {
                        x: snesInsertGame.x - gamePosition.x, //
                        y: snesInsertGame.y - gamePosition.y - snesInsertGame.height,
                    };
                },
                radius: 100,
            },
            onDrag: function (event) {
                this.target.style.width = `${snesInsertGame.width}px`;

                updatedGamePosition = game.getBoundingClientRect();

                console.log("--------------------------");
                console.log("insert: ", snesInsertGame);
                console.log("gameInit: ", gamePosition);
                console.log("gameUpdated: ", updatedGamePosition);

                if (updatedGamePosition.y == snesInsertGame.y - gamePosition.y) {
                    console.log("SNAP BABY");
                }
            },
        });
    });

    console.log(`x: ${snesInsertGame.x} y: ${snesInsertGame.y}`);
}
