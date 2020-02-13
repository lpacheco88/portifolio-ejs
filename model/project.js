const mongoose = require('mongoose');
const Costumer = require('./costumer');

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
		type     : Number,
		required : true
	},
	canShowTheCode : {
		type     : Boolean,
		required : true
	},
	paidInFull     : {
		type     : Number,
		required : true
	},
	costumer       : {
		type     : mongoose.Schema.Types.ObjectId,
		required : true,
		ref      : 'Costumer'
	}
});

projectSchema.pre('remove', function(next){
	Costumer.find({ costumer: this.id }, (err, costumers) => {
		if (err) {
			next(err);
		} else if (costumers.length > 0) {
			next(new Error('this costumer has projects stil'));
		} else {
			next();
		}
	});
});

module.exports = mongoose.model('Project', projectSchema);
