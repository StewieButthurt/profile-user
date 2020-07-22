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
        var data = get;

        console.log(data)
            // data.forEach(element => {
            //     if (element.username === payload.username) {
            //         done(null, candidate)
            //     } else {
            //         done(null, false)
            //     }
            // });
    } catch (e) {
        console.error(e)
    }
})