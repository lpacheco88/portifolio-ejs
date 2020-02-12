const express = require('express');
const router = express.Router();
const Project = require('../model/project');

//Get All projects route
router.get('/', async (req, res) => {
	try {
		res.render('projects/index');
	} catch (error) {}
});

//New project route
router.get('/new', (req, res) => {
	try {
		res.render('projects/new', { project: new Project() });
	} catch (error) {}
});

//Create new Project route
router.post('/', async (req, res) => {
	try {
	} catch (error) {}
});

//Get Project by ID route
router.get('/:id', async (req, res) => {
	try {
	} catch (error) {}
});

//Edit Project by ID
router.get('/:id/', async (req, res) => {
	try {
	} catch (error) {}
});

//Update Project
router.put('/:id', async (req, res) => {
	try {
	} catch (error) {}
});

//Delete Project
router.delete('/:id', async (req, res) => {
	try {
	} catch (error) {}
});

module.exports = router;
