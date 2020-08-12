//require db
const db = require("../models");

//define Messages class
class Messages {
	constructor() {
		this.messages = [];
	}
}

//export User class
module.exports = { Messages };
