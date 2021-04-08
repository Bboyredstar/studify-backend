const { Router } = require('express')
const { getUsers, updateUser, becomeTeacher, getUser } = require('../controllers/users')
const validator = require('../utils/tokenValidater')
const router = Router();
const {
  check,
  validationResult
} = require("express-validator");

router.get('/', getUsers)
router.get('/:userId', getUser)
router.patch('/update', [validator], updateUser)
// router.delete('/delete', [validator], deleteUser)
// router.post('/become-teacher', [validator], becomeTeacher)
module.exports = router