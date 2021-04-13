const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  id: { type: String, required: true },
  course: { type: String, required: true },
  user: { type: ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 0, max: 5 },
  comment: { type: String, max: 250, trim: true, default: '' },
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Rating', RatingSchema)