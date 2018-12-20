let mongoose = require('mongoose');
let Barbers = require('../models/barbers');
let express = require('express');
let router = express.Router();
var mongodbUri = 'mongodb://loti:webdevwork2@ds137863.mlab.com:37863/getsprucedb';

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

    Barbers.find(function(err, foundCuts) {
        if (err)
            res.send(err);
        res.send(foundCuts,null,5);
    });
};

// -------------- FIND SPECIFIED CUT via [_id]  --------------------- //
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Barbers.find({ "_id" : req.params.id },function(err, foundBarber) {
        if (err)
            res.send(err);
        else
            res.send(foundBarber,null,5)
    });
};

// ------------- FIND BARBERS via Name [:barberName] ------------------- //
router.findByBarberName = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Barbers.find({'barberName' : req.params.barberName}, function (err, foundBarber) {
        if (err) {
            res.send("!Error ~ Barber not found..");
        } else {
            res.send(foundBarber,null,5)
        }
    })
};

// ------------ FIND Barbers via Location [:region] --------------------- //
router.findByRegion = (req, res) => {
    res.setHeader('Content-type', 'application/json');
    Barbers.find({'region' : req.params.region}, function(err, foundBarbers) {
        if (err) {
            res.send("!Error ~ Barbers not found..");
        } else {
            res.send(foundBarbers,null,5)
        }
    })
};

// -------------- ADD SINGLE BARBER to collection [barbers] with associated metadata --------------- //
router.addBarber = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var barber = new Barbers();

    barber._id = Math.floor((Math.random() * 10000) + 1); //Randomly generate an id
    barber.barberName = req.body.barberName;
    barber.barberBio = req.body.barberBio;
    barber.tel = req.body.tel;
    barber.region = req.body.region;
    barber.likes = req.body.likes;

    barber.save(function (err) {
        if (err)
            res.send("!Error ~ Barber NOT added..");
        else
            res.send("Barber ADDED successfully!");
    })
};

// ---------------  FIND SINGLE BARBER via [_id] and update Info --------------------- //
router.updateBarber = (req, res) => {

    Barbers.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err) {
        if (err) {
            res.send("!Error ~ Barber NOT found..");
        } else {
            res.send("Barber details UPDATED successfully!");
        }
    });
};


// ---------- FIND SINGLE BARBER via [_id] and Delete ----------- //
router.deleteBarber = (req, res) => {

    Barbers.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send("!Error ~ Barber NOT deleted..");
        else
            res.send("Barber DELETED successfully!")
    });
};



// ----------- FIND A BARBER via [_id] and increment Likes ------------- //
router.incrementLikes = (req, res) => {
    Barbers.findById(req.params.id, function(err,foundBarber) {
        if (err)
            res.send("!Error ~ Cut NOT found..");
        else {
            foundBarber.likes += 1;
            foundBarber.save(function (err) {
                if (err)
                    res.send("!Error ~ Unable to Update Barber [likes]..");
                else
                    res.send("Barber [likes] UPDATED successfully!");
            });
        }
    });
};

module.exports = router;
