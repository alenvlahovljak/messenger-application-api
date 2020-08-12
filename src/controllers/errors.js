//define error handler
const errorHandler = (err, req, res, next) => {
	return res.status(err.status || 500).json({
		status: err.status || 500,
		message: err.message || "Something went wrong!"
	});
};

//define database error handler
const databaseErrorHandler = ({ errors }) => {
	try {
		const keys = Object.keys(errors);
		const values = Object.values(errors);
		const obj = {};
		for (let i = 0; i < Object.keys(errors).length; i++) {
			obj[keys[i]] = values[i].message;
		}
		return obj;
	} catch (err) {
		return err.message;
	}
};

//define upload error handler
const uploadErrorHandler = (err, req, res, next) => {
	if (err.code === "LIMIT_FILE_SIZE") {
		return res.status(413).json({
			status: 413,
			message: "File is to large!"
		});
	} else if (JSON.parse(err.message)) {
		return res.status(422).json(JSON.parse(err.message));
	}
	return next(err.message);
};

//export error handlers
module.exports = {
	errorHandler,
	databaseErrorHandler,
	uploadErrorHandler
};
