const express = require('express');
const router = express.Router();
const custController = require('../controllers/custController');

// Create, Find, Update, Delete

router.get('/', custController.view);
router.post('/', custController.find);
router.get('/addcust', custController.form);
router.post('/addcust', custController.create);
router.get('/editcust/:id', custController.edit);
router.post('/editcust/:id', custController.update);
router.get('/viewcust/:id', custController.viewall);
router.get('/:id', custController.delete);



module.exports = router;
