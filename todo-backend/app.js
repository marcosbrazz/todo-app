const express = require('express');
const cors = require('cors');
const server = express();

var controller = require('./controllers/items');
var serverinfo = require('./controllers/serverinfo');
var db = require('./models/db');

server.use(cors());
server.use(express.json());

controller.context(server, '/todo/api', db); 
serverinfo.context(server, '/todo/api');

var port = process.env.PORT || 8080;
server.listen(port, function (err) {
    if (err)
        console.error(err);
    else
        console.log('App is ready at : ' + port);
});
