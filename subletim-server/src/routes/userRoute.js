var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('subletimDB', ['usersCollection']); //local mongo installation, DB is subletimDB
// Get All Users
router.get('/users', function (req, res, next) {
    db.usersCollection.find(function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});
// Get Single User
router.get('/user/:id', function (req, res, next) {
    db.usersCollection.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});
//Save User
router.post('/user', function (req, res, next) {
    var user = req.body;
    db.usersCollection.save(user, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});
// Delete User
router.delete('/user/:id', function (req, res, next) {
    db.usersCollection.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, user) {
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
        db.usersCollection.update({_id: mongojs.ObjectId(req.params.id)}, req.body, {}, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
});
//Authenticate
router.post('/user/authenticate', function (req, res, next) {
    const {userName, password} = req.body;
    //const user = db.usersCollection.find({$and: [{userName: userName}, {password: password}]});
    db.usersCollection.findOne({$and: [{userName: userName}, {password: password}]}, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.json("Username or password is incorrect");
        } else {
            return ({
                id: user.id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email
            })
        }
    })
});
//Register
router.post('/user/register', function (req, res, next) {
    const user = req.body

    db.usersCollection.findOne({userName: user.userName}, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            res.json("user name already exists");
        } else {
            db.usersCollection.save(user, function (err, task) {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            });
        }
    });
});
module.exports = router;
