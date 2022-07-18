var Sequence = require('../models/sequence');

var maxVideoId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxVideoId = sequence.maxVideoId;

    });
}

SequenceGenerator.prototype.nextId = function() {

  var updateObject = {};
  var nextId;

  
  maxVideoId++;
  updateObject = {maxVideoId: maxVideoId};
  nextId = maxVideoId;

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
