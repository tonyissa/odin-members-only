var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/user_controller');

// GET
router.get('/upgrade-account', user_controller.checkAuth, user_controller.upgrade_account_get);

router.get('/create-story', user_controller.checkAuth, user_controller.create_story_get);

router.get('/log-out', user_controller.checkAuth, user_controller.log_out_get);

// POST
router.post('/upgrade-account', user_controller.checkAuth, user_controller.upgrade_account_post);

router.post('/create-story', user_controller.checkAuth, user_controller.create_story_post);

module.exports = router;
