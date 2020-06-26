var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('subletimDB', ['user']); //local mongo installation, DB is subletimDB
// Get All Users
router.get('/users', function (req, res, next) {
    db.user.find(function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});
// Get Single User
router.get('/user/:id', function (req, res, next) {
    db.user.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});
//Save User
router.post('/user', function (req, res, next) {
    var user = req.body;
    db.user.save(user, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});
// Delete User
router.delete('/user/:id', function (req, res, next) {
    db.user.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});
// Update User
router.put('/user/:id', function (req, res, next) {
    if (!req.body) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.user.update({_id: mongojs.ObjectId(req.params.id)}, req.body, {}, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
});
module.exports = router;
