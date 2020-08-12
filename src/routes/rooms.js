//require necessary modules
const express = require("express");

//configure express Router
const router = express.Router({ mergeParams: true });

//require rooms' controllers
const { createRoom } = require("../controllers/rooms");

//define rooms' routes
router.route("/").post(createRoom);

//export rooms' routes
module.exports = router;
