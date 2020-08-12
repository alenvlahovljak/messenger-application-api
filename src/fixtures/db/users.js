//require necessary modules
const mongoose = require("mongoose");

//require database
const db = require("../../models");

//define models ids
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();

//define user's model No. 1
const userOne = {
	_id: userOneId,
	username: `Test`,
	location: "London"
};

//define user's model No. 2
const userTwo = {
	_id: userTwoId,
	username: `Test`,
	location: "Paris"
};

//define user's model No.3
const userThree = {
	_id: userThreeId,
	username: `Test`,
	location: "Stockholm"
};

//define db's population method
const populateDB = async () => {
	await db.User.deleteMany();
	await new db.User(userOne).save();
	await new db.User(userTwo).save();
	await new db.User(userThree).save();
};

//export users' models
module.exports = { users: { userOne, userTwo, userThree }, populateDB };
