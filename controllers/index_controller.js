const Story = require('../models/Story');
const User = require('../models/User');

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

const passport = require("passport");

// GET
exports.index_get = asyncHandler(async (req, res, next) => {
    res.render('pages/index');
})

exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render('pages/sign-up');
})

exports.sign_in_get = asyncHandler(async (req, res, next) => {
    res.render('pages/sign-in');
})

// POST
exports.sign_up_post = [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid').escape().custom(async (value) => {
        const result = await User.find({email: value});
        if (result.length > 0) {
            throw new Error('Email has already been taken');
        }
        return true;
    }),
    body('username').trim().notEmpty().withMessage('Username is required').escape().custom(async (value) => {
        const result = await User.find({username: value});
        if (result.length > 0) {
            throw new Error('Username has already been taken');
        }
        return true;
    }),
    body('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').trim().notEmpty().withMessage('Please confirm password').custom((value, {req}) => {
        if (value !== req.body.password) { 
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('pages/sign-up', { errors: errors.array() });
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                try {
                    const user = new User({
                        email: req.body.email,
                        password: hashedPassword,
                        username: req.body.username,
                        memebership: "Unregistered"
                    });
                    await user.save();
                    res.redirect('/');
                } catch (err) {
                    return next(err);
                }
            })
        }
    })
]

exports.sign_in_post = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/sign-in"
      })