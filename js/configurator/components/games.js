const settings = {
    templates: {
        game: document.querySelector(".t-game").content,
        gameOption: document.querySelector(".t-game-option").content,
    },
    games: ["super-mario-world", "mega-man-7", "maximum-carnage", "killer-instinct", "dracula-x"],
    gameId: 1,
    gameInserted: null,
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

    // Add images
    clone.querySelector("img[data-image=top]").src = `images/cartridges/${game}-top.png`;
    clone.querySelector("img[data-image=bottom]").src = `images/cartridges/${game}.png`;

    // Add ID
    clone.querySelector(".c-option__image-container").setAttribute("data-game-id", settings.gameId);

    // Count up
    settings.gameId++;

    // Show sticker option
    gameOptionList.append(clone);
}

function makeEditable() {
    const games = document.querySelectorAll(`[data-option=games] .c-option__image-container`);

    const screen = document.querySelector("[data-js-hook=screen]");
    const snesInsertGame = document.querySelector(".js-snes-insert-game").getBoundingClientRect();

    games.forEach((game) => {
        console.log(game);

        const gamePosition = game.getBoundingClientRect();
        console.log(gamePosition);

        let updatedGamePosition = game.getBoundingClientRect();

        // Move
        const moveSnap = Draggable.create(game, {
            type: "x, y",
            liveSnap: {
                points: function (event) {
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

                let test = snesInsertGame.y - gamePosition.y - snesInsertGame.height;
                test = test.toFixed(2);

                const gameYposition = game.style.transform;
                const firstComma = gameYposition.indexOf(",");
                const lastComma = gameYposition.lastIndexOf(",");
                let gameY = parseFloat(gameYposition.substring(firstComma + 2, lastComma - 2)).toFixed(2);
                console.log(gameY, "vs", test);

                // If snapped
                if (test === gameY) {
                    console.log("SNAP");
                    game.querySelector("[data-image=top]").style.top = "-10px";
                    game.querySelector("[data-image=top]").style.transform = "skewY(-2deg)";
                    game.querySelector("[data-image=bottom]").style.opacity = "0";
                    game.setAttribute("data-snapped", "true");
                } else {
                    game.querySelector("[data-image=bottom]").style.opacity = "1";
                    game.querySelector("[data-image=top]").style.top = "";
                    game.querySelector("[data-image=top]").style.transform = "";
                    game.setAttribute("data-snapped", "false");
                }
            },
            onDragEnd: function (event) {
                updatedGamePosition = game.getBoundingClientRect();

                let test = snesInsertGame.y - gamePosition.y - snesInsertGame.height;
                test = test.toFixed(2);

                const gameYposition = game.style.transform;
                const firstComma = gameYposition.indexOf(",");
                const lastComma = gameYposition.lastIndexOf(",");
                let gameY = parseFloat(gameYposition.substring(firstComma + 2, lastComma - 2)).toFixed(2);
                console.log(gameY, "vs", test);

                // Go back if not snapped
                if (gameY !== test) {
                    TweenLite.to(this.target, {
                        width: gamePosition.width,
                        height: gamePosition.height,
                        y: 0,
                        x: 0,
                    });
                } else {
                    // Check if any other game is snapped / inserted
                    if (settings.gameInserted && settings.gameInserted !== this.target) {
                        console.log("go away");
                        TweenLite.to(settings.gameInserted, {
                            width: gamePosition.width,
                            height: gamePosition.height,
                            y: 0,
                            x: 0,
                        });
                        settings.gameInserted.querySelector("[data-image=bottom]").style.opacity = "1";
                        settings.gameInserted.querySelector("[data-image=top]").style.top = "";
                        settings.gameInserted.querySelector("[data-image=top]").style.transform = "";
                        settings.gameInserted.setAttribute("data-snapped", "false");
                    }
                    settings.gameInserted = this.target;
                }
            },
        });
    });

    console.log(`x: ${snesInsertGame.x} y: ${snesInsertGame.y}`);
}
