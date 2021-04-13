const { Router } = require('express')
const { getUsers, updateUser, getUser, becomeTeacher } = require('../controllers/users')
const validator = require('../utils/tokenValidater')
const router = Router();
const {
  check,
  validationResult
} = require("express-validator");

router.get('/', getUsers)
router.get('/:userId', getUser)
router.patch('/update', [validator], updateUser)
router.patch('/instructor', [validator], becomeTeacher)
// router.patch('/instructor', [validator], setTeacher)
// router.delete('/delete', [validator], deleteUser)
module.exports = router