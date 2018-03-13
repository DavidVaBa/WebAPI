var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    _artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    _album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    duration: {
        type: String,
    }

});

module.exports = mongoose.model('Song', SongSchema);