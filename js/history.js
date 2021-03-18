"use strict";

window.addEventListener("DOMContentLoaded", init);



function init() {
    console.log("Dom loaded")
    
    pageLoadAnimations();
    loadGSAP();

    
}

function pageLoadAnimations() {
    console.log("pageLoadAnimations");

    const text = document.querySelector(".aboutTop h1").innerHTML;

    const textArray = text.split("");

    const templatePointer = document.querySelector("template");
    
    const sectionPointer = document.querySelector("#textDisplay");

    

    textArray.forEach(letter => {

        const klon = templatePointer.cloneNode(true).content;
        klon.querySelector(".character").textContent = letter;

        if (textArray.indexOf(letter) == 1 || textArray.indexOf(letter) == 2) {
            //animate
            klon.querySelector(".character").classList.add("characterAnimation");
        }

        else {
            klon.querySelector(".character").classList.add("secondarycharacterAnimation");
        }
        sectionPointer.appendChild(klon);
    });
}

function loadGSAP() {
    console.log("loadGSAP");
    gsap.registerPlugin(ScrollTrigger);
    
    setTimeout(function(){
        
        gsap.to("#downArrow", {opacity: 0, scrollTrigger:
            {toggleActions: "play pause resume reset", start: "top 90%",end: "top 50%", trigger:"#timelineHistory", scrub:true,
        }});
    },701)

    gsap.to(".timelineTop h2", {opacity: 1, scrollTrigger:
        {toggleActions: "play pause resume reset", start: "top 90%",end: "top 60%", trigger:".timelineTop h2", scrub:true,
    }});

    const imagesAndText = document.querySelectorAll(".historyImages image, .imageText text");
    
    imagesAndText.forEach(element => {
        gsap.to(element, {opacity: 1, scrollTrigger:
            {toggleActions: "play pause resume reset", start: "top 95%",end: "top 70%", trigger: element, scrub:true,
        }});
    })
}
