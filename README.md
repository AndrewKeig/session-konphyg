# session-konphyg

Configuring session stores for the node.js express framework; session-konphyg uses konphyg to
provide cascading configuration to support multiple environments

We currently support the following session stores:

- mongodb via connect-mongo
- redis via connect-redis
- couchdb via connect-couchdb
- memcached via connect-memcached
- in memory via connect

# Install

    $ npm install session-konphyg

# Usage

Create a JSON based session configuration file, terminated by ".json".

session.production.json - configuration using mongo

    "session_type": "mongo",
    "secret": "010100101010001010",
    "sessionkey" : "connect.sid",
    "maxAge" : 3600000,
    "db": {
        "db": "nodeplates",
        "host": "127.0.0.1",
        "port": 27017,
        "collection": "sessions",
        "clear_interval": 1000,
        "auto_reconnect": false
    }


session.json - configuration using in memory

    "session_type": "memory",
    "secret": "010100101010001010",
    "sessionkey" : "express.sid",
    "maxAge" : 3600000,
    "reapInterval" :  "6000000"


Place your configuration files inside a directory called "config".


#createSession

The below example creates the session store for express

    var express = require('express')
        , app = express.createServer()
        , session = require(__dirname + '/session-konphyg')
        , connect_session = session.createSession(path_to_config_folder);

        app.use(express.session(connect_session));


#store

The below example allows you to access the store created by createSession

    var session = require(__dirname + '/session-konphyg')
        , connect_session = session.createSession(path_to_config_folder);

    var store = session.store();

#options

The below example allows you to access the options used to create the session

    var session = require(__dirname + '/session-konphyg')
        , connect_session = session.createSession(path_to_config_folder);

    var options = session.options(path_to_config_folder)


#Environments

If you want to launch the application in production environment:

    $ NODE_ENV=production node app.js


#Extending

To extend session-konphyg and add another session store simply create a file with a single
method called get, this accepts a session_konphyg file and export it; e.g.

    exports.get = function (_session_konphyg) {
        var express = require('express');
        var NewStore = require('connect-new')(express);
        return new NewStore(_session_konphyg.db);
    }

We are simply using naming conventions for this all to work; so name the file 'new', add it
to the 'stores' folder; in your new config file, e.g.

    "session_type": "new",
    "secret": "010100101010001010",
    "sessionkey" : "connect.sid",
    "maxAge" : 3600000,
    "db": {
        "db": "nodeplates",
        "host": "192.168.0.1",
        "port": 27017,
        "collection": "sessions",
        "clear_interval": 1000,
        "auto_reconnect": false