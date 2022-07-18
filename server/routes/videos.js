var express = require('express');
var router = express.Router();


const sequenceGenerator = require('./sequenceGenerator');

const Video = require('../models/video');

router.get('/', (req, res, next) => {
    Video.find({}, {_id:0})
        .then(videos => {
            res
                .status(200)
                .json({
                    message: "Videos fetched successfully",
                    videos: videos
                });
        })
        .catch(error => {
            res.status(500).json({
                message:'An error occured',
            error:error
            });
        });
});

router.get('/:id', (req, res, next) => {
    Video.findOne({
        'id': req.params.id
    })
        .then(videos => {
            res
                .status(200)
                .json({
                    message: "Video fetched successfully",
                    videos: videos
                });
        })
        .catch(error => {
            res.status(500).json({
                message:'An error occured',
            error:error
            });
        });
});

router.post('/', (req, res, next) => {
    const maxVideoId = sequenceGenerator.nextId('videos');
    const video = new Video({
        id: maxVideoId,
        title: req.body.title,
        artist: req.body.artist,
        url: req.body.url,
    });

    console.log(video);

    video.save()
        .then(createdVideo => {
            res
                .status(201)
                .json({
                    message:"Video Added Successfully",
                    video: createdVideo
                });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occurred",
                error: error
            })
        })
});

router.put('/:id', (req, res, next) => {
    Video.findOne({
        id:req.params.id
    })
    .then(video => {
        video.name = req.body.name;
        video.artist = req.body.artist,
        video.url = req.body.url;
        video.children = req.body.children;

        Video.updateOne({
            id:req.params.id
        }, video)
        .then(result => {
            res
            .status(204)
            .json({
                message: "Video updated successfully"
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occurred",
                error: error
            })
        })
    })
})

router.delete('/:id', (req, res, next) => {
    Video.findOne({
        id:req.params.id
    })
    .then(video => {
        Video.deleteOne({
            id: req.params.id
        })
        .then(result => {
            res
            .status(204)
            .json({
                message:'Video deleted successfully'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occurred",
                error: error
            });
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "An error occurred",
            error: error
        })
    })
})

module.exports = router