const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { get } = require('./db.js')

// обработка запроса на авторизацию
module.exports.login = async(req, res) => {
    // валидация данных
    if (typeof(req.body.login) === 'string' &&
        typeof(req.body.password) === 'string'
    ) {

        // получаем db.json и ищем пользователя
        get(data => {
            data.profile.every((element, index) => {

                // ищем логин
                if (element.username === req.body.login) {

                    // проверяем пароль
                    const isPasswordCorrect = bcrypt.compareSync(req.body.password, element.password)

                    if (isPasswordCorrect) {
                        // формируем токен и отправляем клиенту
                        const token = jwt.sign({
                            login: element.username,
                            userId: element.id
                        }, 'jwt-key-user-profile', { expiresIn: 60 * 60 })
                        res.json({
                            token: token
                        })
                        return false
                    } else {
                        // ошибка с паролем
                        res.status(402).json({
                            message: 'The data you entered is not correct'
                        })
                        return false
                    }
                } else {
                    if (data.profile.length - 1 === index) {
                        // ошибка с логином
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