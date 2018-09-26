var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = function(callback){
    MongoClient.connect(url, function(error, database) {
        // 操作数据库的代码，必须写在里面
        var db = database.db("louieBB");
        callback(error,db);
        database.close();	// 关闭
    });
}
