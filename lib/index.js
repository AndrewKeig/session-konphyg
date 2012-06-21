var _stores = require('../stores')
    , _store = null
    , _day = 86400
    , _secret_code = '10101010101'
    , _session_key = 'express.sid'
    , _http_only = true
    , _path = '/';

exports.options = function (basepath) {
    var _konphyg = require('konphyg')(basepath);
    var session_konphyg = _konphyg('session');
    return session_konphyg;
}

exports.store = function () {
    return _store;
}

exports.create_session = function (basepath) {
    var _konphyg = require('konphyg')(basepath);
    var session_konphyg = _konphyg('session');
    _store = _stores.load(session_konphyg);
    var secret = session_konphyg.secret || _secret_code;
    var maxAge = session_konphyg.maxAge ? new Date(Date.now() + session_konphyg.maxAge) : _day;
    var session_key = session_konphyg.sessionkey || _session_key;
    var httpOnly = session_konphyg.httpOnly || _http_only;
    var path = session_konphyg.path || _path;

    return { store: _store,
        cookie: { path: '/',
            httpOnly: httpOnly,
            maxAge: maxAge },
        secret: secret,
        key: session_key
    };
}
