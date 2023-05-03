// router responsible for flashcards
const multer = require('multer');
const express = require('express');

const router = express.Router();

// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage: storage });

// route for HTTP POST requests
router.post('/image-upload', upload.array('my_files', 3), (req, res, next) => {
  // check whether anything was uploaded
  if (req.body.files) {
    // success! send data back to the client, e.g. some JSON data
    const data = {
      status: 'all good',
      message: 'yup, the files were uploaded!!!',
      files: req.body.files
    };
    res.json(data); // send respose
  }
});

module.exports = router;
