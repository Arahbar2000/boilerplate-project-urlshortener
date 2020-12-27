const mongoose = require('mongoose');
const Schema = mongoose.Schema

const urlSchema = new Schema({
    original_url: {
        type: String,
    },
    short_url: {
        type: Number
    }
});

const URL = mongoose.model('urls', urlSchema);

module.exports = URL