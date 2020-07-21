var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

const objectId = require('mongoose').Types.ObjectId;

var db = mongojs('subletimDB', ['usersCollection']); //local mongo installation, DB is subletimDB
var apartmentsDb = mongojs('subletimDB', ['apartmentsCollection']);
var subletimDB= mongojs('subletimDB', ['subletimCollection']);

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
    let id = req.params.id;
    apartmentsDb.apartmentsCollection.find({owner: new objectId(req.params.id)}, function (err, apartments) {
        if (err) {
            res.write(err);
        }
        else{
            apartments.forEach(apartment => {
                subletimDB.subletimCollection.remove({apartment: mongojs.ObjectId(apartment._id)}, function(err){
                    if(err){
                        res.write(err);
                    }
                });
            });

            apartmentsDb.apartmentsCollection.remove({owner: new objectId(id)}, function (err) {
                if (err) {
                    res.write(err);
                    console.log(err)
                }
            });
        }
    });

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
        db.usersCollection.update({_id: mongojs.ObjectId(req.params.id)}, {$set: req.body}, function (err, user) {
            if (err) {
                res.send(err);
            }
            else{
                db.usersCollection.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, user) {
                    if (err) {
                        res.send(err);
                    }
                    else{
                        res.json(user);
                    }
                });
            }
        });
    }
});
//Authenticate
router.post('/user/authenticate', function (req, res, next) {
    const {userName, password} = req.body;
    db.usersCollection.findOne({$and: [{userName: userName}, {password: password}]}, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.json("Username or password is incorrect");
        } else {
            res.json(user)
        }
    })
});
//Register
router.post('/user/register', function (req, res, next) {
    const userToSave = req.body;

    db.usersCollection.findOne({userName: userToSave.userName}, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            res.json("Username already exists");
        } else {
            db.usersCollection.save(userToSave, function (err, task) {
                if (err) {
                    res.send(err);
                }
                res.json(task);
            });
        }
    });
});


router.get('/searchUser', function(req, res, next) {
    let userName = req.query.userName;
    let phoneNumber = req.query.phoneNumber;
    let email = req.query.email;

    if (!req.query) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        if (!userName && !phoneNumber && !email) {
            db.usersCollection.find({}, function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        } else if (userName && phoneNumber && email) {
            db.usersCollection.find({
                userName: {'$regex': userName},
                phoneNumber: {'$regex': phoneNumber},
                email: {'$regex': email}
            }, function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        } else if (userName && !phoneNumber && !email) {
            db.usersCollection.find({
                userName: {'$regex': userName}
                }, function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        } else if (!userName && phoneNumber && !email) {
            db.usersCollection.find({
                phoneNumber: {'$regex': phoneNumber}
            }, function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        } else if (!userName && !phoneNumber && email) {
            db.usersCollection.find({
                email: {'$regex': email}
            }, function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        } else if (userName && phoneNumber && !email) {
            db.usersCollection.find({
                userName: {'$regex': userName},
                phoneNumber: {'$regex': phoneNumber}
            }, function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        } else if (userName && !phoneNumber && email) {
            db.usersCollection.find({
                userName: {'$regex': userName},
                email: {'$regex': email}
            }, function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        } else if (!userName && phoneNumber && email) {
            db.usersCollection.find({
                phoneNumber: {'$regex': phoneNumber},
                email: {'$regex': email}
            }, function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            });
        }
    }
})
module.exports = router;
