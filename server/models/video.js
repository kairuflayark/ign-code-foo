const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
   id: { type: String, required: true },
   title: { type: String, required: true},
   artist: { type: String, required: true },
   url: { type: String, required: true },
});

module.exports = mongoose.model('Video', videoSchema);