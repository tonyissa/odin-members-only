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
    body('code').notEmpty().withMessage('Code required').isIn(['', 'G7G7G7', process.env.ADMIN_CODE]).withMessage('Passcode is not correct'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('pages/upgrade-account', { errors: errors.array() });
            return next();
        }

        if (req.body.code === "G7G7G7" && req.user.membership !== "Member") {
            await User.findByIdAndUpdate(req.user._id, { membership: "Member" }).exec();
            res.redirect('/');
        } else if (req.body.code === process.env.ADMIN_CODE && req.user.membership !== "Admin") {
            await User.findByIdAndUpdate(req.user._id, { membership: "Admin" }).exec();
            res.redirect('/');
        } else {
            res.render('pages/upgrade-account', { errors: [ { msg: "Code already has been used" } ] });
        }
    })
]

exports.create_story_post = [
    body('title').trim().notEmpty().withMessage('Title required').isLength({ max: 50 }).withMessage(`Title can't exceed 50 characters`).escape(),
    body('msg').optional().trim().isLength({ max: 300 }).withMessage(`Message can't exceed 300 characters`).escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const errorsArray = errors.array();
        if (req.user.membership === "Unregistered") {
            errorsArray.push({ msg: 'Please upgrade account before posting a story' })
        }
        if (!errors.isEmpty() || req.user.membership === "Unregistered") {
            res.render('pages/create-story', { errors: errorsArray })
        } else {
            const newStory = new Story({
                author: req.user._id,
                title: req.body.title,
                msg: req.body.msg,
                timestamp: new Date()
            })
            await newStory.save();
            res.redirect('/')
        }
    })
]