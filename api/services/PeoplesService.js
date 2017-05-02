
var fs = require('fs');
var path = require('path');

module.exports = {
    get: function (request, response) {
            var stream = fs.createReadStream(path.join(__dirname, '../data/peoples.json'), 'utf8');

            stream.on('error', function (error) {
                response.status(500).send({ msg: error.message });
            })

            stream.pipe(response);
    }
}