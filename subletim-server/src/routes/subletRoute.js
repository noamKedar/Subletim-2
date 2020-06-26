const express = require('express');
const router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('subletimDB', ['subletimCollection']); //local mongo installation, DB is mydb


// Get All Tasks
router.get('/sublets', function(req, res, next) {
    db.subletimCollection.find(function(err, tasks){
        if(err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

// Get Single Task
router.get('/sublet/:id', function(req, res, next) {
    db.subletimCollection.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});
//Save Task

router.post('/sublet', function(req, res, next){
    var sublet = req.body;
    if(!sublet.subletName || !(sublet.startDate) || !(sublet.endDate)  || !(sublet.price)|| !(sublet.apartment)){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.subletimCollection.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});
// Delete Task
router.delete('/sublet/:id', function(req, res, next){
    db.subletimCollection.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});
// Update Task
router.put('/sublet/:id', function(req, res, next) {
    var sublet = req.body;
    if (!sublet){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.subletimCollection.update({_id: mongojs.ObjectId(req.params.id)}, sublet, {}, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;
