let db = require('../sql/mysqlDB.js');

//路由映射表
//路由映射规则

let usertable = 't_user';

let userBusiness = {
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
    pageselect:function(data,callback){
       let condition = 'and' + data.where.map(x => ` ${x.f} ${x.o} '${x.v}' `).join('and');
       let sql = `select * from ${usertable} where 1=1 ${condition} limit ${(data.pageNo-1)*data.qty} , ${data.qty}`;
       let sql2 = `select count(*) as total  from ${usertable} where 1=1 ${condition}`;
       db.pageselect(sql, sql2, function (res) {
         callback(res);
       })
    }
}

module.exports = userBusiness ;
