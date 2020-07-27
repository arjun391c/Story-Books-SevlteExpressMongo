const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/google', passport.authenticate('google', {scope: ['profile']}),(req, res) => {
    res.redirect('/')
})

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login' }), (req, res) => {
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})

router.get('/current_user', (req, res) => {
    res.send(req.user)
})
module.exports = router