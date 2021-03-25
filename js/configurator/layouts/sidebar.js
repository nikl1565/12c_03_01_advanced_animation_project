import { colors } from "../components/colors.js";
import { stickers } from "../components/stickers.js";
import { games } from "../components/games.js";
import { sounds } from "../components/sounds.js";

export function sidebar() {
    colors();
    stickers();
    games();
    sounds();

    console.log("Sidebar layout is loaded...");
}
