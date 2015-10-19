var mongoose = require('mongoose');
	// BooksReviewed = require('./booksReviewed.js');
//you dont need to inject or req model when making a mongo ref



var userSchema = new mongoose.Schema({
	facebook: {
		id: {type: String}
	},
	google: {
		id: {type: String}
	},
	email: {type: String, required: true},
	name: String,
	password: String,
	// token: String,
	booksReviewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]// push in the user_id
});

module.exports = mongoose.model('User', userSchema);
