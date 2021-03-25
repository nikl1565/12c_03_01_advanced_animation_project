export function sounds() {
    console.log("Sounds component is loaded...")
    
    const mySound = document.querySelector("audio");

    mySound.muted = true;
    mySound.play();
    const buttonSelector = document.querySelector(".c-remote__button-group img:last-child");
    
    buttonSelector.addEventListener("click", function(){
        playSound(mySound, buttonSelector);
    });

}

function playSound(mySound, button) {
    
    if (mySound.muted == false) {
        console.log("muted");
        mySound.muted = true;
        button.src = "images/icons/unmute.svg";
    }
    
    else {
        console.log("unmuted");
        mySound.muted = false;
        button.src = "images/icons/mute.svg";
    }

}