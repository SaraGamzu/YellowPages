var peoplesService = require("../services/PeoplesService");

module.exports = {
    get: function (req, res) {
            peoplesService.get(req, res);
    }
}
