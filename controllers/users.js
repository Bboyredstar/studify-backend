const User = require('../schemas/User')
const Teacher = require('../schemas/Teacher')


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


module.exports = getUsers