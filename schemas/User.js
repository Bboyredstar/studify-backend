const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true },
  fname: { type: String, required: true, max: 100 },
  lname: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100, unique: true },
  password: { type: String, required: true, min: 6 },
  courses: [{ type: Schema.ObjectId, ref: 'Course' }],
  role: { type: String, enum: ['user', 'teacher'], required: true, default: 'user' },
  favorite_courses: [{ type: Schema.ObjectId, ref: 'Course' }],
  age: { type: Number, min: 18, max: 90 },
  summary: { type: String, max: 250, trim: true, default: '' },
  photo: { type: String, default: '' },
  site: { type: String, default: '' },
  language: { type: String, enum: ['cs-CZ', 'de-DE', 'en-US', 'ru-RU', 'it-IT', 'fr-FR'], default: 'en-US' },
  competence: { type: String, max: 250, default: '' },
}, { collection: 'users', discriminatorKey: 'type' });

UserSchema.virtual('name').get(function () {
  return this.fname + ' ' + this.lname
})

module.exports = mongoose.model('User', UserSchema);