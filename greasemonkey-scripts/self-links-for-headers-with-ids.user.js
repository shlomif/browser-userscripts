// ==UserScript==
// @name         self-links-for-headers-with-ids
// @version      0.0.4
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
    const myclass = "self_link";
    const myelemclass = "self_link_a_id";
    function myappend(obj, myid) {
        const id_with_hash = "#" + myid;
        obj.append(
            ' <a class="' + myelemclass + '" href="' + id_with_hash + '">[ ' + id_with_hash + ' ]</a>',
        );
        return;
    }
    if (!$("body").hasClass(myclass)) {
        for (let i = 6; i >= 1; --i) {
            const h = "h" + i.toString();
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
                const that = this;
                if (that.id) {
                    return;
                }
                myappend($(that), $(that).parent().attr("id"));
            });
        }
        $("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]").each(function (i) {
            const that = this;
            myappend($(that), that.id);
        });
        $("a." + myelemclass).css("word-break", "break-all");
        $("body").addClass(myclass);
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    add_self_links();
}
