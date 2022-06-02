const { updateUser, updateUserPassword } = require("../controllers/user.controller");
const { verifyToken, isAdminOrUser } = require("../middlewares/validations");





module.exports = (app)=>{

        // PUT /mba/api/v1/users/
        app.put("/mba/api/v1/users", [verifyToken], updateUserPassword)

        // PUT /mba/api/v1/users/{id}
        app.put("/mba/api/v1/users/:id", [verifyToken, isAdminOrUser], updateUser);
}