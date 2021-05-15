
const axios = require('axios')

const backend_host = process.env.BACKEND_HOST
  
const api = axios.create({
    baseURL: 'http://' + backend_host + '/todo/api/items'
});

exports.list = function(req, res, next) {
    api.get("/")
        .then(function(response) {
            res.json(response.data);
            next();
        })
        .catch(function(error) {
            res.send(error);
            next();
        });
}

exports.read = function(req, res, next) {
    var key = req.params.id;
    api.get("/" + key)
        .then(function(response) {
            res.json(response.data);
            next();
        })
        .catch(function(error) {
            res.send(error);
            next();
        });
}

exports.save = function(req, res, next) {
    api.post('/', req.body)
        .then(function(response) {
            res.json(response.data);
            next();
        })
        .catch(function(error) {
            res.send(error);
            next();
        });
}