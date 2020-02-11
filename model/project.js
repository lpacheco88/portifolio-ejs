const mongoose = require('mongoose');
const costumer = require('./costumer');

const projectSchema = new mongoose.Schema({
	name           : {
		type     : String,
		required : true
	},
	description    : {
		type     : String,
		required : true
	},
	backEndTec     : {
		type     : String,
		required : true
	},
	frontEndTec    : {
		type     : String,
		required : true
	},
	startDate      : {
		type     : Date,
		required : true
	},
	endDate        : {
		type     : Date,
		required : true
	},
	privateProject : {
		type     : Boolean,
		required : true
	},
	canShowTheCode : {
		type     : Boolean,
		required : true
	},
	paidInFull     : {
		type     : Boolean,
		required : true
	},
	costumer       : {
		type     : mongoose.Schema.Types.ObjectId,
		required : true,
		ref      : 'Costumer'
	}
});

module.exports = mongoose.model('Project', projectSchema);
