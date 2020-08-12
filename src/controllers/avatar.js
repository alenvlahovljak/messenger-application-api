//require necessary module
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

//require db
const db = require("../models");

//define create avatar handler
const createAvatar = async (req, res, next) => {
	try {
		const { path: avatarPath, destination } = req.file;
		const user = await db.User.findById(Object.values(req.params)[0]);
		if (!user) {
			return res.status(404).json({
				status: res.statusCode,
				messages: "User not found!"
			});
		}
		const buffer = await sharp(avatarPath).resize({ height: 50, width: 50 }).jpeg({ quality: 70 }).toBuffer();
		fs.truncate(path.resolve(destination, "../avatars", `avatar-${user._id}.jpeg`), 0, function () {
			fs.writeFile(path.resolve(destination, "../avatars", `avatar-${user._id}.jpeg`), buffer, function (err) {
				if (err) {
					return console.log("Error writing file: " + err);
				}
			});
		});
		fs.unlinkSync(avatarPath);
		user.avatar = {
			filename: `avatar-${user._id}.jpeg`,
			path: `avatars/avatar-${user._id}.jpeg`
		};
		await user.save();
		return res.status(201).json(user);
	} catch (err) {
		return next({
			status: 400,
			messages: err.messages
		});
	}
};

//define delete avatar handler
const deleteAvatar = async (req, res, next) => {
	try {
		const user = await db.User.findById(Object.values(req.params)[0]);
		if (user.avatar) {
			await fs.unlink(path.join(__dirname, "../../public/storage", user.avatar.path), (err) => {});
		}
		user.avatar = undefined;
		await user.save();
		return res.status(204).send();
	} catch (err) {
		return next(err);
	}
};

//export avatar handlers
module.exports = { createAvatar, deleteAvatar };
