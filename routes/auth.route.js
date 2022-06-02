const { signup, signin, updateUser, updateUserPassword } = require("../controllers/auth.controller");
const { validateSignup, validateSignin, isAdminOrUser, verifyToken } = require("../middlewares/validations");

module.exports = (app) => {
    //POST:  /mba/api/v1/auth/signup
    app.post("/mba/api/v1/auth/signup", [validateSignup], signup);

    // POST:  /mba/api/v1/auth/signin
    app.post("/mba/api/v1/auth/signin", [validateSignin], signin);


}