const secret = {
  access: { secret: process.env.ACESS_TOKEN_SECRET },
  refresh: { secret: process.env.REFRESH_TOKEN_SECRET }
}
const token = {
  access: {
    type: 'access_token',
    expiresIn: '20m',
  },
  refresh: {
    type: 'refresh_token',
    expiresIn: '40m',
  }
}

module.exports = { secret, token }