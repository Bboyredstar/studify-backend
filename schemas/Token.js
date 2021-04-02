const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TokenShema = new Schema({
  userId: { type: String, required: true },
  tokenId: { type: String, required: true },
})

module.exports = mongoose.model('Token', TokenShema);