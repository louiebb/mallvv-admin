var shop = require('../js/shop.js');

module.exports = {
  Shop: function (app) {
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    //注册路由
    app.post("/shoplist", function (req, res) {
      var obj = {
        where: req.body.where,
        pageNo: req.body.pageNo,
        qty: req.body.qty,
      };
      shop.pageselect(obj, function (result) {
        res.end(result);
      });
    });

    app.post("/shopdeletebyid", function (req, res) {
      var obj = {
        where: req.body.where,
      };
      shop.deletebyid(obj, function (result) {
        res.end(result);
      });
    });

    app.post("/shopupdatebyid", function (req, res) {
      var obj = {
        values: req.body.values,
        where: req.body.where,
      };
      shop.updatebyid(obj, function (result) {
        res.end(result);
      });
    });

    //classfiy
    app.post("/shopAllClassify", function (req, res) {
      var obj = {
        where: req.body.where,
      };
      shop.selectallclassfiy(obj, function (result) {
        res.end(result);
      });
    });
    app.post("/shopClassify", function (req, res) {
      var obj = {
        where: req.body.where,
        pageNo: req.body.pageNo,
        qty: req.body.qty,
      };
      shop.selectclassfiy(obj, function (result) {
        res.end(result);
      });
    });

    app.post("/classfiyUpdateById", function (req, res) {
      var obj = {
        values: req.body.values,
        where: req.body.where,
      };
      shop.classfiyupdatebyid(obj, function (result) {
        res.end(result);
      });
    });

    app.post("/classfiyDeleteById", function (req, res) {
      var obj = {
        where: req.body.where,
      };
      shop.classfiydeletebyid(obj, function (result) {
        res.end(result);
      });
    });

    app.post("/classfiyAdd", function (req, res) {
      var obj = {
        values: req.body.values,
      };
      shop.classfiyadd(obj, function (result) {
        res.end(result);
      });
    });
  },
  User: function (app) {
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded());
    app.get("/userlist", function (req, res) {
      var obj = {
        where: req.body.where,
      }
      user.select(obj, function (result) {
        res.end(result);
      });
    });
    app.post("/list", function (req, res) {

    });
  }
}
