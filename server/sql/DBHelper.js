let conn = require('./mongoconn.js');
// console.log('db---------------------->',db);
let apiResult = require('../modules/ApiResult.js');


let DB = {
    insert:function(table,data,callback){
        //操作数据库 
        //备注：操作数据库为异步的，所以不能直接return
        conn(function(error,db){
            if(error){
                callback(apiResult(false,null,error));
                return false;
            }
            // 往数据库中写入数据
            data = Object.assign(data,{regtime:new Date(),logintime:new Date()});	
            // console.log(data);
            db.collection(table).insertOne( data, (err, result)=>{
                if(err){
                    callback(apiResult(false,null,err));
                    return false;
                }
                callback(apiResult(true,result,null));
            });
        });
    },
    find:function(table,where,callback){
        conn(function(error,db){
            if(error){
                callback(apiResult(false,null,error));
                return false;
            }
            // console.log('where:',JSON.stringify(where));
            db.collection(table).find(where).toArray((err, result)=>{
                if(err){
                    callback(apiResult(false,null,error));
                    return false;
                }
                callback(apiResult(true,result,null));
            } );
        });
    },
    delete:function(collection,data,callback){},
    update:function(collection,data,callback){}
}
module.exports = DB;