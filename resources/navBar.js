var baseUrl = "dfsek.github.io";
if (window.location.port === "" || !window.location.port) {
    baseUrl = window.location.protocol + "//" + window.location.hostname;
} else {
    baseUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
}
console.log("base URL: " + baseUrl);
var navBarHTML = `<div id="mySidenav" class="sidenav">
<a href="#" class="closebtn" onclick="closeNav()">&times;</a>
<a href="${baseUrl}">Home</a>
<a href="${baseUrl}/game">Games</a>
<a href="${baseUrl}/game/wumpus"><div class="navBarPadding">Hunt the Wumpus<sup>3</sup></div></a>
<a href="${baseUrl}/blog">Blog</a>
<a href="${baseUrl}/blog/rivers"><div class="navBarPadding">Procedurally Generated Rivers</div></a>
</div>`;


$(document).ready(function () {
    "use strict";
    document.getElementById("navBarContainer").innerHTML = navBarHTML;
    console.log("navbar is loaded.");
    document.getElementById("main").style.marginLeft = "60px";
    document.getElementById("nav").style.width = "60px";
});

function openNav() {
    "use strict";
    document.getElementById("mySidenav").style.width = "360px";
    document.getElementById("main").style.marginLeft = "360px";
    var main = document.getElementById("main1");
    if (main) {
        document.getElementById("main1").style.marginLeft = "60px";
    }
    main = document.getElementById("main2");
    if (main) {
        document.getElementById("main2").style.marginLeft = "60px";
    }
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    "use strict";
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.marginLeft = "60px";
    document.getElementById("nav").style.width = "60px";
    var main = document.getElementById("main1");
    if (main) {
        document.getElementById("main1").style.marginLeft = "60px";
    }
    main = document.getElementById("main2");
    if (main) {
        document.getElementById("main2").style.marginLeft = "60px";
    }
}
