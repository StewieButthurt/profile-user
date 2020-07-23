const { Router } = require('express')
const passport = require('passport')
const { login } = require('../controllers/login.js')
const router = Router()
const rateLimit = require("express-rate-limit")


const AuthLimiter = rateLimit({
    windowMs: 10 * 60 * 100, // 10 sec
    max: 5, // start blocking after 5 requests
    message: "Too many authorization attempts, try again in an 5 min",
    skipSuccessfulRequests: true
});

// /api/auth/token
router.get(
    '/token',
    passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.status(200).json({ message: 'Token true' })
    }
)


// /api/auth/
router.post(
    '/',
    AuthLimiter,
    login
)

module.exports = router