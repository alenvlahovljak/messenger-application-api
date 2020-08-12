//require necessary module
const multer = require("multer");

//define max file size constant
const MAX_SIZE = 3000000; //3MB

//cofigure filter
const fileFilter = (req, file, cb) => {
	if ((file.mimetype == "image/jpg") | (file.mimetype == "image/jpeg") || file.mimetype == "image/png") {
		return cb(null, true);
	} else {
		return cb(
			new Error(
				JSON.stringify({
					status: 422,
					message: "Unsupported file type!"
				})
			),
			false
		);
	}
};

//configure limit
const limits = { fileSize: MAX_SIZE };

//configure storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, `${__dirname}/../../public/storage/temp`);
	},
	filename: (req, file, cb) => {
		cb(null, `avatar-${Object.values(req.params)[0]}-${Date.now()}.jpeg`);
	}
});

//define multer
const avatar = multer({
	fileFilter,
	limits,
	storage
});

//export avatar module
module.exports = avatar;
