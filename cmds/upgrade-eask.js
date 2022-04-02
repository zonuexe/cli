/**
 * Copyright (C) 2022 Jen-Chieh Shen
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with GNU Emacs; see the file COPYING.  If not, write to the
 * Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA 02110-1301, USA.
 */

"use strict";

const child_process = require("child_process");
const util = require("../src/util");

exports.command = ['upgrade-eask'];
exports.desc = 'upgrade Eask itself';

exports.handler = async (argv) => {
  process.chdir(util.plugin_dir());
  let proc = child_process.spawn('git', ['pull'], { stdio: 'inherit' });

  proc.on('close', function (code) {
    if (code == 0) {
      process.stdout.write('✓ Done upgrading Eask to the latest version');
      return;
    }
    console.log('✗ Failed to upgrade Eask');
    console.log('');
    console.log('You probably have installed Eask with npm, try');
    console.log('');
    process.stdout.write('  $ npm install -g emacs-eask/eask@latest');
  });
};
