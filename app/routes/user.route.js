const router = require('express').Router()
const { get_users } = require('../controllers/user.controller.js')

// GET all workouts
router.get('/', get_users)

// GET a single user
router.get('/:id', get_user)

// POST a new user
router.post('/', create_user)

// DELETE a user
router.delete('/:id', delete_user)

// UPDATE a user
router.put('/:id', update_user)