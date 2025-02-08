const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 140
    },
    symptoms: {
        type: String,
        required: true,
        minlength: 4
    }
});

module.exports = mongoose.model('Patient', patientSchema);