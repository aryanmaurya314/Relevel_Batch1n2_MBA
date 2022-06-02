const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../configs/authConfig');



// logic for user signup
exports.signup = async (req, res) => {
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        userType: req.body.userType,
        address: req.body.address
    }
    try {
        const userCreated = await User.create(userObj);

        const userCreationResponse = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            address: userCreated.address,
            createdAt: userCreated.createdAt
        }

        res.status(201).send(userCreationResponse)
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: "Some internal error while creating user."
        })
    }
}

// logic for user signin
exports.signin = async (req, res) => {
    try {
        var user = await User.findOne({ userId: req.body.userId });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: "Some internal error."
        })
    }
    // check if user exists 
    if (!user) {
        return res.status(404).send({
            message: "User not found. Please signup for login."
        })
    }

    //user is existing, so now we will do the password matching
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({
            success: false.valueOf,
            message: "invalid Password"
        })
    }

    // generate token for login
    const token = jwt.sign({ id: user.userId }, secret, { expiresIn: '1h' })

    // send login response
    const signinResponse = {
        name: user.name,
        userId: user.userId,
        userType: user.userType,
        address: user.address,
        accessToken: token
    }
    res.status(200).send({
        signinResponse
    })
}

