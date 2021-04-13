const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const CourseShema = new Shema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, max: 300 },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  sphere: { type: String, enum: ['Разработка', 'Дизайн', 'Бизнес', 'Маркетинг', 'Фотография', 'Музыка'] },
  date: { type: Date, default: Date.now },
  poster: { type: String },
  requirements: { type: String },
  students: [{ type: ObjectId, ref: 'User' }],
})

module.exports = mongoose.model('Course', CourseShema)