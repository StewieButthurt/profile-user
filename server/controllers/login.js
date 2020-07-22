const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { get } = require('./db.js')


module.exports.login = async(req, res) => {
    console.log(req.body.login)
    console.log(req.body.password)
    if (typeof(req.body.login) === 'string' &&
        typeof(req.body.password) === 'string'
    ) {

        var data = get

        console.log(data)
    }
}