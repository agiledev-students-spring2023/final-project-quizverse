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
app.post('/image-upload', upload.array('my_files', 3), (req, res, next) => {
  // check whether anything was uploaded
  if (req.files) {
    // success! send data back to the client, e.g. some JSON data
    const data = {
      status: 'all good',
      message: 'yup, the files were uploaded!!!',
      files: req.files
    };
    res.json(data); // send respose
  }
});

router.post('/login', (req, res) => {
  res.send('Login');
});

router.post('/register', (req, res) => {
  res.send('Register');
});

router.post('/logout', (req, res) => {
  res.send('Logout');
});

module.exports = router;
