var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/user_controller');

// GET
router.get('/become-member', user_controller.become_member_get);

router.get('/become-admin', user_controller.become_admin_get);

router.get('/create-story', user_controller.create_story_get);

router.get('/sign-in', user_controller.sign_in_get);

router.get('/sign-up', user_controller.sign_up_get);

router.get('/log-out', user_controller.log_out_get);

// POST
router.post('/become-member', user_controller.become_member_post);

router.post('/become-admin', user_controller.become_admin_post);

router.post('/create-story', user_controller.create_story_post);

router.post('/sign-in', user_controller.sign_in_post);

router.post('/sign-up', user_controller.sign_up_post);

module.exports = router;
