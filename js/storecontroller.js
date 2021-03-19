"use strict";

import { enterAnim, exitAnim, bouncyAnim, rotate, rotateChosen, closeModal, rotateChosenSpawn } from "./storeanimation.js";

window.addEventListener("DOMContentLoaded", init);

function init() {
  addListeners();
}

let keyPresses = {};
let customer = "";

function addListeners() {
  document.querySelector(".enter_sign").addEventListener("click", enterStoreAnimation);
  window.addEventListener("keydown", KeyDownListener, false);
  window.addEventListener("keyup", KeyUpListener, false);

  const customers = document.querySelectorAll(".customer_selection_card");
  customers.forEach((customer) => {
    console.log(customer);
    customer.addEventListener("click", chooseCustomer);
    customer.addEventListener("mouseover", rotateImg);
    bouncyAnim(customer.querySelector(".pixel_art_selection"));
  });

  function KeyDownListener(event) {
    keyPresses[event.key] = true;
    storeAnimationController();
  }

  function KeyUpListener(event) {
    keyPresses[event.key] = false;
  }
}

function storeAnimationController(customerSprite) {
  if (customerSprite) {
    rotateChosenSpawn(customerSprite);
    bouncyAnim(customerSprite);
  }

  if (keyPresses.d) {
    enterAnim(customerSprite);
    bouncyAnim(customerSprite);
  }
}

function enterStoreAnimation() {
  enterAnim(customer);
  bouncyAnim(customer);
}

function chooseCustomer(event) {
  if (event.target.dataset.customer === "first") {
    rotateChosen(event.target.querySelector(".pixel_art_selection"));
    setTimeout(() => {
      closeModal(document.querySelector("#customer_selection_popup"));
    }, 2000);
    setTimeout(() => {
      const chosenCustomer = document.querySelector(".pixel_art_customer");
      customer = chosenCustomer;
      chosenCustomer.classList.remove("hide");
      document.querySelector(".modal").classList.add("hide");
      storeAnimationController(chosenCustomer);
    }, 3000);
  } else if (event.target.dataset.customer === "second") {
    rotateChosen(event.target.querySelector(".pixel_art_selection"));
    setTimeout(() => {
      closeModal(document.querySelector("#customer_selection_popup"));
    }, 2000);
    setTimeout(() => {
      const chosenCustomer = document.querySelector(".pixel_art_customer_second");
      customer = chosenCustomer;
      chosenCustomer.classList.remove("hide");
      document.querySelector(".modal").classList.add("hide");
      storeAnimationController(chosenCustomer);
    }, 3000);
  }
}

function rotateImg(event) {
  rotate(event.target.querySelector(".pixel_art_selection"));
}
