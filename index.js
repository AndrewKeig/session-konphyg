/*!
 * session-konphyg
 * Copyright(c) 2012 Andrew Keig <andrew.keig@gmail.com>
 * MIT Licensed
 */

/* dependencies */

var path = require('path');
var lib = require(path.join(__dirname, './lib'));

/* library version */
exports.version = '0.0.1';

/* api */
exports.options = function (basepath) {
    return lib.options(basepath);
}

exports.store = function () {
    return lib.store();
}

exports.createSession = function (basepath){
    return lib.create_session(basepath);
};