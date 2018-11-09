// MongoDB Persistence implementation for class "barbers"
let mongoose = require('mongoose');

let BarbersSchema = new mongoose.Schema({
        _id: {type: Number, default: 1},
        barberName: String,
        barberBio: {type: String, default: 'Empty bio..'},
        tel: {type: String, default: '0876543210'},
        region: {type: String, default: 'Region Not Specified'},
        likes: {type: Number, default: 0}
    },
    { collection: 'barbers' });

module.exports = mongoose.model('Barbers', BarbersSchema);