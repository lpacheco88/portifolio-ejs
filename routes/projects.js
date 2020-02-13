const express = require('express');
const router = express.Router();
const Project = require('../model/project');
const Costumer = require('../model/costumer');

//Get All projects route
router.get('/', async (req, res) => {
	let searchOptions = {};
	if (req.query.name != null && req.query.name != '') {
		searchOptions.name = new RegExp(req.query.name, 'i');
	}
	try {
		const projects = await Project.find(searchOptions);

		res.render('projects/index', {
			projects : projects
		});
	} catch (error) {
		res.redirect('/');
	}
});

//New project route
router.get('/new', (req, res) => {
	renderNewPage(res, new Project());
});

//Create new Project route
router.post('/', async (req, res) => {
	const project = new Project({
		name           : req.body.name,
		description    : req.body.description,
		backEndTec     : req.body.backEndTec,
		frontEndTec    : req.body.frontEndTec,
		startDate      : new Date(req.body.startDate),
		endDate        : new Date(req.body.endDate),
		privateProject : req.body.privateProject,
		canShowTheCode : req.body.canShowTheCode,
		paidInFull     : req.body.paidInFull,
		costumer       : req.body.costumer
	});

	
	try {
		const newProject = await project.save();
		res.redirect(`projects/${newProject.id}`);
	} catch (error) {
		res.render('projects/new', {
			project      : project,
			errorMEssage : 'Error creating project'
		});
	}
});

//Get Project by ID route
router.get('/:id', async (req, res) => {
	try {
		const project = await Project.findById(req.params.id);
		res.render('projects/show', {
			project : project
		});
	} catch (error) {}
});

//Edit Project by ID
router.get('/:id/edit', async (req, res) => {
	try {
		const project = await Project.findById(req.params.id);
		renderEditPage(res, project);
	} catch (error) {
		console.log('error');
		res.redirect('/projects');
	}
});

//Update Project
router.put('/:id', async (req, res) => {
	let project;

	try {
		project = await Project.findById(req.params.id);
		project.name = req.body.name;
		project.description = req.body.description;
		project.backEndTec = req.body.backEndTec;
		project.frontEndTec = req.body.frontEndTec;
		project.startDate = new Date(req.body.startDate);
		project.endDate = new Date(req.body.endDate);
		project.privateProject = req.body.privateProject;
		project.canShowTheCode = req.body.canShowTheCode;
		project.paidInFull = req.body.paidInFull;
		project.costumer = req.body.costumer;

		await project.save();
		res.redirect(`projects/${newProject.id}`);
	} catch (error) {
		console.log(error);
		if (project != null) {
			renderEditPage(res, project, true);
		} else {
			redirect('/');
		}
	}
});

async function renderNewPage(res, project, hasError = false){
	renderFormPage(res, project, 'new', hasError);
}

async function renderEditPage(res, project, hasError = false){
	renderFormPage(res, project, 'edit', hasError);
}

async function renderFormPage(res, project, form, hasError = false){
	try {
		const costumers  = await Costumer.find({});
		const params = {
			project : project,
			costumers: costumers
		};

		if (hasError) {
			if (form === 'edit') {
				params.errorMessage = 'Error Updating project';
			} else {
				params.errorMessage = 'Error creating project';
			}
		}
		res.render(`projects/${form}`, params);
	} catch (error) {
		res.redirect('/projects');
	}
}

//Delete Project
router.delete('/:id', async (req, res) => {
	let project;
	try {
		project = await Project.findById(req.params.id);
		await project.remove();
		res.redirect('/projects');
	} catch (error) {
		if (project != null) {
			res.render('projects/show', {
				project      : project,
				errorMessage : 'Could not remove project, reason: ' + error
			});
		} else {
			res.redirect('/');
		}
	}
});

module.exports = router;
