const { User } = require("../models/user.model");
const client = require("../config/db");
const { success } = require("../helper/helper");
const { ObjectId } = require("mongodb");

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
        res.status(500).json({
            msg: "eror trying to save user !",
            err: `${error}`,
        });
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
            res.status(404).json({ msg: "user is null" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "eror trying to get user !",
            err: `${error}`,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        let id = new ObjectId(req.params.id);
        let cursor = client.database().collection("users").find({ _id: id });
        let result = await cursor.toArray();
        message = `get client with id ${id} success !`;
        if (result.length > 0) {
            res.status(200).json(success(message, result));
        } else {
            res.status(404).json({ msg: "user not found !" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "eror trying to found user !",
            err: `${error}`,
        });
    }
};

const updateUserById = async (req, res) => {
    try {
        let id = new ObjectId(req.params.id);
        let { name, adress, phone } = req.body;
        let updateResult = await client
            .database()
            .collection("users")
            .updateOne({ _id: id }, { $set: { name, adress, phone } });
        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ msg: "User not found!" });
        }

        const updatedUser = await client
            .database()
            .collection("users")
            .findOne({ _id: id });
        const message = "user updated successful !";
        res.status(200).json(success(message, updatedUser));
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "eror trying to update user !",
            err: `${error}`,
        });
    }
};

const deleteUserById = async (req, res) => {
    try {
        let id = new ObjectId(req.params.id);
        let cursor = await client
            .database()
            .collection("users")
            .deleteOne({ _id: id });
        res.status(200).json({
            msg: `user with id ${id} deleted successful !`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "eror trying to delete user !",
            err: `${error}`,
        });
    }
};

module.exports = {
    addUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById,
};
