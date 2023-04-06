const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/create-set', (req, res) => {
  const data = req.body.upload;
  axios
    .post('https://my.api.mockaroo.com/set.json?key=6b3bc3e0&__method=POST', data)
    .then((response) => {
      const resdata = response;
      console.log(resdata);
      res.status(200).send({ message: 'success' });
    });
});

module.exports = router;
