const express = require('express');
const router = express.Router();
const Costumer = require('../model/costumer');

//Get all costumer route
router.get('/', async (req, res) => {
	let searchOptions = {};
	if (req.query.name != null && req.query.name != '') {
		searchOptions.name = new RegExp(req.query.name, 'i');
	}
	try {
		const costumers = await Costumer.find(searchOptions);

		res.render('costumers/index', {
			costumers     : costumers,
			searchOptions : req.query
		});
	} catch (error) {
		res.redirect('/');
	}
});

//new costumer route
router.get('/new', (req, res) => {
	renderNewPage(res, new Costumer());
});

//create Costumer route
router.post('/', async (req, res) => {
	const costumer = new Costumer({
		name           : req.body.name,
		urlRoot        : req.body.urlRoot,
		jobDescription : req.body.jobDescription,
		dateFrom       : new Date(req.body.dateFrom),
		dateFinal      : new Date(req.body.dateFinal),
		review         : req.body.review,
		sideNote       : req.body.sideNote
	});

	try {
		const newCostumer = await costumer.save();
		res.redirect(`costumers/${newCostumer.id}`);
	} catch (error) {
		res.render('costumers/new', {
			costumer     : costumer,
			errorMEssage : 'Error creating costumer'
		});
	}
});

//Get costumer by ID route
router.get('/:id', async (req, res) => {
	try {
		const costumer = await Costumer.findById(req.params.id);
		res.render('costumers/show', {
			costumer : costumer
		});
	} catch (error) {}
});

//Edit costumer by ID route
router.get('/:id/edit', async (req, res) => {
	try {
		const costumer = await Costumer.findById(req.params.id);
		renderEditPage(res, costumer);
	} catch (error) {
		console.log('error');
		res.redirect('/costumers');
	}
});

//Update costumer
router.put('/:id', async (req, res) => {
	let costumer;

	try {
		costumer = await Costumer.findById(req.params.id);
		costumer.name = req.body.name;
		costumer.urlRoot = req.body.urlRoot;
		costumer.jobDescription = req.body.jobDescription;
		costumer.dateFrom = new Date(req.body.dateFrom);
		costumer.dateFinal = new Date(req.body.dateFinal);
		costumer.review = req.body.review;
		costumer.sideNote = req.body.sideNote;

		await costumer.save();
		res.redirect(`/costumers/${costumer.id}`);
	} catch (error) {
		res.render('costumers/new', {
			costumer     : costumer,
			errorMEssage : 'Error creating costumer'
		});
	}
});

async function renderNewPage(res, costumer, hasError = false){
	renderFormPage(res, costumer, 'new', hasError);
}

async function renderEditPage(res, costumer, hasError = false){
	renderFormPage(res, costumer, 'edit', hasError);
}

//render form depending on type new or edit
async function renderFormPage(res, costumer, form, hasError = false){
	try {
		const params = {
			costumer : costumer
		};

		if (hasError) {
			if (form === 'edit') {
				params.errorMessage = 'Error Updating costumer';
			} else {
				params.errorMessage = 'Error creating costumer';
			}
		}
		res.render(`costumers/${form}`, params);
	} catch (error) {
		res.redirect('/costumers');
	}
}

//Delete costumer by ID route
router.delete('/:id', async (req, res) => {
	let costumer;
	try {
		costumer = await Costumer.findById(req.params.id);
		await costumer.remove();
		res.redirect('/costumers');
	} catch (error) {
		if (costumer != null) {
			res.render('costumers/show', {
				costumer     : costumer,
				errorMessage : 'Could not remove costumer, reason: ' + error
			});
		} else {
			res.redirect('/');
		}
	}
});

module.exports = router;
