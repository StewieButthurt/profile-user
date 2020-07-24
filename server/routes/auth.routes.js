const { Router } = require('express')
const passport = require('passport')
const { login } = require('../controllers/login.js')
const router = Router()
const rateLimit = require("express-rate-limit")
const db = require('../controllers/db.js')


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
        db.get(data => {
            data.profile.every((element, index) => {
                if (element.username === req.user) {
                    res.json({
                        profile: {
                            username: element.username,
                            name: element.name,
                            surname: element.surname,
                            email: element.email,
                            photo: element.photo
                        }
                    })
                    return false
                } else {
                    if (data.profile.length - 1 === index) {
                        res.status(500).json('Profile not found')
                        return false
                    }
                    return true
                }
            })
        })
    })


// /api/auth/
router.post(
    '/',
    AuthLimiter,
    login
)

module.exports = router