const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// router.get('/login', ensureGuest, (req ,res) => {
//     res.redirect('/')
// })

// router.get('/', ensureAuth, (req, res) => {
//     res.send('dashboard '+req.user.displayName)
// })

module.exports = router