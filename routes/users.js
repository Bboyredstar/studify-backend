const { Router } = require('express')
const { getUsers, createUser, createTeacher } = require('../controllers/users')
const validator = require('../utils/tokenValidater')
const router = Router();
const {
  check,
  validationResult
} = require("express-validator");

router.get('/', getUsers)
// router.put('/update', [validator], updateUser)
// router.delete('/delete', [validator], deleteUser)
router.post('/create-teacher', createTeacher)
module.exports = router