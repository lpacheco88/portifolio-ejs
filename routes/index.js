const express = require('express');
const router = express.Router();
const Project = require('../model/project');
const Skills = require('../model/skill');

router.get('/', async (req, res) => {
	let project = [];
	let skill = [];
	try {
		res.render('index');
	} catch (error) {
		project = [];
		skill = [];
	}
});

module.exports = router;
