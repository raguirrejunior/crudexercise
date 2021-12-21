const express = require('express');
const router = express.Router();
const custController = require('../controllers/custController');

// Create, Find, Update, Delete

router.get('/', custController.view);
router.post('/', custController.find);
router.get('/addcust', custController.form);
router.post('/addcust', custController.create);

module.exports = router;
