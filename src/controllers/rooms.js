//require db
const db = require("../models");

//require error handlers
const { databaseErrorHandler } = require("../controllers/errors");

//define room's create controller
const createRoom = async (req, res, next) => {
	try {
		const { from, to } = req.body;
		const data = await db.Room.create({ from, to });
		const room = await db.Room.findById(data._id).populate("from").populate("to").exec();
		return res.status(201).json(room);
	} catch (err) {
		if (err.code == undefined) {
			err.status = 400;
			err.message = databaseErrorHandler(err);
		}
		next(err);
	}
};

//export rooms' controllers
module.exports = { createRoom };
