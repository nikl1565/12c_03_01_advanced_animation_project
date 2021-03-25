import { colors } from "/js/configurator/components/colors.js";
import { stickers } from "/js/configurator/components/stickers.js";
import { games } from "/js/configurator/components/games.js";
import { sounds } from "/js/configurator/components/sounds.js";

export function sidebar() {
    colors();
    stickers();
    games();
    sounds();

    console.log("Sidebar layout is loaded...");
}
