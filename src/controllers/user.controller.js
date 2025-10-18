const { User } = require("../models/user.model");
const client = require("../config/db");
const { success } = require("../helper/success");

const addUser = async (req, res) => {
    try {
        let newUser = new User(req.body.name, req.body.adress, req.body.phone);

        let result = await client
            .database()
            .collection("users")
            .insertOne(newUser);

        const message = "user save successful !";
        res.status(200).json(success(message, result));
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const getAllUser = async (req, res) => {
    try {
        let cursor = client.database().collection("users").find();
        let userResult = await cursor.toArray();
        const message = "get all user successful !";
        if (userResult.length > 0) {
            res.status(200).json(success(message, userResult));
        } else {
            res.status(200).json("user is null");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { addUser, getAllUser };
