// ==UserScript==
// @name         change-forms-action-to-https
// @version      0.0.1
// @description  hamakor mailman forms fix
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      https://hamakor.org.il/cgi-bin/mailman/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
// ===============================================================

//
// License is Expat License:
// http://www.opensource.org/licenses/mit-license.php

letsJQuery();

// All your GM code must be inside this function
function letsJQuery() {
    $("form").each(function (){
        const f = $(this);
        f.attr('action', f.attr('action').replace(/^http:/, 'https:'));
        return;
    });
}
