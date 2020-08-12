//require necessary modules
const express = require("express");

//configure express Router
const router = express.Router();

//require messages' controllers
const { createMessage, indexMessages } = require("../controllers/messages");

//define messages' routes
router.route("/").post(createMessage);
router.route("/").get(indexMessages);

//export messages' routes
module.exports = router;
