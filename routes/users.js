const { Router } = require('express')
const getUsers = require('../controllers/users')
const router = Router();
const {
  check,
  validationResult
} = require("express-validator");

router.get('/', getUsers)
router.post('/', [], getUsers)

module.exports = router