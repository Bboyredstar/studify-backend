const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true },
  fname: { type: String, required: true, max: 100 },
  lname: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100, unique: true },
  password: { type: String, required: true, min: 6 },
  courses: [{ type: Schema.ObjectId, ref: 'Course' }],
  favorite_courses: [{ type: Schema.ObjectId, ref: 'Course' }]
}, { collection: 'users', discriminatorKey: 'type' });

UserSchema.virtual('name').get(() => this.fname + ' ' + this.lname)


module.exports = mongoose.model('User', UserSchema);