var express = require('express');
var router = express.Router();

const index_controller = require('../controllers/index_controller');

// GET
router.get('/', index_controller.index_get);

router.get('/sign-in', index_controller.sign_in_get);

router.get('/sign-up', index_controller.sign_up_get);

// POST
router.post('/sign-in', index_controller.sign_in_post);

router.post('/sign-up', index_controller.sign_up_post);

module.exports = router;