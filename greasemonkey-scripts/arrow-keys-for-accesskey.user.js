// ==UserScript==
// @name         arrow-keys-for-accesskeys
// @version      0.0.1
// @description  provide self links for headers (h1, h2, etc.) with id=""'s.
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      http://localhost/shlomif/homepage-local/*
// @include      http://localhost:2400/*
// @include      https://*.begin-site.org/*
// @include      https://*.shlomifish.org/*
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
    $(document).keydown(function(e) {
        if (e.ctrlKey || e.altKey || e.metaKey) {
            return;
        }
        const calc = (rel, key) => {
            let href = $("link[rel=\"" + rel + "\"]").attr("href");
            if (! href) {
                href = $("a[accesskey=\"" + key + "\"]").attr("href");
            }
            return href;
        };
        let href = undefined;
        switch (e.key) {
            case "ArrowLeft": // left
                href = calc('prev', 'p');
                // $("link[accesskey=\"p\"]").attr("href");
                break;
            case "ArrowRight": // right
                href = calc('next', 'n');
                // $("link[accesskey=\"n\"]").attr("href");
                break;
            default:
                return;
        }
        if (! href) {
            return;
        }
        window.location = href;
        e.preventDefault();
    }
    );
}
