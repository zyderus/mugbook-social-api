import express from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
const router = express.Router()

router.get('/', (req, res) => res.send('User auth here'))

// REGISTRATION
router.post('/register', async (req, res) => {
  try {
    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })

    // Save user and respond
    const user = await newUser.save()
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).json('User not found!')

    const validPassword = await bcrypt.compare(req.body.password, user!.password)
    if (!validPassword) return res.status(400).json('Password is incorrect')

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

export default router
