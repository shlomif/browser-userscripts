// ==UserScript==
// @name         mediawiki-edit-ozy-and-millie-transcripts
// @version      0.0.1
// @description  Provides auto-completions for the MediaWiki edit-box for aiding in transcripting the Ozy-and-Millie comics
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      http://localhost/sites/mw1/index.php?title=Ozy_and_Millie_Transcripts*
// ==/UserScript==
// ===============================================================

//
// License is X11 License:
// http://www.opensource.org/licenses/mit-license.php

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    }
    else {
        $ = unsafeWindow.jQuery;
        jQuery = unsafeWindow.jQuery;
        letsJQuery();
    }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery()
{

    /*
 * jQuery plugin: fieldSelection - v0.1.0 - last change: 2006-12-16
 * (c) 2006 Alex Brem <alex@0xab.cd> - http://blog.0xab.cd
 */

(function() {

    jQuery("tr.uploaded").each( function(my_tr) {

    }
    );

})();

}

