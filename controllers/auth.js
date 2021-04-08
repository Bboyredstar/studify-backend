const bcrypt = require('bcrypt')
const authHelper = require('../utils/authHelper')
const User = require('../schemas/User')
const Token = require('../schemas/Token')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');


const updateToken = async (userId) => {
  const accessToken = authHelper.generateAccessToken(userId)
  const refreshToken = authHelper.generateRefreshToken()
  return authHelper.replaceDbRefreshToken(refreshToken.id, userId)
    .then(() => { return { access_token: accessToken, refresh_token: refreshToken.token } })
}


const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ message: 'Пользователь с таким email не найден' })
    }
    const isMatch = bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Неправильные данные для входа, попробуйте снова' })
    }
    updateToken(user.id)
      .then((tokens) => {
        return res.status(200).json({
          data: { profile: { ...user._doc, name: user.name, password: '' }, tokens }
        })
      })
      .catch((err) => { return res.status(400).json({ message: 'Ошибка данных' }) })

  }
  catch (err) {
    return res.status(500).json({
      message: err
    })
  }
}

const signUp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ message: `Пользователь с таким email уже существует` })
    }
    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    let newUser = new User({ id: uuidv4(), ...req.body, password: hashedPassword })
    newUser.save()
    const tokens = await updateToken(newUser.id)
    if (!tokens) {
      return res.status(400).json({ message: 'Ошибка данных' })
    }
    return res.status(201).json({
      message: 'Пользователь создан',
      data: { profile: { ...newUser._doc, name: newUser.name, password: '' }, tokens }
    })
  }
  catch (err) {

    return res.status(500).json({
      error: JSON.stringify(err),
      message: 'Ошибка регистрации, повторите позже'
    })
  }
}

const refreshToken = (req, res) => {
  const { refreshToken } = req.body
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    if (payload.type !== 'refresh_token') {
      return res.status(401).json({ message: 'Invalid token' })
    }
    Token.findOne({ tokenId: payload.id })
      .exec()
      .then((token) => {
        if (token === null) {
          throw new Error('Invalid token')
        }
        return updateToken(token.userId)
      })
      .then((tokens) => res.status(200).json(tokens))
      .catch((err) => { return res.status(401).json({ message: err.message }) })
  }
  catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' })
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
}

module.exports = { signIn, signUp, refreshToken }