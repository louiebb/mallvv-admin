let db = require('../sql/mysqlDB.js');

//路由映射表
//路由映射规则

let business = {
    register:function(data,callback){
        db.insert("userlist",data,function(result){
            callback(result);
        });
        //connect db
        //register
        //return result 
    },
    login:function(){
        //connect db
        //login
        //return result 
    },
    select:function(data,callback){
        db.select("userlist",data.where,function(res){
            callback(res);
        })
    }
}

module.exports = business ;
