const User = require('../models/user.model')
const mongoose = require('mongoose')

// Getting All Users
const get_users = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

// Getting One User
const get_user = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such user' })
    }

    let user = await User.findById(id)

    if (user == null) {
      return res.status(404).json({ error: 'Cannot find user' })
    }

    res.json(user)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

// Creating One New User
const create_user = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    res.status(201).json(newUser)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

// Deleting One User
const delete_user = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such user' })
    }

    const user = await User.deleteOne({ _id: id })

    if (!user) {
      return res.status(400).json({ error: 'No such user' })
    }

    res.status(200).json(user)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

// Updating One User
const update_user = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such user' })
    }

    // `new: true` The method returns the updated document after applying the update operation.
    const user = await User.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true, runValidators: true })

    if (!user) {
      return res.status(400).json({ error: 'No such user' })
    }

    res.status(200).json(user)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

// Deleting All Users
const delete_all_users = async (req, res) => {
  try {
    const users = await User.deleteMany()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

module.exports = {
  get_users,
  get_user,
  create_user,
  delete_user,
  update_user,
  delete_all_users
}