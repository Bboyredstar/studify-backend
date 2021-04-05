const User = require('../schemas/User')
const Teacher = require('../schemas/Teacher')
const { v4: uuidv4 } = require('uuid');
const { json } = require('body-parser');

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json({ users })
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: error })
  }
}

const createUser = async (req, res) => {
  const newUser = new User(newUser)
  console.log(user)
  try {
    await newUser.save()
    return res.status(201).json(newUser)
  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: error })
  }
}

const createTeacher = async (req, res) => {
  const { fname, lname, email, password } = req.body
  try {
    const teacher = new Teacher({ id: uuidv4(), fname, lname, email, password })
    await teacher.save().then(teacher => console.log(createTeacher))

    return res.status(201).json(teacher.__t)
  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: JSON.stringify(error) })
  }
}

module.exports = { getUsers, createUser, createTeacher }

