const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
	name             : {
		type     : String,
		required : true
	},
	workingWithSince : {
		type     : Date,
		required : true
	},
	knowHowLevel     : {
		type     : Number,
		required : true
	}
});

module.exports = mongoose.model('Skill', skillSchema);
