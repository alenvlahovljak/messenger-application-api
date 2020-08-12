//require necessary module
const mongoose = require("mongoose");

//require constants
const {
	constants: { DATABASE }
} = require("../utils");

//enable mongoose debugging
mongoose.set("debug", true);

//connect to mongodb database
mongoose.connect(DATABASE.ATLAS || DATABASE.LOCAL, {
	keepAlive: true,
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

//require model and export
module.exports.User = require("./User");
module.exports.Room = require("./Room");
module.exports.Message = require("./Message");
