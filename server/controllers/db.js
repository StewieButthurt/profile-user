const fs = require('fs')

module.exports.get = async(req, res) => {

    var obj;

    fs.readFile('../db.json', 'utf8', function(err, data) {
        if (err) {
            throw err
        }

        obj = JSON.parse(data)
    })

    return obj

}