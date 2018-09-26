var mysql = require("mysql");
let apiResult = require('../modules/ApiResult.js');
// 创建连接对象
var conn = mysql.createConnection({
	"host": "localhost",
	"port": "3306",
	"user": "root",
	"password": "root",
	"database": "mallvv"
});
// 连接，mysql服务记得启动
conn.connect();

module.exports = function(sql,cb){
    conn.query(sql, function(err, result){
        if(err){
            cb(apiResult(false,null,error));
            return false;
        }
        cb(apiResult(true,result,null));
    })
}
