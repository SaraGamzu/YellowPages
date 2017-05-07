
var path = require('path');
var peoplesController = require("../api/controllers/peoplesController");

module.exports = {
    init: function (app) {
        app.get('/', function (req, res) {
            res.render('index');
        }),
            app.get('/peoples', peoplesController.get);
    }
}


