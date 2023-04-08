const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/edit-set/:id', (req, res) => {
  const id = req.params.id;
  // a mongoDB update takes place here
  res.status(200).send({ message: 'success' });
});

module.exports = router;
