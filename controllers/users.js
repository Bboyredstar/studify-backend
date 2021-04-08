const User = require('../schemas/User')
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

const getUser = async (req, res) => {
  try {
    console.log(req.params);
    await User.findOne({ id: req.params.userId }, function (err, item) {
      if (err) {
        return res.status(404).json({ message: 'User not found' })
      }
      return res.status(200).json({ user: item })
    })
  } catch (error) {
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
    return res.status(400).json({ message: error })
  }
}

const updateUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(401).json({ message: 'Access denied' })
    }
    const info = req.body
    if (info) {
      return res.status(400).json({ message: 'Bad parameters' })
    }
    const user = await User.findOne({ id: req.params.id })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    await user.updateOne({ ...info }, function (err) {
      console.log(err);
    })
    return res.status(200).json({ message: 'Updating success' })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Updating error' })
  }
}

const deleteUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(401).json({ message: 'Access denied' })
    }
    const user = await User.deleteOne({ id: req.params.id })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'Deleting success' })

  } catch (error) {
    return res.status(500).json({ message: 'Deleting error' })
  }
}




module.exports = { getUsers, createUser, updateUser, getUser }

