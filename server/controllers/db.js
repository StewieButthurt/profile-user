const fs = require('fs')

module.exports.get = (callback) => {

    return fs.readFile('server/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err
        }

        callback(JSON.parse(data))
    })


}