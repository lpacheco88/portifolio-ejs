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
	costumerImage     : {
		type     : Buffer,
		required : true
	},
	costumerImageType : {
		type     : String,
		required : true
	},
	sideNote       : {
		type     : String,
		required : true
	}
});

costumerSchema.virtual('costumerImagePath').get(function(){
	if (this.costumerImage != null && this.costumerImageType != null) {
		return `data:${this.costumerImageType};charset=utf-8;base64,${this.costumerImage.toString('base64')}`;
	}
});

module.exports = mongoose.model('Costumer', costumerSchema);
