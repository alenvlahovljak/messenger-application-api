//define database constants
const DATABASE = {
	LOCAL: process.env.LOCAL_DB,
	ATLAS: process.env.ATLAS_DB
};

const USER_STATUS = {
	ONLINE: "online",
	OFFLINE: "offline"
};

const CORS = {
	WHITE_LIST: ["http://localhost:3000"]
};

//export constants
module.exports = { DATABASE, CORS, USER_STATUS };
