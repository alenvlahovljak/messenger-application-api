//require db
const db = require("../models");

//require error handlers
const { databaseErrorHandler } = require("../controllers/errors");

//define index users' helper
const indexUsersHelper = async (req, res, next) => {
	try {
		return await db.User.find({ socketId: { $nin: 0 } });
	} catch (err) {
		next(err);
	}
};

//define delete user's helper
const deleteUserHelper = async (socketId) => {
	try {
		return await db.User.findOne({ socketId }).deleteOne();
	} catch (err) {
		next(err);
	}
};

//exports users' helpers
module.exports = { indexUsersHelper, deleteUserHelper };
