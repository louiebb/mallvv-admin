let conn = require('./mysqlconn.js');
// console.log('db---------------------->',db);
let apiResult = require('../modules/ApiResult.js');
let async = require('async');

let DB = {
    insert:function(table,data,callback){
        //操作数据库
        let fields =[];
        let values =[];
        data.forEach(x=>{
            fields.push = x.f;
            values.push = x.v;
        });
        fields = fields.join(',');
        values = fields.join(',');
        let sql = `insert into ${table} (${fields}) values (${values})`;
        conn(sql,callback);
    },
    pageselect:function(sql,sql2,callback){
        async.series({
          total:function(cb){
            conn(sql2).then(x=>{
              let total = 0;
              if(x[0]){
                total = x[0].total;
              }
              cb(null,total);
            });
          },
          data: function(cb){
            conn(sql).then(x=>{
              cb(null,x);
            });
          }
        }, function(err, results){
            if(err){
              callback(apiResult(false,null,err));
              return false;
            }
            callback(apiResult(true,results,null));
        });
    },
    select:function(sql,callback){
        conn(sql,callback);
    },
    delete:function(sql,callback){
        conn(sql).then(x=>{
          callback(apiResult(true,x,null));
        });
    },
    update:function(sql,callback){
      conn(sql).then(x=>{
         callback(apiResult(true,x,null));
      });
  }
}
module.exports = DB;
