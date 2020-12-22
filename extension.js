// extension.js (hide-app-menu project) - Hides application menu on panel
//
// Copyright 2020 Walter Davidson (hideappmenu@waltershobby.net)
// SPDX-License-Identifier: Apache-2.0
// SPDX-URL: http://www.apache.org/licenses/LICENSE-2.0
//
'use strict';

const Main     = imports.ui.main;
const ExtUtils = imports.misc.extensionUtils;

let entry;
let appmenu;
let signal;

function report(facility, condition) {
    if (entry == '') {
        try {
            let script = ExtUtils.getCurrentExtension();

            entry = 'extension ' + script.metadata.uuid +
                    ' (v' + script.metadata.version + ')';
        } catch(err) {
            entry = 'extension hide-app-menu (v?)';
            log(entry + ' report failed: ' + err.message);
        }
    }
    log(entry + ' ' + facility + ' failed: ' + condition);
}

function init() {
    entry = '';
    try {
        appmenu = Main.panel.statusArea.appMenu;
    } catch(err) {
        report('init', err.message);
    }
}

function enable() {
    try {
        signal = appmenu.connect("show", function () { appmenu.hide(); });
        appmenu.hide();
    } catch(err) {
        report('enable', err.message);
    }
}

function disable() {
    try {
        appmenu.disconnect(signal);
        appmenu.show();
    } catch(err) {
        report('disable', err.message);
    }
}
