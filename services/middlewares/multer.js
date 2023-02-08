const multer = require("multer");
const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		console.log(file, "<<<<<<");
// 		cb(null, "/tmp/my-uploads");
// 	},
// 	filename: function (req, file, cb) {
// 		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// 		cb(null, file.fieldname + "-" + uniqueSuffix);
// 	},
// });

const upload = multer({ storage });

module.exports = upload;
