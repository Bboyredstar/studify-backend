const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const Token = require('../schemas/Token')
const { secret, token } = require('../config/jwt')



const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: token.access.type
  }
  const options = {
    expiresIn: token.access.expiresIn
  }

  return jwt.sign(payload, secret.access.secret, options)
}

const generateRefreshToken = () => {
  const payload = {
    id: uuidv4(),
    type: token.refresh.type,
  }
  const options = {
    expiresIn: token.refresh.expiresIn
  }
  return { id: payload.id, token: jwt.sign(payload, secret.refresh.secret, options) }
}

const replaceDbRefreshToken = async (tokenId, userId) => {
  await Token.findOneAndDelete({ userId }).exec()
  await Token.create({ userId, tokenId })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
}