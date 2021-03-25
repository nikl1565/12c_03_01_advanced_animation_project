"use strict";

window.addEventListener("DOMContentLoaded", init);

const game_screen_two = document.getElementById("game_screen_two");
const game_content_two = game_screen_two.getContext("2d");

const game_screen = document.getElementById("game_screen");
const game_content = game_screen.getContext("2d");
let n = 1;

function init() {
  //SETS STATE TO CURSED
  localStorage.setItem("cursed", "true");
  const button = document.querySelector("#nextbtn");
  let input = document.querySelector(`.text${n}`).textContent;
  let container = document.querySelector(`.text${n}`);
  document.querySelector(`.text${n}`).textContent = "";
  button.addEventListener("click", clickDisplayText);

  function clickDisplayText() {
    if (n === 4) {
      button.removeEventListener("click", clickDisplayText);
      document.querySelector(".modal").classList.add("disappear");
      document.querySelector("#game_screen").classList.remove("hide");
      document.querySelector("#game_screen").classList.add("reappear");
      setTimeout(() => {
        document.querySelector("#game_screen").classList.remove("hide");
        document.querySelector(".modal").classList.add("hide");
        startGame();
      }, 1000);
    } else {
      document.querySelector(`.text${n - 1}`).classList.add("hide");
      input = document.querySelector(`.text${n}`).textContent;
      container = document.querySelector(`.text${n}`);
      document.querySelector(`.text${n}`).textContent = "";
      document.querySelector(`.text${n}`).classList.remove("hide");
      displayText(input, container);
    }
  }

  displayText(input, container);

  function displayText(input, container) {
    let inputArray;
    inputArray = input.split("");
    console.log(inputArray);

    for (let i = 0; i < inputArray.length; i++) {
      const element = inputArray[i];
      const documentLetterElement = document.createElement("span");
      if (element === " ") {
        documentLetterElement.innerHTML = "&nbsp;";
        documentLetterElement.classList.add("cooltext", "letter");
        documentLetterElement.style.setProperty("--delay", i);
        container.append(documentLetterElement);
      } else {
        documentLetterElement.textContent = element;
        documentLetterElement.classList.add("cooltext", "letter");
        documentLetterElement.style.setProperty("--delay", i);
        container.append(documentLetterElement);
      }
    }

    if (n === 3) {
      const song = new Audio("assets/sound/game_song.mp3");
      playSong(song);
    }

    n++;
  }
}

function startGame() {
  initializeGame();
  setInterval(update, 10);
}

//player
let player = new Image();
let playerWidth = 56;
let playerHeight = 100;
let x = game_screen.width / 2 - playerWidth / 2;
let y = 15;
let dx = 2;
let dy = -2;

let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;

//prison_bar

let laserWidth = game_screen.width;
let laserHeight = 10;
let laserX = 0;
let laserY = 250;

let doorWidth = 60;
let doorHeight = 120;
let doorX = game_screen.width / 2 - 30;
let doorY = 400;

let hitPoints = 3;
let hitPointsCheck = 2;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function initializeGame() {
  if (hitPoints === 0) {
    document.querySelector(".game_over").classList.add("hide");
    document.querySelector("#game_screen").classList.remove("hide");
  }

  player = new Image();
  playerWidth = 56;
  playerHeight = 100;
  x = game_screen.width / 2 - playerWidth / 2;
  y = 15;
  dx = 2;
  dy = -2;

  //prison_bar

  laserWidth = game_screen.width;
  laserHeight = 10;
  laserX = 0;
  laserY = 250;

  hitPoints = 3;
  hitPointsCheck = 2;
  const storedCustomerIndex = sessionStorage.getItem("chosencustomer");
  player.src = `assets/customer_${storedCustomerIndex}.png`;
  if (storedCustomerIndex === "fourth") {
    runAnimation();
    function runAnimation() {
      setTimeout(setframe2, 250);
      setTimeout(setframe3, 450);
      setTimeout(setframe4, 550);
      setTimeout(setframe3, 1500);
      setTimeout(setframe2, 1750);
      setTimeout(setframe1, 2000);
      setTimeout(runAnimation, 3000);
    }

    function setframe2() {
      player.src = "assets/frame2.png";
    }
    function setframe3() {
      player.src = "assets/frame3.png";
    }
    function setframe4() {
      player.src = "assets/frame4.png";
    }
    function setframe1() {
      player.src = "assets/customer_fourth.png";
    }
  }
}

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  }
}

function drawPlayer() {
  game_content.drawImage(player, x, y, 56, 100);
  game_content.fillStyle = "red";
  game_content.fill();
}

function drawLaser() {
  game_content.beginPath();
  game_content.rect(laserX, laserY, laserWidth, laserHeight);
  game_content.fill();
}

function drawDoor() {
  game_content.beginPath();
  game_content.rect(doorX, doorY, doorWidth, doorHeight);
  game_content.fillStyle = "blue";
  game_content.fill();
}

function drawButtons() {
  game_content.beginPath();
  game_content.rect(20, 20, 20, 20);
  game_content.fillStyle = "green";
  game_content.fill();
}

function drawText() {
  game_content.beginPath();
  game_content.font = "12px Impact";
  game_content.fillStyle = "red";
  game_content.fillText("Ouch LASERS!", x + playerWidth, y + 15);
}

