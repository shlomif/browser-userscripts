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
    function myappend(obj, myid) {
        obj.append(
            ' <span class="selfl">[<a href="#' + myid + '">link</a>]</span>',
        );
        return;
    }
    if (!$("body").hasClass(myclass)) {
        for (var i = 6; i >= 1; --i) {
            var h = "h" + i.toString();
            function mytag(tag_name) {
                return tag_name + "[id] > " + h + ":first-child";
            }
            $(
                mytag("div") +
                    " , " +
                    mytag("section") +
                    " , " +
                    mytag("article"),
            ).each(function (idx) {
                if (this.id) {
                    return;
                }
                myappend($(this), $(this).parent().attr("id"));
            });
        }
        $("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]").each(function (i) {
            myappend($(this), this.id);
        });
        $("body").addClass(myclass);
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    add_self_links();
}
