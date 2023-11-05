const Story = require('../models/Story');

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET
exports.upgrade_account_get = asyncHandler(async(req, res, next) => {
    res.render('pages/upgrade-account');
})

exports.create_story_get = asyncHandler(async(req, res, next) => {
    res.render('pages/create-story');
})

exports.log_out_get = asyncHandler(async(req, res, next) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
})

// POST
exports.upgrade_account_post = asyncHandler(async(req, res, next) => {
    
    res.redirect('/')
})

exports.create_story_post = asyncHandler(async(req, res, next) => {
    
    res.redirect('/')
})