let mongoose = require('mongoose');
let Cuts = require('../models/cuts');
let express = require('express');
let router = express.Router();
var mongodbUri = 'mongodb://loti.ibrahimi:webdevwoerk2@ds137863.mlab.com:37863/getsprucedb';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});



// ----------- Returns all elements of our list in JSON form. ------------------ //
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Cuts.find(function(err, foundCuts) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(foundCuts,null,5));
    });
};

// -------------- FIND SPECIFIED CUT via [_id]  --------------------- //
router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Cuts.find({ "_id" : req.params.id },function(err, foundCuts) {
        if (err)
            res.send("!Error ~ Cut not found..");
        else
            res.send(JSON.stringify(foundCuts,null,5))
    });
};

// ------------- FIND CUTS via Barber Name [:barberName] ------------------- //
router.findByBarberName = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Cuts.find({'barberName' : req.params.barberName}, function (err, foundCuts) {
        if (err) {
            res.send("!Error ~ Cut not found..");
        } else {
            res.send(JSON.stringify(foundCuts,null,5))
        }
    })
};

// ------------ FIND CUTS via Date [:cutDate] --------------------- //
router.findByDate = (req, res) => {
    res.setHeader('Content-type', 'application/json');
    Cuts.find({'cutDate' : req.params.cutDate}, function(err, foundCuts) {
        if (err) {
            res.send("!Error ~ Cuts not found..");
        } else {
            res.send(JSON.stringify(foundCuts,null,5))
        }
    })
};

// -------------- ADD SINGLE CUT to collection [cuts] --------------- //
router.addCut = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var cut = new Cuts();

    cut._id = Math.floor((Math.random() * 10000) + 1); //Randomly generate an id
    cut.cutType = req.body.cutType;
    cut.cutPrice = req.body.cutPrice;
    cut.cutDate = req.body.cutDate;   // Date must be in the following format dd.mm.yy (using '.' instead of '/')
    cut.barberName = req.body.barberName;
    cut.likes = req.body.likes;

    cut.save(function (err) {
        if (err)
            res.send("!Error ~ Cut NOT added..");
        else
            res.send("Cut ADDED successfully!");
    })
};

// ---------------  FIND SINGLE CUT via [_id] and update Info --------------------- //
router.updateCut = (req, res) => {

    Cuts.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err) {
        if (err) {
            res.send("!Error ~ Cut NOT found..");
        } else {
            res.send("Cut details UPDATED successfully!");
        }
    });
};


// ---------- FIND SINGLE CUT via ObjectID [_id] and Delete ----------- //
router.deleteCut = (req, res) => {

    Cuts.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send("!Error ~ Cut NOT deleted..");
        else
            res.send("Cut DELETED successfully!");
    });
};



// ----------- FIND A CUT via [_id] and increment Likes ------------- //
router.incrementLikes = (req, res) => {
    Cuts.findById(req.params.id, function(err,foundCut) {
        if (err)
            res.send("!Error ~ Cut NOT found..");
        else {
            foundCut.likes += 1;
            foundCut.save(function (err) {
                if (err)
                    res.send("!Error ~ Unable to Update Cut [likes]..");
                else
                    res.send("Cut [likes] UPDATED successfully!");
            });
        }
    });
};

module.exports = router;
