"use strict";

export { enterAnim, exitAnim, bouncyAnim, rotate, rotateChosen, closeModal, rotateChosenSpawn };

const closeModalProps = { duration: 1000, easing: "ease-in-out" };
const closeModalKeys = [
  { offset: 0, transform: "scale(1,1)" },
  { offset: 0.2, transform: "scale(0.1,1)" },
  { offset: 0.5, transform: "scale(0.1,0.1)" },
  { offset: 1, transform: "scale(0,0)" },
];

const rotateAnimProps = { duration: 3000, easing: "linear" };
const rotateAnimKeys = [{ transform: "rotateY(0deg" }, { transform: "rotateY(360deg" }];

const rotateAnimKeysChosen = [
  { offset: 0, transform: "rotateY(0deg)" },
  { offset: 0.5, transform: "rotateY(1080deg)" },
  { offset: 0.55, transform: "translateY(0)" },
  { offset: 1, transform: "translateY(-100vh)" },
];

const rotateAnimChosenSpawnProps = { duration: 2000, easing: "linear", composite: "add", fill: "forwards" };
const rotateAnimChosenSpawnKeys = [
  { offset: 0, transform: "translateY(-100vh) rotateY(0deg)" },
  { offset: 0.2, transform: "translateY(-75vh) rotateY(360deg)" },
  { offset: 0.4, transform: "translateY(-50vh) rotateY(720deg)" },
  { offset: 0.6, transform: "translateY(-25vh) rotateY(1080deg)" },
  { offset: 0.8, transform: "translateY(0) rotateY(1440deg) scale(1.2,0.8)" },
  { offset: 0.9, transform: "translateY(0) rotateY(1440deg) scale(0.8,1.2)" },
  { offset: 1, transform: "translateY(0) rotateY(1440deg) scale(1,1)" },
];

const pixalArtLength = document.querySelector(".pixel_art_background").getBoundingClientRect().width;
const pixalArtHeight = document.querySelector(".pixel_art_background").getBoundingClientRect().height;
console.log(pixalArtLength * 0.2);
console.log(pixalArtHeight);

const openDoorAnimProps = { duration: 5000, easing: "ease-in-out" };
const openDoorAnimKeys = [
  { offset: 0, transform: "translate(0,0)" },
  { offset: 0.15, transform: "translate(4.5vw,1.5vw)" },
  { offset: 0.85, transform: "translate(4.5vw,1.5vw)" },
  { offset: 1, transform: "translate(0,0)" },
];

function rotate(customer) {
  customer.animate(rotateAnimKeys, rotateAnimProps);
}

function rotateChosen(customer) {
  customer.animate(rotateAnimKeysChosen, rotateAnimProps);
}

function enterAnim(customer) {
  const pixalArtLength = document.querySelector(".pixel_art_background").getBoundingClientRect().width;
  const pixalArtHeight = document.querySelector(".pixel_art_background").getBoundingClientRect().height;
  console.log(pixalArtLength * 0.2);
  console.log(pixalArtHeight);

  const enterAnimProps = { duration: 3800, easing: "linear", fill: "forwards" };
  const enterAnimKeys = [
    { offset: 0, transform: `translate(0vw,0vw)` },
    { offset: 0.4, transform: `translate(${pixalArtLength * 0.11}px,${pixalArtHeight * 0.05}px)` },
    { offset: 0.75, transform: `translate(${pixalArtLength * 0.21}px,0px)` },
    { offset: 1, transform: `translate(${pixalArtLength * 0.3}px,0px)` },
  ];

  customer.animate(enterAnimKeys, enterAnimProps);
  document.querySelector(".open_door").animate(openDoorAnimKeys, openDoorAnimProps);
  setTimeout(() => {
    redirect("configurator.html");
  }, 6000);
}

function exitAnim(customer) {
  const exitAnimProps = { duration: 3800, easing: "linear", fill: "forwards" };
  const exitAnimKeys = [
    { offset: 0, transform: `translate(${pixalArtLength * 0.3}px,0px) rotateY(180deg)` },
    { offset: 0.25, transform: `translate(${pixalArtLength * 0.21}px,0px) rotateY(180deg)` },
    { offset: 0.6, transform: `translate(${pixalArtLength * 0.11}px,${pixalArtHeight * 0.05}px) rotateY(180deg)` },
    { offset: 1, transform: `translate(0vw,0vw) rotateY(180deg)` },
  ];
  document.querySelector(".open_door").animate(openDoorAnimKeys, openDoorAnimProps);
  customer.animate(exitAnimKeys, exitAnimProps);
}

function bouncyAnim(item) {
  const bouncyAnimProps = { duration: 800, easing: "linear", iterations: Infinity, composite: "add" };
  const bouncyAnimKeys = [
    { offset: 0.0, transform: "scale(0.98,1.02)" },
    { offset: 0.5, transform: "scale(0.98,1.02)" },
    { offset: 0.55, transform: "scale(1.02,0.98)" },
    { offset: 1, transform: "scale(1.02,0.98)" },
  ];

  item.animate(bouncyAnimKeys, bouncyAnimProps);
}

function closeModal(modal) {
  modal.animate(closeModalKeys, closeModalProps);
}

function rotateChosenSpawn(customer) {
  customer.animate(rotateAnimChosenSpawnKeys, rotateAnimChosenSpawnProps);
}

function redirect(url) {
  window.location = `${url}`;
}
