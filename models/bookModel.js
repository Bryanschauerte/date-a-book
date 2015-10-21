var mongoose = require('mongoose');
	// User = require('./userModel.js');
	// Schema = mongoose.Schema;

var Book = new mongoose.Schema({

		title: {type: String, required: true},
		author: {type: String, required: true},
		genre: {type: String},
		image: [{type: String}],
		description: {type: String},
		publishDate: {type: String},
		reviewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],//push in the user
    reviews: [{
				attr: {
					violence: {type: Number},
					loveEct: {type: Number},
					suspence: {type: Number},
					realism: {type: Number},
					horror: {type: Number},
					humor: {type: Number},
					scienceFiction: {type: Number},
					supernaturalContent: {type: Number},
					understandability: {type:Number}
					}
      }]



});

module.exports = mongoose.model('Book', Book);
