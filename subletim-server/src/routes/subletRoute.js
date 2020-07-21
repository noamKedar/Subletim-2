const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('subletimDB', ['subletimCollection']); //local mongo installation, DB is mydb

// Get All Subletim
router.get('/sublets', function(req, res, next) {
    db.subletimCollection.find(function(err, sublets){
        if(err) {
            res.send(err);
        }
        res.json(sublets);
    });
});

// Get Single Sublet
router.get('/sublet/:id', function(req, res, next) {
    db.subletimCollection.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, sublet){
        if(err){
            res.send(err);
        }
        res.json(sublet);
    });
});
//Save Sublet

router.post('/sublet', function(req, res, next) {
    var sublet = req.body;
    if(!sublet.subletName || !(sublet.startDate) || !(sublet.endDate)  || !(sublet.price)|| !(sublet.apartment)){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.subletimCollection.save(sublet, function(err, sublet){
            if(err){
                res.send(err);
            }
            res.json(sublet);
        });
    }
});
// Delete Sublet
router.delete('/sublet/:id', function(req, res, next){
    db.subletimCollection.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, sublet){
        if(err){
            res.send(err);
        }
        res.json(sublet);
    });
});
// Update Sublet
router.put('/sublet/:id', function(req, res, next) {
    var sublet = req.body;
    if (!sublet){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        delete sublet._id;
        db.subletimCollection.replaceOne({_id: mongojs.ObjectId(req.params.id)}, sublet, {}, function(err, sublet){
            if(err){
                res.send(err);
            }
            res.json(sublet);
        });
    }
});

router.get('/groupBySublet', function(req, res){
    db.subletimCollection.aggregate(([
            {"$lookup": {
                    "from": "apartmentsCollection",
                    "localField": "apartment",
                    "foreignField": "_id",
                    "as": "A"
                }},
            { '$addFields': {
                    'city': {
                        '$map': {
                            'input': '$A',
                            'in': '$$this.city',
                        }}
                }},  {"$group" : {_id:"$city", count:{$sum:1}}}]),
        function(err, groups){
            if(err){
                res.send(err);
            }
            res.json(groups);
        });});


router.get('/searchSublets', function(req, res, next) {
    let startDate = new Date(req.query.startDate);
    let endDate = new Date(req.query.endDate);
    let price = parseInt(req.query.price);
    let sdNan = isNaN(startDate.getTime())
    let edNan = isNaN(endDate.getTime())
    let pNan = isNaN(price);

    if (!req.query){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
       if(sdNan && edNan && pNan){
           db.subletimCollection.find({}, function(err, sublets){
               if(err) {res.send(err);}
               res.json(sublets);
           });
       }
       else if (sdNan && edNan  && !pNan){
           db.subletimCollection.find({
               price:{$lte: price}
           }, function(err, sublets){
               if(err) {res.send(err);}
               res.json(sublets);
           });
       }
       else if (!sdNan && edNan  && pNan ) {
           db.subletimCollection.find({
               startDate: {$gte: startDate}
           }, function(err, sublets){
               if(err) {res.send(err);}
               res.json(sublets);
           });
       }
       else if (sdNan && !edNan && pNan) {
           db.subletimCollection.find({
               endDate: {$lte: endDate}
           }, function(err, sublets){
               if(err) {res.send(err);}
               res.json(sublets);
           });
       }
       else if (!sdNan && !edNan && pNan) {
           db.subletimCollection.find({
               startDate: {$gte: startDate},
               endDate: {$lte: endDate}
           }, function(err, sublets){
               if(err) {res.send(err);}
               res.json(sublets);
           });
       }
       else if (!sdNan && edNan && !pNan) {
           db.subletimCollection.find({
               startDate: {$gte: startDate},
               price:{$lte: price}
           }, function(err, sublets){
               if(err) {res.send(err);}
               res.json(sublets);
           });
       }
       else if (sdNan && !edNan && !pNan) {
           db.subletimCollection.find({
               endDate: {$lte: endDate},
               price:{$lte: price}
           }, function(err, sublets){
               if(err) {res.send(err);}
               res.json(sublets);
           });
       }
       else if(!sdNan && !edNan && !pNan) {
           db.subletimCollection.find({
               startDate: {$gte: startDate},
               endDate: {$lte: endDate},
               price:{$lte: price}
           }, function(err, sublets){
               if(err) {res.send(err);}
               res.json(sublets);
           });
       }
    }
});

module.exports = router;
