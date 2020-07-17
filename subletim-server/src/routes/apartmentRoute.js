const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const objectId = require('mongoose').Types.ObjectId;

const db = mongojs('subletimDB', ['apartmentsCollection']);

// Get All Apartments
router.get('/apartments', function(req, res){
    db.apartmentsCollection.find(function(err, apartments){
        if(err){
            res.send(err);
        }
        res.json(apartments);
    });
});

router.get('/mapReduceApartment', function(req, res){
    console.log('---- test -----')
    let m = function() { emit(this.roomNumber,1)}
    let r = function (k,v) { return Array.sum(v);}
    console.log('---- test 2-----' + m + '-------' + r)
    var res = db.apartmentsCollection.mapReduce((m,r,{ out: "map_reduce_example" }),
        function(err, mr){
        if(err){
            console.log('error here')
            res.send(err);
        }
        res.json(mr);
        console.log(mr)
    });
    console.log(res);
});

// Get Single apartments
router.get('/apartments/:id', function(req, res){
    db.apartmentsCollection.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, apartment){
        if(err){
            res.send(err);
        }
        res.json(apartment);
    });
});

//Save Apartment
router.post('/apartment', function(req, res){
        db.apartmentsCollection.save(apartment, function(err, apartment){
            if(err){
                res.send(err);
            }
            res.json(apartment);
        });
});

// Delete Task
router.delete('/apartment/:id', function(req, res){
    db.apartmentsCollection.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, apartment){
        if(err){
            res.send(err);
        }
        res.json(apartment);
    });
});

// Update Apartment
router.put('/apartment/:id', function(req, res, next){
    let apartment = req.body;
    let updApartment = {};

    if(apartment.apartmentName){
        updApartment.apartmentName = apartment.apartmentName;
    }

    if(apartment.city){
        updApartment.city = apartment.city;
    }

    if(apartment.address){
        updApartment.address = apartment.address;
    }

    if(apartment.owner){
        updApartment.owner = apartment.owner;
    }

    if(apartment.roomNumber){
        updApartment.roomNumber = apartment.roomNumber;
    }

    if(!updApartment){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.apartmentsCollection.update({_id: mongojs.ObjectId(req.params.id)},updApartment, {}, function(err, apartment){
            if(err){
                res.send(err);
            }
            res.json(apartment);
        });
    }
});
router.get('/userApartments', function(req, res, next) {
    let id = req.query.user;

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