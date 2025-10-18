const express = require("express");
const { addUser, getAllUser } = require("../controllers/user.controller");
const router = express.Router();

router.route("/user").post(addUser);
router.route("/user").get(getAllUser)

module.exports = router;
