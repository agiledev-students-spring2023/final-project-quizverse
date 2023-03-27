// router responsible for both login and register logic
const express = require('express') 

const router = express.Router()

router.post('/login', (req, res) => {
  res.send('Login')
})

router.post('/register', (req, res) => {
  res.send('Register')
})

router.post('/logout', (req, res) => {
  res.send('Logout')
})

module.exports = router