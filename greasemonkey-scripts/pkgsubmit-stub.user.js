// ==UserScript==
// @name       Add pkgsubmit
// @description  Add pkgsubmit.user.js
// @match      http://pkgsubmit.mageia.org/*
// ==/UserScript==

(function () {
    var scriptElement = document.createElement( "script" );
    scriptElement.type = "text/javascript";
    scriptElement.src = "http://www.shlomifish.org/Files/files/code/pkgsubmit.user.js";
    document.body.appendChild( scriptElement );
})();
