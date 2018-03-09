var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    images: [
      {
        url: String
      }
    ],
    releaseDate: String,
    _artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist'}

}, {
    timestamps: true
});

module.exports = mongoose.model('Album', AlbumSchema);
