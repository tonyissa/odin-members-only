const Story = require('../models/Story');

const asyncHandler = require("express-async-handler");

const { body, validationResult } = require("express-validator");

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
exports.sign_up_post = [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid').escape(),
    body('password').trim().notEmpty().withMessage('Password is required').escape(),
    body('confirmPassword').trim().notEmpty().escape().custom((value, {req}) => {
        if (value !== req.body.password) { 
            throw new Error('Passwords do not match')
        }
        return true;
    }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('pages/sign-up', { errors: errors.array() });
        } else {

        }
    })
]

exports.sign_in_post = asyncHandler(async(req, res, next) => {
    
    res.redirect('/')
})