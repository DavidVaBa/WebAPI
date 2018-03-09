var mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    images: [
      {
        url:String
      }
    ],
    genres:[String]

}, {
    timestamps: true
});

module.exports = mongoose.model('Artist', ArtistSchema);
