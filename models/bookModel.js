var mongoose = require('mongoose'),
	User = require('./userModel.js');
	// Schema = mongoose.Schema;

var Book = new mongoose.Schema({

		name: {type: String, required: true},
		genre: {type: String, required: true},
		image: [{type: String}],
		description: {type: String},

		minors: [{ category: {type: String},
    score:{type: Number}
			// violence: {type: Number},
			// loveEct: {type: Number},
			// suspence: {type: Number},
			// twists: {type: Number},
			// realism: {type: Number},
			// humor: {type: Number},
      // scienceFiction: {type: Number},
      // supernaturalContent: {type: Number}
		}],
    reviews: [{
        number: {type: Number},
        reviewedByUser: {type: Boolean}
        reviewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
      }]

});

module.exports = mongoose.model('Book', Book);
