const express = require('express');
const path = require('path');
const api = require('./todo-api');
const app = express();

app.use(express.json());

const router = express.Router();

router.get('/api/items', api.list);
router.get('/api/items/:id', api.read);
router.post('/api/items', api.save);
router.use((req, res, next) => express.static(path.join(__dirname, './public'))(req,res,next));
router.use('/*', (req, res, next) => express.static(path.join(__dirname, './public', 'index.html'))(req,res,next))
app.use(router);

var port = process.env.PORT || 8080;

app.listen(port, function (err) {
    if (err)
        console.error(err);
    else
        console.log('App is ready at : ' + port);
});