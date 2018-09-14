// ==UserScript==
// @name         metacpan-arrowkeys
// @version      0.0.1
// @description  enables up and down arrows for moving between entries similar to duckduckgo.
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      https://metacpan.org/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
// ===============================================================

//
// License is X11 License:
// http://www.opensource.org/licenses/mit-license.php

// Add jQuery
letsJQuery();

// All your GM code must be inside this function
function letsJQuery() {
    let curr_sel = undefined;
    $(document).keydown(function(e) {
        if (e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }

        let href = undefined;
        switch (e.key) {
            case "ArrowDown":
                alert("down pressed.");
                curr_sel = $(".module-result").first();
                curr_sel.css("border", "green solid 1pt");
                href = [undefined];
                break;
            case "ArrowUp":
                alert("up pressed.");
                href = [undefined];
                break;
            case "Enter":
                href = [1, curr_sel.find("a").first().attr("href")];
                break;
            default:
                return;
        }
        if (! href) {
            return;
        }
        if (href[0]) {
            window.location = href[1];
        }
        e.preventDefault();
    }
    );
}
