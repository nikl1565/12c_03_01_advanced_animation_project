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
    if (customer === document.querySelector(`.pixel_art_customer_fourth`)) {
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
        document.querySelector(".pixel_art_customer_fourth").src = "images/indexImages/frame2.png";
      }
      function setframe3() {
        document.querySelector(".pixel_art_customer_fourth").src = "images/indexImages/frame3.png";
      }
      function setframe4() {
        document.querySelector(".pixel_art_customer_fourth").src = "images/indexImages/frame4.png";
      }
      function setframe1() {
        document.querySelector(".pixel_art_customer_fourth").src = "images/indexImages/customer_four.png";
      }
    }
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
  console.log(customerSprite);
  if (customerSprite) {
    rotateChosenSpawn(customerSprite);
    bouncyAnim(customerSprite);
  }
  if (customerSprite === document.querySelector(`.pixel_art_customer_fourth`)) {
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
      document.querySelector(".pixel_art_customer_fourth").src = "images/indexImages/frame2.png";
    }
    function setframe3() {
      document.querySelector(".pixel_art_customer_fourth").src = "images/indexImages/frame3.png";
    }
    function setframe4() {
      document.querySelector(".pixel_art_customer_fourth").src = "images/indexImages/frame4.png";
    }
    function setframe1() {
      document.querySelector(".pixel_art_customer_fourth").src = "images/indexImages/customer_four.png";
    }
  }
}

function enterStoreAnimation() {
  sessionStorage.setItem("enterstatus", "true");
  enterAnim(customer);
  bouncyAnim(customer);
}

function chooseCustomer(event) {
  const chosenCustomerIndex = event.target.dataset.customer;
  rotateChosen(event.target.querySelector(".pixel_art_selection"));
  setTimeout(() => {
    closeModal(document.querySelector("#customer_selection_popup"));
  }, 2000);
  setTimeout(() => {
    const chosenCustomer = document.querySelector(`.pixel_art_customer_${chosenCustomerIndex}`);
    sessionStorage.setItem("chosencustomer", `${chosenCustomerIndex}`);
    customer = chosenCustomer;
    chosenCustomer.classList.remove("hide");
    document.querySelector(".modal").classList.add("hide");
    storeAnimationController(chosenCustomer);
  }, 3000);
}

function rotateImg(event) {
  rotate(event.target.querySelector(".pixel_art_selection"));
}
