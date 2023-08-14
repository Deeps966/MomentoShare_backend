const router = require('express').Router()
const { get_users, create_user, delete_user, update_user, get_user, delete_all_users } = require('../controllers/user.controller.js')

// GET all users
router.get('/', get_users)

// GET a single user
router.get('/:id', get_user)

// POST a new user
router.post('/', create_user)

// DELETE all users
router.delete('/delete-all', delete_all_users)

// DELETE a user
router.delete('/:id', delete_user)

// UPDATE a user
router.patch('/:id', update_user)

module.exports = router