const { Strategy, ExtractJwt } = require('passport-jwt');
const { get } = require('../controllers/db.js')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // обычно данный ключ задается через окружение
    // и светить его в коде является плохой практикой
    // но чтобы была возможность развернуть проект локально
    // я напишу его здесь
    secretOrKey: 'jwt-key-user-profile'
}

module.exports = new Strategy(options, async(payload, done) => {
    try {
        get(data => {
            data.profile.every((element, index) => {
                if (element.username === payload.login) {
                    done(null, element.username)
                    return false
                } else {
                    if (data.profile.length - 1 === index) {
                        done(null, false)
                        return false
                    }
                    return true
                }
            })
        })
    } catch (e) {
        console.error(e)
    }
})