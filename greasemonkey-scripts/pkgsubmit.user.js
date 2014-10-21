// ==UserScript==
// @name         pkgsubmit-mageia
// @version      0.0.1
// @description  Adds a changed packages list to pkgsubmit.js
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      http://pkgsubmit.mageia.org/*
// ==/UserScript==
// ===============================================================

/**
 * Mageia build-system quick status report script.
 * Javascript utilities.
 *
 * @copyright Copyright (C) 2012 Mageia.Org
 *
 * @author Romain d'Alverny
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU GPL v2
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License aspublished by the
 * Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
*/

/**
*/
var events_log = {

    events: {},

    count: function (type, count) {
        if (type in this.events) {
            this.events[type] += count;
        } else {
            this.events[type] = 1;
        }
    },

    reset: function () {
        this.events = {};
    },

    report: function () {
        s = [];
        for (i in this.events) {
            s.push('<span class="hl hl-' + i + '">' + this.events[i] + ' ' + i + '</span>');
        }
        return s.join(", ");
    }
};

/**
 * Is the file in path expected to be in text/plain or not?
 * We just know what .log, .done and .youri files are.
 *
 * @param string path
 *
 * @return boolean
*/
function isLogFile(path) {

    var ext = path.split(".").pop();
    if (["log", "done", "youri"].indexOf(ext) < 0) {
        return true;
    }

    return false;
}

/**
 * Is the file in path expected to be a short one (1, 2 lines at most)
 * or not?
 *
 * We just know that status.log and whatever.done files are one-liners.
 *
 * @param string path
 *
 * @return boolean
*/
function isShortFile(path) {

    var ext  = path.split(".").pop();
    var file = path.split("/").pop();

    if (["done"].indexOf(ext) >= 0
        || ["status.log"].indexOf(file) >= 0) {
        return true;
    }

    return false;
}

/**
 * Inject <span /> elements with appropriate classes into given text
 * to allow for highlighting specific portions of a text file.
 *
 * Here, log files with ok|success|test|warning|info|error|fail|etc.
 *
 * @param string text
 *
 * @return string
*/
function highlight_text(text) {
    return text.replace(/.*(ok|succe|test|warn|info|deprecat|error|fail|non\-standard|abort|missing\_deps).*/gi, function (match, p1, p2, offset, string) {
        var cl = 'none';
        switch (p1.toLowerCase()) {
        case 'succe':
        case 'ok':
            cl = 'ok';
            break

        case 'test':
        case 'info':
            cl = 'info';
            break;

        case 'warn':
        case 'deprecat':
        case 'non-standard':
            cl = 'warn';
            break;

        case 'error':
        case 'fail':
        case 'abort':
        case 'missing_deps':
            cl = 'error';
            break;
        }

        events_log.count(cl, 1);

        return '<span class="hl hl-' + cl + '">' + match + '</span>';
    });
}


/**
 * Load files list returned for current build (see href),
 * build it under the build status line and show it.
*/
function build_log_files_list(ev) {
    if (!ev.metaKey) {
        ev.preventDefault();

        var key  = $(this).attr("href");
        var elId = 'e' + key.replace(/\/|\./g, '-');
        var el   = $("#" + elId);

        if (el.length == 0) {
            $(this).parent().parent().after($("<tr />",
                {
                    class: "build-files-list",
                    id: elId,
                    html: '<td colspan="4">loading</td>'
                }
            ));
            $.get(
                "/log_files.php",
                {"k": $(this).attr("href")},
                function (data) {
                    $("#" + elId).html('<td colspan="4">' + data + '</td>');
                }
            );
        } else {
            el.toggle();
        }
    }
}

/**
 * See http://jsperf.com/encode-html-entities
*/
function safe_tags_regex(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function prepare_pkg_list (data) {
    var reg = /\nWrote:[^\n]+\.rpm\n/.exec(data);

    return safe_tags_regex(reg.map(function (s) {
        s.replace(/^\n?Wrote:\s*/, '').replace(/\.rpm\n?$/, '')
            }).join("\n"));
}

/**
 * If href is a log file, load it and display it in a decorated box
 * plus controls to close/navigate it.
*/
function show_log_file(ev) {

    if (isLogFile($(this).attr("href"))) {
        return true;
    }

    if (!ev.metaKey) {
        ev.preventDefault();

        var elId = 'view-' + $(this).attr("href").replace(/\/|\./g, '-');
        var cId  = elId + '-container';
        var c    = $("#" + cId);
        var el   = $("#" + elId);

        if (c.length == 0) {
            $(this).next().after($("<div />", {
                    id: cId
                })
                .addClass(isShortFile($(this).attr("href")) ? "short" : "")
                .append($("<div />", {
                    id: elId,
                    class: "file-view",
                    html: "loading..."
                }))
            );

            $.get(
                "/" + $(this).attr("href"),
                {},
                function (data) {
                    events_log.reset();
                    $("#" + elId).html(highlight_text(safe_tags_regex(data)))
                    .before(
                        $("<div />", {
                            class: "controls"
                        })
                        .append($("<button />", {
                                class: "gototop",
                                html: "top"
                            }).on("click", function (ev) {
                                $("#" + elId).animate({ scrollTop: 0 }, 200);
                            })
                        )
                        .append($("<button />", {
                                class: "gotobo",
                                html: "bottom"
                            }).on("click", function (ev) {
                                var d = $("#" + elId);
                                d.animate({ scrollTop: d.prop("scrollHeight") }, 200);
                            })
                        )
                        .append($("<button />", {
                                class: "close",
                                html: "close"
                            }).on("click", function (ev) {
                                $("#" + cId).toggle();
                            })
                        )
                        .append($("<p />", {
                                class: "stats",
                                html: events_log.report()
                            })
                        )
                        .append($("<pre />", {
                                class: "advisory_changed_packages",
                                html: (prepare_pkg_list(data)),
                        }
                        )
                    )
                    .animate({ scrollTop: $("#" + elId).prop("scrollHeight") }, 1000);
                }
            );
        } else {
            c.toggle();
        }
    }
}

$(function () {
    $('.status-link').on("click", build_log_files_list);

    $("table#submitted-packages tbody").on("click", "tr td li a.view-inline", show_log_file);
});

