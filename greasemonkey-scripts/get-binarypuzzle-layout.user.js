// ==UserScript==
// @name         get-binarypuzzle-layout
// @version      0.0.1
// @description  Get the binary puzzle layout.
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      http://www.binarypuzzle.com/puzzles.php?size=*
// ==/UserScript==
// ===============================================================

//
// License is X11 License:
// http://www.opensource.org/licenses/mit-license.php

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.10.0.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    }
    else {
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}
GM_wait();

function get_layout() {
    var loc = window.location.href;
    var arr = /size=([0-9]+)/.exec(loc);
    var size = parseInt(arr[1]);

    var buffer = '';

    for (var y=1 ; y <= size ; y++) {
        buffer += '|'
        for (var x = 1 ; x <= size ; x++) {
            var text = $("p#celpar_" + y + "_" + x + "").html();
            var digit = /([01])/.exec(text);
            if (! digit) {
                buffer += ' ';
            } else {
                buffer += digit[1];
            }
        }
        buffer += "|\n";
    }

    var new_id = "shlomif_contents_text";
    $("body").append("<textarea readonly=\"readonly\" style=\"left:0;clear:both;display:block;color:black;visibility:visible;font-family:monospace;\" id='" + new_id + "' cols='" + size + "' rows='" + size + "'></textarea>");

    $("#" + new_id).val(buffer);

    return;
}

// All your GM code must be inside this function
function letsJQuery() {
    get_layout();
}
