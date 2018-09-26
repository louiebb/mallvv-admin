let db = require('../sql/mysqlDB.js');

//路由映射表
//路由映射规则

let business = {
    select:function(data,callback){
        db.pageselect("t_shop",data,function(res){
            callback(res);
        })
    }
}
module.exports = business ;
