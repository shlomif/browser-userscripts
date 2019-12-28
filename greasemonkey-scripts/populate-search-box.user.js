// ==UserScript==
// @name         populate-search-box
// @version      0.0.1
// @description  NOT WORKING!!! yahoogroups search box fix
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      https://groups.yahoo.com/neo/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==
// ===============================================================

//
// License is Expat License:
// http://www.opensource.org/licenses/mit-license.php

letsJQuery();

// All your GM code must be inside this function
function letsJQuery() {
    $(function () {
        const box = $("input#UHSearchBox");
        const params = new URLSearchParams(window.location.search);
        const key = 'query';
        if (params.has(key)) {
            box.val(params.get(key));
        }
        return;
    });
}
