const Story = require('../models/Story');

const asyncHandler = require("express-async-handler");

// GET
exports.index_get = asyncHandler(async(req, res, next) => {
    res.render('pages/index');
})

exports.sign_up_get = asyncHandler(async(req, res, next) => {
    res.render('pages/sign-up');
})

exports.sign_in_get = asyncHandler(async(req, res, next) => {
    res.render('pages/sign-in');
})

// POST
exports.sign_up_post = asyncHandler(async(req, res, next) => {
    
    res.redirect('/')
})

exports.sign_in_post = asyncHandler(async(req, res, next) => {
    
    res.redirect('/')
})