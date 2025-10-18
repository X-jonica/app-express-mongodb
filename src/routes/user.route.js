const express = require("express");
const {
    addUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById,
} = require("../controllers/user.controller");
const router = express.Router();

router.route("/user").post(addUser);
router.route("/user").get(getAllUser);
router.route("/user/:id").get(getUserById);
router.route("/user/:id").put(updateUserById);
router.route("/user/:id").delete(deleteUserById);

module.exports = router;
