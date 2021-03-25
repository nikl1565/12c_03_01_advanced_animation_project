"use strict";

window.addEventListener("DOMContentLoaded", init);



function init() {

    console.log("Dom loaded")
    document.querySelector("#Layer_1").addEventListener("click", function(){
        location.href = 'index.html'; // because fucking a tag was being rude
    });
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

    //removes arrowanimation class to avoid conflicts with gsap
    setTimeout(function(){
        document.querySelector("#downArrow").classList.remove("arrowAnimationClass");
    },700)

    const imagesAndText = document.querySelectorAll(".historyImages image, .imageText text");

    // slides each image and corrosponding text in from each side
    imagesAndText.forEach( function(element, index) {
       
        const count = index +1;
        
        if (count % 2 == 0) { // even
            gsap.from(element, {opacity: 0, x: -30, scrollTrigger:
                {toggleActions: "play pause resume reset", start: "top 85%",end: "top 60%", trigger: element, scrub:true,
            }});
            
        }
        if (count % 2 != 0) { // odd
            gsap.from(element, {opacity: 0, x: 30, scrollTrigger:
                {toggleActions: "play pause resume reset", start: "top 85%",end: "top 60%", trigger: element, scrub:true,
            }});
        }

    })

    const lines = document.querySelectorAll(".path .lines path");

    // lines scaleX out from the middle of the timeline
    lines.forEach(function(line, index) {

        const count = index+1

        if (count % 2 != 0) { // odd
            gsap.from(line, {transformOrigin: "left", transform: "scaleX(0.01)", scrollTrigger:
                {toggleActions: "play pause resume reset", start: "top 95%",end: "top 70%", trigger: line, scrub:true,
            }});
        }
    
        if (count % 2 == 0) { // even
            gsap.from(line, {transformOrigin: "right", transform: "scaleX(0.01)", scrollTrigger:
                {toggleActions: "play pause resume reset", start: "top 95%",end: "top 70%", trigger: line, scrub:true,
            }});
        }

        
    })

    const dates = document.querySelectorAll(".dates text");

    //dates scale and unfade from the timeline center
    dates.forEach(function(date, index) {

        const count = index+1

        if (count % 2 != 0) { // odd
            gsap.from(date, {x: -1, opacity: "0", transformOrigin: "left", transform: "scale(0.01,0.01)", scrollTrigger:
                {toggleActions: "play pause resume reset", start: "top 95%",end: "top 70%", trigger: date, scrub:true,
            }});
        }
    
        if (count % 2 == 0) { // even
            gsap.from(date, {x: 1, opacity: "0", transformOrigin: "right", transform: "scale(0.01,0.01)", scrollTrigger:
                {toggleActions: "play pause resume reset", start: "top 95%",end: "top 70%", trigger: date, scrub:true,
            }});
        }

        
    })

    const letterGroups = document.querySelectorAll("#textSVGBox g g");

    const trigger = document.querySelector("#timelineHistory");

    //animates each of the several hundred "pixel" svg elements to fall from above.
    letterGroups.forEach(function(letter){

        const textPixelPath = letter.querySelectorAll("rect");

        textPixelPath.forEach( function(pixel, index){
                gsap.to(pixel, {duration: 0.7, y: 30, opacity: 1, immediateRender: false, delay: index*0.0233, ease: "none", scrollTrigger:
                {start: "top 40%", trigger: trigger, // use 1 : 0.033 ratio
            }});
        });
    });

    //colors footer red
    gsap.from("footer", {backgroundColor: "#1e1c1d", scrollTrigger:
        {toggleActions: "play pause resume reset", start: "top 100%",end: "top 70%", trigger: "footer", scrub:true,
    }});

    //moves and unfades text
    gsap.from("footer h2", {opacity: 0, x: -50, y: 20, scrollTrigger:
        {toggleActions: "play pause resume reset", start: "top 90%",end: "top 70%", trigger: "footer", scrub:true,
    }});

    //moves and unfades text
    gsap.from("footer p", {opacity: 0, x: 50, y: 20, scrollTrigger:
        {toggleActions: "play pause resume reset", start: "top 90%",end: "top 70%", trigger: "footer", scrub:true,
    }});

    //moves and unfades text
    gsap.from("footer h4", {opacity: 0, x: -50, y: 20, scrollTrigger:
        {toggleActions: "play pause resume reset", start: "top 90%",end: "top 70%", trigger: "footer", scrub:true,
    }});

    //moves and unfades text
    gsap.from("footer li", {opacity: 0, x: 50, y: 20, scrollTrigger:
        {toggleActions: "play pause resume reset", start: "top 90%",end: "top 70%", trigger: "footer", scrub:true,
    }});

    //fades arrow after reaching 10% into next section
    const downTrigger = document.querySelector("#timelineHistory");
    gsap.to("#downArrow", {opacity: 0, scrollTrigger:// arrow in section 1
        {toggleActions: "play pause resume reset", start: "top 90%",end: "top 60%", trigger: downTrigger, scrub:true,
    }});

    //fade of .aboutTop fading from red to dark grey
    gsap.to(".aboutTop", {backgroundColor:"#1e1c1d", scrollTrigger:{
        toggleActions: "play pause resume reset", start: "top 0%", end: "bottom 0%", trigger: ".aboutTop", scrub: true,
    }});

}

