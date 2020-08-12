//require db
const db = require("../models");

//require error handlers
const { databaseErrorHandler } = require("../controllers/errors");

//define message's create controller
const createMessage = async (req, res, next) => {
	try {
		const { from, to, text, timestamp } = req.body;
		const message = await db.Message.create({ from, to, text, timestamp });
		return res.status(201).json(message);
	} catch (err) {
		if (err.code == undefined) {
			err.status = 400;
			err.message = databaseErrorHandler(err);
		}
		next(err);
	}
};

//define messages' index controller
const indexMessages = async (req, res, next) => {
	try {
		const messages = await db.Message.find();
		return res.status(200).json(messages);
	} catch (err) {
		next(err);
	}
};

//export messages' controllers
module.exports = { createMessage, indexMessages };
