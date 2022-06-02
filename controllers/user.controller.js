const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


// update user details
exports.updateUser = async (req, res) => {

    try {
        const user = await User.findOne({ userId: req.params.id });

        // update the user
        user.name = req.body.name != undefined ? req.body.name : user.name;
        user.email = req.body.email != undefined ? req.body.email : user.email;
        user.userType = req.body.userType != undefined ? req.body.userType : user.userType;
        user.address = req.body.address != undefined ? req.body.address : user.address;
        // save the user
        await user.save();

        res.status(201).send({
            message: "User updated successfully."
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: "Some internal error."
        })
    }
}

// update user details and password
exports.updateUserPassword = async (req, res) => {

    try {
        const user = await User.findOne({ userId: req.userId });
        if (!user) {
            return res.status(404).send({
                message: "user not found"
            })
        }

        // update the user
        if (req.body.password) {
            user.password = req.body.password != undefined ? bcrypt.hashSync(req.body.password) : user.password;

            // save the user
            await user.save();

            res.status(201).send({
                message: "User's password has been updated successfully."
            });
        } else {
            res.status(200).send({
                message: "Nothing to update in req body."
            });
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: "Some internal error."
        })
    }
}