var Album = require('../models/album');
var Artist = require('../models/artist');

exports.getAlbums = function(req, res, next){

    Album.find(function(err, albums) {

        if (err){
            res.send(err);
        }

        res.json(albums);

    });

}

exports.createAlbum = function(req, res, next){

    var name = req.body.name;
    var images = req.body.images;
    var releaseDate = req.body.releaseDate;
    var artistId = req.body.artistId;

    if(!name){
        return res.status(400).send({error: 'You must enter a name'});
    }

    if(!artistId){
        return res.status(400).send({error: 'You must enter an artist id'});
    }

    Artist.findOne({_id:artistId}, function(err, existingArtist){

        if(err){
            return next(err);
        }

        if(!existingArtist){
            return res.status(404).send({error: 'Artist not found'});
        }


        Album.findOne({name:name}, function(err, existingAlbum){

          if(err){
            return next(err);
          }

          if(existingAlbum){
            return res.status(400).send({error: 'That Album is already in our records'});
          }

          var album = new Album({
            name: name,
            images: images,
            releaseDate: releaseDate,
            _artist: existingArtist._id
          });

          album.save(function(err, album){

            if(err){
              return next(err);
            }

            res.status(201).json({
              Album: album
            });
          });
        });
    })


}

exports.deleteAlbum = function(req, res, next){

    Album.remove({
        _id : req.params.Album_id
    }, function(err, Album) {
        res.json(Album);
    });

}
