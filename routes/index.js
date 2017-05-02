
var homeController = require("../api/controllers/PeoplesController");

module.exports = {
    init: function (app) {
        app.get('/', function (req, res) {
            res.render('index');
        }),
        app.get('/peoples', homeController.get);
    }
}


