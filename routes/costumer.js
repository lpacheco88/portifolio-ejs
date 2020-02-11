const express = require('express');
const router = express.Router();
const Costumer = require('../model/costumer');

//Get all costumer route
router.get('/', async (req, res) => {
	try {
	} catch (error) {}
});

//new costumer route
router.get('/new', (req, res) => {
	res.render('', { costumer: new Costumer() });
});

//create Costumer route
router.post('/', async (req, res) => {
	const costumer = new Costumer({
		name : req.body.name
	});

	try {
	} catch (error) {}
});

//Get costumer by ID route
router.get('/:id', async (req, res) => {
	try {
	} catch (error) {}
});

//Edit costumer by ID route
router.get('/:id/edit', async (req, res) => {
	try {
	} catch (error) {}
});

//Update costumer by ID
router.put('/:id', async (req, res) => {
	try {
	} catch (error) {}
});

//Delete costumer by ID route
router.delete('/:id', async (req, res) => {
	let costumer;
	try {
	} catch (error) {}
});

module.exports = router;
