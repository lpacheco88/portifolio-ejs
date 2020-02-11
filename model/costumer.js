const mongoose = require('mongoose');

//Costumer table
//Name, url(cosutmer official website),jobDescription, date from(I was there or participaed in project) and final date, review, sidenote
const costumerSchema = new mongoose.Schema({
	name           : {
		type     : String,
		required : true
	},
	urlRoot        : {
		type     : String,
		required : true
	},
	jobDescription : {
		type     : String,
		required : true
	},
	dateFrom       : {
		type     : Date,
		required : true
	},
	dateFinal      : {
		type     : Date,
		required : true
	},
	review         : {
		type     : String,
		required : true
	},
	sideNote       : {
		type     : String,
		required : true
	}
});

module.exports = mongoose.model('Costumer', costumerSchema);
