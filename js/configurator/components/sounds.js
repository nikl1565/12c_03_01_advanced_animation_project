export function sounds() {
    console.log("Sounds component is loaded...");

    const mySound = document.querySelector("audio");
    mySound.volume = 0.2;
    mySound.muted = true;
    const buttonSelector = document.querySelector(".c-remote__button-group img:last-child");

    window.addEventListener("click", startSound);

    buttonSelector.addEventListener("click", function () {
        playSound(mySound, buttonSelector);
    });
    changeVolume(mySound);
    const buttonList = document.querySelectorAll(".c-remote__button-group img:last-child, .c-remote__button-group .volUp, .c-remote__button-group .volDown");
    buttonAnimation(buttonList);

    function startSound() {
        window.removeEventListener("click", startSound);
        mySound.play();
        playSound(mySound, buttonSelector);
    }
}

function playSound(mySound, button) {
    if (mySound.muted == false) {
        console.log("muted");
        mySound.muted = true;
        button.src = "images/icons/unmute.svg";
    } else {
        console.log("unmuted");
        mySound.muted = false;
        button.src = "images/icons/mute.svg";
    }
}

function changeVolume(mySound) {
    const volumeUp = document.querySelector(".c-remote__button-group .volUp");
    const volumeDown = document.querySelector(".c-remote__button-group .volDown");

    volumeUp.addEventListener("click", function () {
        plus(mySound);
    });
    volumeDown.addEventListener("click", function () {
        minus(mySound);
    });
}

function plus(mySound) {
    if (mySound.volume < 1) {
        mySound.volume = (mySound.volume + 0.1).toFixed(1);
    }
    console.log("volume " + mySound.volume * 100 + "%");
}

function minus(mySound) {
    if (mySound.volume > 0) {
        mySound.volume = (mySound.volume - 0.1).toFixed(1);
    }
    console.log("volume " + mySound.volume * 100 + "%");
}

function buttonAnimation(buttons) {
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            button.classList.add("buttonClickAnimation");
            setTimeout(function () {
                button.classList.remove("buttonClickAnimation");
            }, 100);
        });
    });
}
