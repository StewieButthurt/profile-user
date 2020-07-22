const { Router } = require('express')
const passport = require('passport')
const { login } = require('../controllers/login.js')
const router = Router()
const rateLimit = require("express-rate-limit")


const AuthLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 min
    max: 5, // start blocking after 5 requests
    message: "Too many authorization attempts, try again in an 5 min",
    skipSuccessfulRequests: true
});


// /api/auth/admin/login
router.post(
    '/admin/login',
    AuthLimiter,
    login
)

module.exports = router