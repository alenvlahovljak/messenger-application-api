//require db
const db = require("../models");

//require error handlers
const { databaseErrorHandler } = require("../controllers/errors");

//define user's create controller
const createUser = async (req, res, next) => {
	try {
		const { city } = req.body;
		const user = await db.User.create({
			username: "User",
			city
		});
		return res.status(201).json(user);
	} catch (err) {
		if (err.code == 11000) err.message = "Username is already taken!";
		if (err.code == undefined) {
			err.status = 400;
			err.message = databaseErrorHandler(err);
		}
		next(err);
	}
};

//define users' index controller
const indexUsers = async (req, res, next) => {
	try {
		const { currentUser } = req.query;
		const users = await db.User.find({ _id: { $nin: currentUser }, status: "online" });
		return res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};

//define set user's socket id controller
const setUserSocketId = async (req, res, next) => {
	try {
		const { user_id } = req.params;
		const { socketId } = req.body;
		const user = await db.User.findOneAndUpdate(
			{ _id: user_id },
			{ socketId, status: "online" },
			{ runValidators: true, new: true }
		);
		return res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

//define user's delete controller
const deleteUser = async (req, res, next) => {
	try {
		const { user_id } = req.params;
		await db.User.findByIdAndDelete(user_id);
		return res.status(204).json();
	} catch (err) {
		next(err);
	}
};

//exports users' controllers
module.exports = { createUser, indexUsers, setUserSocketId, deleteUser };
