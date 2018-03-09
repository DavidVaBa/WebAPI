var Artist = require('../models/artist');

exports.getArtists = function(req, res, next){

    Artist.find(function(err, artists) {

        if (err){
            res.send(err);
        }

        res.status(200).send(artists);

    });

}

exports.createArtist = function(req, res, next){

    var name = req.body.name;
    var images = req.body.images;
    var genres = req.body.genres;

    if(!name){
        return res.status(400).send({error: 'You must enter a name'});
    }

    Artist.findOne({name:name}, function(err, existingArtist){

        if(err){
            return next(err);
        }

        if(existingArtist){
              return res.status(409).send({error: 'That artist is already in our records'});
        }

        var artist = new Artist({
          name: name,
          images: images,
          genres: genres
        });

        artist.save(function(err, artist){

            if(err){
                return next(err);
            }

            res.status(201).json({
              artist: artist
            })
        })
    });

}

exports.deleteArtist = function(req, res, next){

    Artist.remove({
        _id : req.params.artist_id
    }, function(err, artist) {
        res.json(artist);
    });

}
