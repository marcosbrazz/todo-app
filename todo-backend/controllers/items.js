
var db = undefined;

exports.context = function(server, path, dbModel) {
    if (!server)
        done('has to provide a restify server object');
        
    var context = "/items";
    if (path)
        context = path + context;
        
    server.get(context + '/', this.list);
    server.get(context + '/:id', this.read);
    // server.get(context + '-count', this.count);
    server.post(context + '/', this.save);
    server.delete(context + '/:id', this.destroy);
    
    db = dbModel;
};

exports.list = function(req, res, next) {
    var page_no = req.query.page || 1;
    var sortField = req.query.sortFields || "id";
    var sortDirection = req.query.sortDirections || "asc";

    db.get("/_all_docs?include_docs=true")
        .then(function(response) { 
            result = response.data;
            items = result.rows.map(function(item) {
                return {
                    "id": item.doc._id,
                    "rev": item.doc._rev,
                    "description": item.doc.description,
                    "done": item.doc.done
                }
            });
            var page = { 
                "currentPage" : page_no,
                "list" : items,
                "pageSize" : 10,
                "sortDirections" : sortDirection,
                "sortFields" : sortField,
                "totalResults" : result.total_rows
            };
            res.json(page);
            next();
        })
        .catch(function (error) {
            res.send(error);
        });
};

exports.read = function(req, res, next) {
    var key = req.params.id;
    db.get("/" + key)
        .then(function(response) { 
            item = response.data;
            if(item) {                
                res.json({
                    id: item._id,
                    description: item.description,
                    done: item.done
                });
                next();
            }
            else {
                res.send("Not Found");
            }
        })
};

exports.save = function(req, res, next) {
    if(req.query.id) {
        db.put('/' + req.query.id, {
            _id: req.query.id,
            _rev: req.query.rev,
            description: req.query.description,
            done: req.query.done
        })
        .then(function(response) {
            res.json(response.data);
            next();
        })
        .catch(function(error) {
            res.send(error);
            next();
        });
    }
    else {
        db.post('/', {
            description: req.query.description,
            done: req.query.done
        })
        .then(function(response) {
            res.json(response.data);
            next();
        })
        .catch(function(error) {
            res.send(error);
            next();
        });
    }
};


exports.destroy = function(req, res, next) {
    if (req.params.id) {
        db.get('/' + req.params.id)
        .then(function(response) {
            rev = response.data._rev;
            id = response.data._id;
            db.delete('/' + id + '?rev=' + rev)
                .then(function (response) {
                    res.json(response.data);
                    next();
                })
                .catch(function (error) {
                    res.send(error);
                    next();
                });
        })
        .catch(function(error) {
            res.send(error);
            next();
        });
    }
    else {
        res.send('Id not provided');
        next();
    }
}



// exports.count = function(req, res, next) {

//     // model.countAll(function(err, n) {
//     //     if (err) {
//     //         res.send(err);
//     //     } 
//     //     else {
//     //         var page = { 
//     //           count: n
//     //         };
//     //         res.json(page)
//     //         next();
//     //     }
//     // })
// };