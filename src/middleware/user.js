//require neccesary module
const mongoose = require("mongoose");

//require db
const db = require("../models");

//define valid user middleware
const isValidUser = async (req, res, next) => {
	try {
		const user = await db.User.findById(req.params.user_id);
		if (user == null) return res.status(404).json({ status: 404, message: "User Not Found" });
		next();
	} catch (err) {
		next(err);
	}
};

//export user's middleware
module.exports = { isValidUser };
