const mongoose = require('mongoose')
const extend = require('mongoose-extend-schema');
const User = require('../schemas/User')
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  age: Number,
  summary: { type: String, max: 250, trim: true },
  photo: { type: String },
  site: { type: String, default: '' },
  language: { type: String, default: 'English' },
  competence: { type: String, max: 250 },
}, { discriminatorKey: 'type' })

module.exports = User.discriminator('Teacher', TeacherSchema)