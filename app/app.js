'use strict';

// =======================
// get the packages we need ============
// =======================
let express     = require('express');
//let https       = require('https');
let http       = require('http');
//var fs          = require('fs');
let app         = express();
let morgan      = require('morgan');
//var mongoose    = require('mongoose');
//var autoIncrement=require('mongoose-auto-increment');
//var privateKey = fs.readFileSync('/etc/ssl/app.webaniversario.com.br.key');
//var certificate = fs.readFileSync('/etc/ssl/app.webaniversario.com.br.crt');



let routers = require('./routers/index');

// =======================
// configuration =========
// =======================
let port = process.env.PORT || 8080; // used to create, sign, and verify tokens
//var connection = mongoose.createConnection(config().database); // connect to database
//autoIncrement.initialize(connection);
//app.set('superSecret', config().secret); // secret variable


// use morgan to log requests to the console
app.use(morgan('dev'));


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        //TODO: colocar os codigos no config.js
        res.statusCode = 204;
        return res.end();
    } else {
        // Pass to next layer of middleware
        return next();
    }

});

app.use('/ping',routers.ping);
app.use('',routers.slip);


// =======================
// start the server ======
// =======================

//app.listen(port);
http.createServer(app).listen(port);
console.log('Magic happens at http://localhost:' + port);

module.exports = app;