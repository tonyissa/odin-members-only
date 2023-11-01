var express = require('express');
var router = express.Router();

const index_controller = require('../controllers/index_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index');
});



module.exports = router;
