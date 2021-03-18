const express = require('express')
const { check } = require('express-validator')
const router = express.Router()

const userControllers = require('../controllers/user-controllers')

router.post('/auth/signup',[
    check('username').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 6})
], userControllers.userSignup)
router.post('/auth/login', userControllers.userLogin)

module.exports = router