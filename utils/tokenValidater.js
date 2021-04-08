const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
  const header = req.headers.authorization
  if (header) {
    const token = header.split(' ')[1]
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      if (payload.type !== 'access_token') {
        return res.status(400).json({ message: 'Invalid token' })
      }
      req.params = { id: payload.userId }
      next()
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
}