//require necessary modules
const mongoose = require("mongoose");

//define mongoose Schema
const userSchema = new mongoose.Schema(
	{
		avatar: Object,
		status: {
			type: String,
			default: "offline",
			enum: { values: ["online", "offline"], message: "Status is invalid!" },
			trim: true
		},
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			minlength: [3, "Username must containt at least 3 characters"],
			maxlength: [50, "Username cannot contain more than 50 characters"]
		},
		city: { type: String, default: "Unvailable" },
		socketId: {
			type: String,
			required: true,
			default: 0
		}
	},
	{ timestamps: true }
);

//define static method for JSON response
userSchema.methods.toJSON = function () {
	const user = this.toObject();
	delete user.__v;
	return user;
};

//define pre hook which for username change
userSchema.pre("save", async function (next) {
	if (!this.isModified("username")) return next();
	this.username = `${this.username}_${this._id}`;
	return next();
});

//define mongoose model
const User = mongoose.model("User", userSchema);

//export User model
module.exports = User;
