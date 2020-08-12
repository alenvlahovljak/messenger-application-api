//require necessary modules
const mongoose = require("mongoose");

//define mongoose Schema
const messageSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
			trim: true,
			minlength: [3, "Username must containt at least 3 characters"]
		},
		from: { type: Object },
		to: { type: Object },
		timestamp: { type: Object }
	},
	{ timestamps: true }
);

//define static method for JSON response
messageSchema.methods.toJSON = function () {
	const user = this.toObject();
	delete user.updatedAt;
	delete user.__v;
	return user;
};

//define mongoose model
const Message = mongoose.model("Message", messageSchema);

//export Message model
module.exports = Message;
