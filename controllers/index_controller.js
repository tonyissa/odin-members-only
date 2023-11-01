const Story = require('../models/Story');

const asyncHandler = require("express-async-handler");

exports.index_get = asyncHandler(async (req, res, next) => {
    res.render('pages/index');
})