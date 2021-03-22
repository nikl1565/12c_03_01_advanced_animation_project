"use strict";

import { enterAnim, exitAnim, bouncyAnim, rotate, rotateChosen, closeModal, rotateChosenSpawn } from "./storeanimation.js";

window.addEventListener("DOMContentLoaded", init);

function init() {
  addListeners();
}

let customer = "";
const storedCustomerIndex = sessionStorage.getItem("chosencustomer");
const enterStatus = sessionStorage.getItem("enterstatus");
console.log(enterStatus);

function addListeners() {
  document.querySelector(".enter_sign").addEventListener("click", enterStoreAnimation);

  if (enterStatus === "true") {
    document.querySelector(".modal").classList.add("hide");
    const storedCustomer = document.querySelector(`.pixel_art_customer_${storedCustomerIndex}`);
    customer = storedCustomer;
    storedCustomer.classList.remove("hide");
    exitAnim(storedCustomer);
    bouncyAnim(storedCustomer);
  } else {
    const customers = document.querySelectorAll(".customer_selection_card");
    customers.forEach((customer) => {
      console.log(customer);
      customer.addEventListener("click", chooseCustomer);
      customer.addEventListener("mouseover", rotateImg);
      bouncyAnim(customer.querySelector(".pixel_art_selection"));
    });
  }
}

function storeAnimationController(customerSprite) {
  if (customerSprite) {
    rotateChosenSpawn(customerSprite);
    bouncyAnim(customerSprite);
  }
}

function enterStoreAnimation() {
  sessionStorage.setItem("enterstatus", "true");
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
      const chosenCustomer = document.querySelector(".pixel_art_customer_first");
      sessionStorage.setItem("chosencustomer", "first");
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
      sessionStorage.setItem("chosencustomer", "second");
      customer = chosenCustomer;
      chosenCustomer.classList.remove("hide");
      document.querySelector(".modal").classList.add("hide");
      storeAnimationController(chosenCustomer);
    }, 3000);
  } else if (event.target.dataset.customer === "third") {
    rotateChosen(event.target.querySelector(".pixel_art_selection"));
    setTimeout(() => {
      closeModal(document.querySelector("#customer_selection_popup"));
    }, 2000);
    setTimeout(() => {
      const chosenCustomer = document.querySelector(".pixel_art_customer_third");
      sessionStorage.setItem("chosencustomer", "third");
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
