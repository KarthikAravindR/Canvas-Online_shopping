const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const HttpError = require('../models/http-error')
const User = require('../models/user')


const userSignup = async(req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(new HttpError('Field Cannot be empty',422))
    }
    const {username, email, password,} = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    }catch (err) {
        const error = new HttpError('Sign up failed,please try again',500)
        return next(error)
    }
    if(existingUser){
        const error = new HttpError('User Exists already, Please Log-In Instead',422)
        return next(error)
    }
    let hashedPassword
    try{
        hashedPassword = await bcrypt.hash(password,12)
    }catch (err) {
        const error = new HttpError('Could not sign-in the user, please try again',500)
        return next(error)
    }
    const createdUser = new User({
        username,
        email,
        image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
        password: hashedPassword,
    })
    try {
        await createdUser.save()
    }catch (err) {
        const error = new HttpError('Signing Up failed, please try again',500)
        return next(error)
    }
    let token
    try{
        token = jwt.sign({userId: createdUser.id, email: createdUser.email},process.env.JWT_KEY,{expiresIn: '1h'})
    }catch (err) {
        const error = new HttpError('Signing Up failed, please try again',500)
        return next(error)
    }
    res.status(201).json({ userId: createdUser.id,email: createdUser.email,username: createdUser.username,token: token })
}

const userLogin = async (req, res, next) => {
    const {email, password} = req.body
    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    }catch (err) {
        const error = new HttpError('Sign up failed,please try again',500)
        return next(error)
    }
    if(!existingUser){
        return next(new HttpError('Invalid Credentials, could not log you in',401))
    }
    let isValidPassword = false
    try{
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    }catch (err){
        const error = new HttpError('Could not log you In, please check your credentials and try again',500)
    }
    if(!isValidPassword){
        return next(new HttpError('Invalid Credentials, could not log you in',401))
    }
    let token
    try{
        token = jwt.sign({userId: existingUser.id, email: existingUser.email},process.env.JWT_KEY,{expiresIn: '1h'})
    }catch (err) {
        const error = new HttpError('Log In failed, please try again',500)
        return next(error)
    }
    res.json({ userId: existingUser.id,email: existingUser.email,username: existingUser.username,token: token })
}

exports.userSignup = userSignup
exports.userLogin = userLogin
