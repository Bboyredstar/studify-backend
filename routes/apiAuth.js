const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt')
const {
  check,
  validationResult
} = require("express-validator");
const jwt = require("jsonwebtoken");

router.post('/api/signin', [
  [check('email', 'value is not a email').isEmail().normalizeEmail()],
  check('password', 'password must be 6+ long').isLength({ min: 6 })
], async (res, req) => {
  try {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (errors) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect auth data'
      })
    }



  }
  catch (err) {
    return res.status(500).json({
      message: err
    })
  }
})

router.post('/api/register', async (req, res) => {
  try {

  }
  catch (err) {
    return res.status(500).json({
      message: err
    })
  }
})

module.exports = router