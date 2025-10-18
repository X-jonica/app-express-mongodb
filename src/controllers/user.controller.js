const { User } = require("../models/user.model");
const client = require("../config/db");

const addUser = async (req, res) => {
    try {
        let newUser = new User(req.body.name, req.body.adress, req.body.phone);

        let result = await client
            .database()
            .collection("users")
            .insertOne(newUser);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { addUser };