function gameLoop() {
  if (hitPoints === 0) {
    document.querySelector("#retry").addEventListener("click", initializeGame);
    document.querySelector(".game_over").classList.remove("hide");
    document.querySelector(".game_over").classList.add("reappear");
    document.querySelector("#game_screen").classList.add("hide");
  } else {
    if (laserY + 10 < y + playerHeight) {
      y = laserY - playerHeight - 20;
      hitPoints--;
      setTimeout(() => {
        hitPointsCheck--;
      }, 2000);
      console.log(hitPoints);
      console.log(hitPointsCheck);
    }
    if (x > 125 && x < 200 && y > game_screen.height - doorHeight - 100) {
      y = 0;
      x = 0;
      laserY = 400;
      document.querySelector(".game_won").addEventListener("click", configReturn);
      document.querySelector(".game_won").classList.remove("hide");
      document.querySelector(".game_won").classList.add("reappear");
      document.querySelector("#game_screen").classList.add("hide");
    }
    if (hitPoints === hitPointsCheck) {
      y = laserY - playerHeight - 10;
      drawText();
    }
    if (x < 20 && y < 20) {
      laserY += 1;
    }

    if (x > 20 || y > 20) {
      laserY -= 0.5;
    }
  }
}

function update() {
  game_content.clearRect(0, 0, game_screen.width, game_screen.height);
  drawPlayer();
  drawLaser();
  drawButtons();
  drawDoor();

  if (upPressed) {
    y += dy;
    if (y < 0) {
      y = 0;
    }
  }

  if (downPressed) {
    y -= dy;
    if (y > game_screen.height - playerHeight) {
      y = game_screen.height - playerHeight;
    }
  }

  if (leftPressed) {
    x -= dx;
    if (x < 0) {
      x = 0;
    }
  }
  if (rightPressed) {
    x += dx;
    if (x > game_screen.width - playerWidth) {
      x = game_screen.width - playerWidth;
    }
  }

  gameLoop();
}

/* function drawPlayerTwo() {
  game_content_two.drawImage(player, x, y, 56, 100);
  game_content_two.fillStyle = "red";
  game_content_two.fill();
}

function drawLaserTwo() {
  game_content_two.beginPath();
  game_content_two.rect(laserX, laserY, laserWidth, laserHeight);
  game_content_two.fill();
}

function drawDoorTwo() {
  game_content_two.beginPath();
  game_content_two.rect(doorX, doorY, doorWidth, doorHeight);
  game_content_two.fillStyle = "blue";
  game_content_two.fill();
}

function drawButtonsTwo() {
  game_content_two.beginPath();
  game_content_two.rect(20, 20, 20, 20);
  game_content_two.fillStyle = "green";
  game_content_two.fill();
}

function drawTextTwo() {
  game_content_two.beginPath();
  game_content_two.font = "12px Impact";
  game_content_two.fillStyle = "red";
  game_content_two.fillText("Ouch LASERS!", x + playerWidth, y + 15);
}

function gameLoopTwo() {
  if (hitPoints === 0) {
    document.querySelector("#retry").addEventListener("click", initializeGame);
    document.querySelector(".game_over").classList.remove("hide");
    document.querySelector(".game_over").classList.add("reappear");
    document.querySelector("#game_screen").classList.add("hide");
  } else {
    if (laserY + 10 < y + playerHeight) {
      y = laserY - playerHeight - 20;
      hitPoints--;
      setTimeout(() => {
        hitPointsCheck--;
      }, 2000);
      console.log(hitPoints);
      console.log(hitPointsCheck);
    }
    if (x > 125 && x < 200 && y > game_screen_two.height - doorHeight - 100) {
      y = 0;
      x = 0;
      laserY = 400;
      document.querySelector(".game_won").addEventListener("click", configReturn);
      document.querySelector(".game_won").classList.remove("hide");
      document.querySelector(".game_won").classList.add("reappear");
      document.querySelector("#game_screen").classList.add("hide");
    }
    if (hitPoints === hitPointsCheck) {
      y = laserY - playerHeight - 10;
      drawTextTwo();
    }
    if (x < 20 && y < 20) {
      laserY += 1;
    }

    if (x > 20 || y > 20) {
      laserY -= 0.5;
    }
  }
}

function updateTwo() {
  game_content_two.clearRect(0, 0, game_screen_two.width, game_screen_two.height);
  drawPlayerTwo();
  drawLaserTwo();
  drawButtonsTwo();
  drawDoorTwo();

  if (upPressed) {
    y += dy;
    if (y < 0) {
      y = 0;
    }
  }

  if (downPressed) {
    y -= dy;
    if (y > game_screen_two.height - playerHeight) {
      y = game_screen_two.height - playerHeight;
    }
  }

  if (leftPressed) {
    x -= dx;
    if (x < 0) {
      x = 0;
    }
  }
  if (rightPressed) {
    x += dx;
    if (x > game_screen_two.width - playerWidth) {
      x = game_screen_two.width - playerWidth;
    }
  }

  gameLoopTwo();
} */

function playSong(song) {
  song.volume = 0.75;

  song.play();
  song.loop = true;
}

function configReturn() {
  /* 
  game_screen.classList.add("hide");
  game_screen_two.classList.remove("hide");
  document.querySelector(".game_won").classList.add("hide");
  setInterval(updateTwo, 10); */
  localStorage.setItem("cursed", "false");
  setTimeout(() => {
    window.location.href = "configurator.html";
  }, 2000);
}
