const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { get } = require('./db.js')


module.exports.login = async(req, res) => {
    if (typeof(req.body.login) === 'string' &&
        typeof(req.body.password) === 'string'
    ) {

        get(data => {
            data.profile.every((element, index) => {
                if (element.username === req.body.login) {
                    const isPasswordCorrect = bcrypt.compareSync(req.body.password, element.password)

                    if (isPasswordCorrect) {
                        const token = jwt.sign({
                            login: element.username,
                            userId: element.id
                        }, 'jwt-key-user-profile', { expiresIn: 60 * 60 })
                        res.json({ token })
                        return false
                    } else {

                        res.status(402).json({
                            message: 'The data you entered is not correct'
                        })
                        return false
                    }
                } else {
                    if (data.profile.length - 1 === index) {
                        res.status(402).json({
                            message: 'The data you entered is not correct'
                        })
                    }
                    return true
                }
            });
        })
    } else {
        res.status(500).json('Error server. Data did not pass verification')
    }
}