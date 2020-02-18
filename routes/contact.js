const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
	
	try {
		res.render('contacts/index');
	} catch (error) {
	
	}
});

module.exports = router;