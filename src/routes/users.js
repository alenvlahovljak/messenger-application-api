//require necessary modules
const express = require("express");

//configure express Router
const router = express.Router({ mergeParams: true });

//require error handler
const { uploadErrorHandler } = require("../controllers/errors");

//require user's middleware
const { isValidUser } = require("../middleware/user");

//require utils
const { avatar } = require("../utils/index");

//require users' controllers
const { createUser, indexUsers, setUserSocketId, deleteUser } = require("../controllers/users");

//require users' avatar controllers
const { createAvatar, deleteAvatar } = require("../controllers/avatar");

//define users' routes
router.route("/").post(createUser);
router.route("/").get(indexUsers);
router.route("/:user_id").delete(deleteUser);
router.route("/:user_id/socket").patch(setUserSocketId);

//define user's avatar routes
router.post("/:user_id/avatar", isValidUser, avatar.single("avatar"), createAvatar, uploadErrorHandler);
router.route("/:user_id/avatar").delete(deleteAvatar);

//export users' routes
module.exports = router;
