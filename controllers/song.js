var Song = require('../models/song');
var Artist = require('../models/artist');
var Album = require('../models/album');

exports.getSongs = function(req, res, next){

    Song.find(function(err, songs) {

        if (err){
            res.send(err);
        }

        res.status(200).send(songs);

    });

}

exports.createSong = function(req, res, next){

    var name = req.body.name;
    var artistId = req.body.artistId;
    var albumId = req.body.albumId;
    var duration = req.body.duration;

    if(!name){
        return res.status(400).send({error: 'You must enter a name'});
    }

    if(!artistId){
        return res.status(400).send({error: 'You must enter an Artist Id'});
    }

    if(!albumId){
        return res.status(400).send({error: 'You must enter a Album Id'});
    }

    Artist.findOne({_id:artistId}, function(err, existingArtist){

        if(err){
            return next(err);
        }

        if(!existingArtist){
            return res.status(404).send({error: 'Artist not found'});
        }

        Album.findOne({_id:albumId}, function(err, existingAlbum){

            if(err){
                return next(err);
            }

            if(!existingAlbum){
                return res.status(404).send({error: 'Album not found'});
            }

            var song = new Song({
                name: name,
                _artist: existingArtist._id,
                _album: existingAlbum._id,
                duration: duration
            });

            song.save(function(err, song){

                if(err){
                    return next(err);
                }

                res.status(201).json({
                    Song: song
                });
           });
        })
    })
}