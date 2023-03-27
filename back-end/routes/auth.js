// router responsible for both login and register logic
const express = require('express') 

const authRouter = express.Router()

authRouter.post('/login', (req, res, next) => {

})

authRouter.post('/register', (req, res, next) => {

})

authRouter.post('/logout', (req, res, next) => {
  
})


module.exports = authRouter