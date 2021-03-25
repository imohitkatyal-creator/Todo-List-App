const mongoose = require('mongoose');

//Making schema for a element of Todo list
const elementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

const element = mongoose.model('element', elementSchema);

module.exports = element;