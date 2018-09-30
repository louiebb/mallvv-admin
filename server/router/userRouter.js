var user = require('../js/user.js');

module.exports = {
  User: function (app) {
    var bodyParser = require('body-parser');
    // app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.get("/userlist", function (req, res) {
       var obj = {
         where: JSON.parse(req.query.where),
         pageNo: req.query.pageNo,
         qty: req.query.qty,
       };
       user.pageselect(obj, function (result) {
         res.end(result);
       });
    });
    app.post("/list", function (req, res) {

    });
  }
}
