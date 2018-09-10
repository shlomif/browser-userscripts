// ==UserScript==
// @name         self-links-for-headers-with-ids
// @version      0.0.2
// @description  provide self links for headers (h1, h2, etc.) with id=""'s.
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      *
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
// ===============================================================

//
// License is X11 License:
// http://www.opensource.org/licenses/mit-license.php

// Add jQuery
// $ = unsafeWindow.jQuery;
letsJQuery();

function add_self_links() {
    var myclass = "self_link";
    if (! $("body").hasClass(myclass)) {
        $("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]").each(function(i){ $(this).append( ' <span class="selfl">[<a href="#' + this.id + '">link</a>]</span>' ) })
        $("body").addClass(myclass);
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    add_self_links();
}
