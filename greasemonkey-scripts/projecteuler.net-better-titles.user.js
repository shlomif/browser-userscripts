// ==UserScript==
// @name         projecteuler.net-better-titles
// @version      0.0.1
// @description  problem titles for Project Euler
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      https://projecteuler.net/problem=*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
// ===============================================================

//
// License is X11 License:
// http://www.opensource.org/licenses/mit-license.php

// Add jQuery
// $ = unsafeWindow.jQuery;
letsJQuery();

function mutate_title() {
    const myt = $("title");
    const old = myt.text().toString();
    function _debug(str) {
        return;
    }
    _debug("old = " + old +"]");
    $(document).attr("title", old.replace(
        /^(Problem [0-9]+)/,
        (m, p1) => {
            const h2 = $("h2");
            _debug(h2);
            const h2text = h2.text();
            _debug(h2text);
            _debug(p1);
            return p1 + " - " + h2text;
        }
    ));
    return;
}

// All your GM code must be inside this function
function letsJQuery() {
    mutate_title();
    return;
}
