const { Router } = require('express');
const { signIn, signUp, refreshToken } = require('../controllers/auth')
const validator = require('../utils/userValidator')
const { check } = require('express-validator')
const router = Router()



router.post('/signin', validator([
  check('email', 'Некорректный email').isEmail().normalizeEmail(),
  check('password', 'Пароль должен содержать не меньше 6 символов').isLength({ min: 6 })
]), signIn)

router.post('/register', validator([
  check('email', 'Некорректный email').isEmail().normalizeEmail(),
  check('password', 'Пароль должен содержать не меньше 6 символов').isLength({ min: 6 }),
  check('fname', 'Имя не может быть пустым').isLength({ min: 2 }),
  check('lname', 'Фамилия не может быть пустой').isLength({ min: 2 })
]), signUp)

router.post('/refresh', validator([check('refreshToken', 'Токен не может быть пустым').not().isEmpty()]), refreshToken)

module.exports = router