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

exports.getSong = function(req, res, next){

    Song.findOne({_id: req.params.song_id}, function(err, existingSong){

        if(err)
            return next(err);

        if(!existingSong)
            return res.status(404).send({error: 'Song not found'});

        res.status(200).send(existingSong);
    })
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

exports.deleteSong = function(req, res, next){
    Song.remove({_id: req.params.song_id}, function(err, song){
        if(err)
            return next(err);

        res.status(200).send("Successfully deleted");
    });
}

exports.updateSong = function(req, res, next){
    Song.findOne({_id:req.params.song_id}, function(err, song){
        if(err)
            return next(err);

        song.name = req.body.name;
        song._artist = req.body.artistId;
        song._album = req.body.albumId;
        song.duration = req.body.duration;

        if(!song.name){
            return res.status(400).send({error: 'You must enter a name'});
        }
    
        if(!song._artist){
            return res.status(400).send({error: 'You must enter an Artist Id'});
        }
    
        if(!song._album){
            return res.status(400).send({error: 'You must enter an Album Id'});
        }

        if(!song.duration){
            return res.status(400).send({error: 'You must enter a duration'});
        }

        song.save(function(err){
            if(err)
                return next(err)

            res.status(200).send("Successfully updated");
        })
    })
}