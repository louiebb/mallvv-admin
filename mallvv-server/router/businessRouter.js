
var shop = require('../js/shop.js');

module.exports = {
    Shop:function(app){
        var bodyParser = require('body-parser');
        app.use(bodyParser.json());
        //注册路由
        app.post("/shoplist", function(req, res){
            var obj = {
                where:req.body.where,
                pageNo:req.body.pageNo,
                qty:req.body.qty,
            }; 
            shop.select(obj,function(result){
                res.end(result);
            });
        });
    },
    User:function(app){
        var bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded());
        app.get("/userlist", function(req, res){
            var obj = {
                where:req.body.where,
            }
            user.select(obj,function(result){
                res.end(result);
            });
        });
        app.post("/list", function(req, res){

        });
    }
}