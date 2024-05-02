const multer = require('multer');
const multerUploads = multer({ dest: 'uploads/' });
module.exports = { multerUploads };
