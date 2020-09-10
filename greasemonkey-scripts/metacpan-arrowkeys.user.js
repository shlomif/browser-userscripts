// ==UserScript==
// @name         metacpan-arrowkeys
// @version      0.0.3
// @description  enables up and down arrows for moving between entries similar to duckduckgo.
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      https://metacpan.org/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==
// ===============================================================

//
// License is the MIT / Expat License:
// * http://www.opensource.org/licenses/mit-license.php
// * https://www.gnu.org/licenses/license-list.html#Expat
// SPDX-License-Identifier: MIT

//
// This script is available here:
//
// * https://www.shlomifish.org/Files/files/code/metacpan-arrowkeys.user.js
//
// * https://github.com/shlomif/browser-userscripts
//

// used to ascertain that jQuery was added. No longer needed due to the
// @require, but kept for a future need.
letsJQuery();

// All your GM code must be inside this function
function letsJQuery() {
    let curr_sel = undefined;
    let orig_css = undefined;
    let highlight_color = 'PaleGreen';
    // Avoid setting .keydown() several times which causes several selections
    // Using the unsafeWindow trick from:
    // https://stackoverflow.com/questions/3321978/greasemonkey-global-variables
    // Thanks!
    if (unsafeWindow.metacpanArrowKeysScriptWasLoaded) {
        return;
    }
    unsafeWindow.metacpanArrowKeysScriptWasLoaded = true;
    let results = $(".module-result");
    $(document).keydown(function(e) {
        if (e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }
        const curr_el = () => results.eq(curr_sel);
        const update_selection = (cb) => {
            if (orig_css) {
                curr_el().css("background-color", orig_css);
            }
            cb();
            if (curr_sel < 0) {
                curr_sel = 0;
            } else if (curr_sel >= results.length) {
                curr_sel = results.length - 1;
            }
            const el = curr_el();
            orig_css = el.css("background-color");
            el.css("background-color", highlight_color);
            window.scrollTo( el.offset().left , el.offset().top - el.innerHeight()/2 - window.innerHeight/2 );
            href = [undefined];

            return;
        };

        let href = undefined;
        switch (e.key) {
            case "ArrowDown":
            update_selection(() => {
                curr_sel = (curr_sel === undefined) ? 0 : (curr_sel + 1);
            });
                break;
            case "ArrowUp":
            update_selection(() => {
                curr_sel = (curr_sel === undefined) ? ( results.length - 1 ): (curr_sel - 1);
            });
                break;
            case "Enter":
                if (curr_sel !== undefined) {
                    href = [1, curr_el().find("a").first().attr("href")];
                }
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
