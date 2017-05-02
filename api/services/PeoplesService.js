
var fs = require('fs');
var path = require('path');

module.exports = {
    get: function (request, response) {
        fs.readFile(path.join(__dirname, '../data/peoples.json'), 'utf8', function (error, data) {
            if (error) {
                response.status(500).send({msg: error.message});
            }
            response.send(data);
        });
    }
}

