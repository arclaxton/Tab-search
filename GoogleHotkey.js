// ==UserScript==
// @name         General Search hotkey
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *
// @exclude      *google.com/search*
// @grant        none
// @require http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

(function() {
    document.onkeydown=function(event) {
        if(event.keyCode == 220 && event.ctrlKey) {
            $('input[type=search]').focus();
        }
    }
})();