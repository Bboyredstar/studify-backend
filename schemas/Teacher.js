const mongoose = require('mongoose')
const extend = require('mongoose-extend-schema');
const UserSchema = require('../schemas/User')

const TeacherSchema = extend(UserSchema, {
  age: Number,
  summary: { type: String, max: 250, trim: true },
  photo: { type: String },
  site: { type: String, default: '' },
  language: { type: String, default: 'English' },
  competence: { type: String, max: 250 },
})

module.exports = mongoose.model('Teacher', TeacherSchema)