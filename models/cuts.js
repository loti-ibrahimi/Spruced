// MongoDB Persistence implementation for class "cuts"
let mongoose = require('mongoose');

let CutsSchema = new mongoose.Schema({
        _id: {type: Number, default: 1},
        cutType: String,
        cutPrice: {type: Number, default: 0},
        cutDate: String,  // In the following format dd.mm.yy (using '.' instead of '/')
        barberName: String,
        likes: {type: Number, default: 0}
    },
    { collection: 'cuts' });

module.exports = mongoose.model('Cuts', CutsSchema);