const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const objectId = require('mongoose').Types.ObjectId;

const db = mongojs('subletimDB', ['apartmentsCollection']);

// Get All Apartments
router.get('/apartments', function(req, res, next){
    db.apartmentsCollection.find(function(err, apartments){
        if(err){
            res.send(err);
        }
        res.json(apartments);
    });
});

// Get Single apartments
router.get('/apartments/:id', function(req, res, next){
    db.apartmentsCollection.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, apartment){
        if(err){
            res.send(err);
        }
        res.json(apartment);
    });
});

//Save Apartment
router.post('/apartment', function(req, res){
        let apartmentToAdd = req.body;

    db.apartmentsCollection.findOne({apartmentName: apartmentToAdd.apartmentName}, function (err, apartment) {
        if (err) {
            console.log('error')
            res.send(err);
        }
        if (apartment) {
            console.log('apart exist')
            res.json("Apartment already exists");
        } else {
            console.log('add apart')
            db.apartmentsCollection.save(apartmentToAdd, function (err, apartment) {
                if (err) {
                    res.send(err);
                }
                res.json(apartment);
            });
        }
    });
});

// Delete apartment
router.delete('/apartment/:id', function(req, res, next){
    db.subletimCollection.remove({apartment: mongojs.ObjectId(req.params.id)}, function(err, apartment){
        if(err){
            res.write(err);
        }
    });

    db.apartmentsCollection.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, apartment){
        if(err){
            res.send(err);
        }
        res.json(apartment);
    });
});

// Update Apartment
router.put('/apartment/:id', function(req, res){
    var apartment = req.body;
    db.apartmentsCollection.update({_id:new objectId(req.params.id)}, {
            $set:
                {
                    apartmentName: apartment.apartmentName,
                    address:apartment.address,
                    city:apartment.city,
                    roomNumber:apartment.roomNumber
                }
        }, {}, function(err, apartment){
            if(err){
                res.send(err);
            }
            res.json(apartment);
        });
});

router.get('/userApartments', function(req, res) {
    let id = req.query.user;
    console.log(id)
    if (!req.query) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.apartmentsCollection.find({owner: new objectId(id)}, function (err, apartments) {
            if (err) {
                res.send(err);
            }
            res.json(apartments);
            console.log(apartments)
        });
    }
});
router.get('/mapReduce', function(req, res, next) {
    if (!req.query) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        let map = function(){ emit(this.roomNumber, 1); }
        let reduce = function(key, values){
            return Array.sum(values);
        }
        db.apartmentsCollection.mapReduce(map, reduce,{ out: "map_reduce_example" })
        db.map_reduce_example.find(function (err, apartments) {
            if (err) {
                res.send(err);
            }
            res.json(apartments);
            console.log(apartments)
        });
    }
});
router.get('/searchApartmentsNotAdmin', function(req, res, next) {
    let city = req.query.city;
    let address = req.query.address;
    let rooms = parseInt(req.query.rooms);
    let cityNan = !city
    let addressNan = !address;
    let roomsNan = isNaN(rooms);
    let currentUser = req.query.currentUser;
    if (!req.query) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        if (cityNan && addressNan && roomsNan) {
            db.apartmentsCollection.find({owner: new objectId(currentUser)}, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (!cityNan && !addressNan && !roomsNan) {
            db.apartmentsCollection.find({
                owner: new objectId(currentUser),
                city: city,
                address: address,
                roomNumber: rooms
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (!cityNan && addressNan && roomsNan) {
            db.apartmentsCollection.find({
                owner: new objectId(currentUser),
                city: city
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (cityNan && !addressNan && roomsNan) {
            db.apartmentsCollection.find({
                owner: new objectId(currentUser),
                address: address
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (cityNan && addressNan && !roomsNan) {
            db.apartmentsCollection.find({
                owner: new objectId(currentUser),
                roomNumber: rooms
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (!cityNan && addressNan && !roomsNan) {
            db.apartmentsCollection.find({
                owner: new objectId(currentUser),
                city: city,
                roomNumber: rooms
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (!cityNan && !addressNan && roomsNan) {
            db.apartmentsCollection.find({
                owner: new objectId(currentUser),
                city: city,
                address: address
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (cityNan && !addressNan && !roomsNan) {
            db.apartmentsCollection.find({
                owner: new objectId(currentUser),
                address: address,
                roomNumber: rooms
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        }
    }
})

router.get('/searchApartments', function(req, res, next) {
    let city = req.query.city;
    let address = req.query.address;
    let rooms = parseInt(req.query.rooms);
    let cityNan = !city
    let addressNan = !address;
    let roomsNan = isNaN(rooms);
    if (!req.query) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        if (cityNan && addressNan && roomsNan) {
            db.apartmentsCollection.find({}, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (!cityNan && !addressNan && !roomsNan) {
            db.apartmentsCollection.find({
                city: city,
                address: address,
                roomNumber: rooms
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (!cityNan && addressNan && roomsNan) {
            db.apartmentsCollection.find({
                city: city
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (cityNan && !addressNan && roomsNan) {
            db.apartmentsCollection.find({
                address: address
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (cityNan && addressNan && !roomsNan) {
            db.apartmentsCollection.find({
                roomNumber: rooms
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (!cityNan && addressNan && !roomsNan) {
            db.apartmentsCollection.find({
                city: city,
                roomNumber: rooms
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (!cityNan && !addressNan && roomsNan) {
            db.apartmentsCollection.find({
                city: city,
                address: address
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        } else if (cityNan && !addressNan && !roomsNan) {
            db.apartmentsCollection.find({
                address: address,
                roomNumber: rooms
            }, function (err, apartments) {
                if (err) {
                    res.send(err);
                }
                res.json(apartments);
                console.log(apartments)
            });
        }
    }
})


module.exports = router;