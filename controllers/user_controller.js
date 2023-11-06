const Story = require('../models/Story');
const User = require('../models/User');

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET
exports.upgrade_account_get = asyncHandler(async (req, res, next) => {
    res.render('pages/upgrade-account');
})

exports.create_story_get = asyncHandler(async (req, res, next) => {
    res.render('pages/create-story');
})

exports.log_out_get = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
})

// POST
exports.upgrade_account_post = [
    body('code').notEmpty().withMessage('Code is required').isIn(['', '3!$#DA@!%', "EEWEVyKURtXc5dCYhJ5b"]).withMessage('Passcode is not correct'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('pages/upgrade-account', { errors: errors.array() });
            return next();
        }

        if (req.body.code === "3!$#DA@!%") {
            await User.findByIdAndUpdate(req.user._id, { membership: "Member" });
            res.redirect('/');
        } else if (req.body.code === "EEWEVyKURtXc5dCYhJ5b") {
            await User.findByIdAndUpdate(req.user._id, { membership: "Admin" });
            res.redirect('/');
        } else {
            res.render('pages/upgrade-account', { errors: [ { msg: "Account already upgraded" } ] });
        }
    })
]

exports.create_story_post = asyncHandler(async (req, res, next) => {
    
    res.redirect('/')
})