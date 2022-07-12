function initNavBarToggle() {
    "use strict";
    const mainNav = document.getElementById("js-menu");
    const navBarToggle = document.getElementById("js-navbar-toggle");
    if (mainNav !== null && navBarToggle !== null) {
        navBarToggle.addEventListener("click", function() {
            mainNav.classList.toggle("active");
        });
    } else {
        console.log("mainNav is " + mainNav + " and navBarToggle is " + navBarToggle);
    }
}

function initButton(id, link) {
    "use strict";
    const coursesBtn = document.getElementById(id);
    if (coursesBtn) {
        coursesBtn.addEventListener("click", function() {
           window.location.href = link; 
        });
    } else {
        console.log("Couldn't find the goto courses button.");
    }
}

window.onload = function() {
    "use strict";
    // This code block gives functionality to the navigation bar for mobile
    initNavBarToggle();
    // This code block is meant to initialize the button on the home page if it exists.
    initButton("js-courses-btn","courses.html");
}