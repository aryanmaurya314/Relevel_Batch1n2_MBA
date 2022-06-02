const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { secret } = require('../configs/authConfig');
const { userTypes } = require('../utils/constants');


// validate signup request body
exports.validateSignup = async (req, res, next) => {
    // check if name is present
    if (!req.body.name) {
        return res.status(400).send({
            message: "Please enter your name."
        })
    }
    // check if userId is present
    if (!req.body.userId) {
        return res.status(400).send({
            message: "Please enter userId."
        })
    }
    //check if userId is unique
    const userid = await User.findOne({ userId: req.body.userId });
    if (userid) {
        return res.status(401).send({
            message: "User Id already exists."
        })
    }
    // check if password is present
    if (!req.body.password) {
        return res.status(400).send({
            message: "Please enter password."
        })
    }
    // check if email is present
    if (!req.body.email) {
        return res.status(400).send({
            message: "Please enter email."
        })
    }
    // check if address is present
    if (!req.body.address) {
        return res.status(400).send({
            message: "Please enter address."
        })
    }
    next();
}

// validate signin request body
exports.validateSignin = (req, res, next) => {
    // check if userId is present
    if (!req.body.userId) {
        return res.status(400).send({
            message: "Please enter userId."
        })
    }
    // check if password is present
    if (!req.body.password) {
        return res.status(400).send({
            message: "Please enter password."
        })
    }
    next();
}

// is admin or user
exports.isAdminOrUser = (req, res, next) => {
    const user = await User.findOne({ userId: req.userId });

    if (user && (user.userType === userTypes.admin || req.params.userId === req.userId)) {
        next();
    }
    else {
        res.status(401).send({
            message: "Unauthorised"
        })
    }
}

// veriify token 
exports.verifyToken = (req, res, next) => {
    // read token from headers
    const token = req.headers['x-access-token'];
    // if token not provided
    if (!token) {
        return res.status(400).send({
            message: "No token provided"
        })
    }
    // verify token
    jwt.verify(token, secret, (err, decoded) => {
        // if token not valid
        if (err) {
            res.status(401).send({
                message: "Unauthorised"
            })
        }
        req.userId = decoded.id;
    })
    next();
}