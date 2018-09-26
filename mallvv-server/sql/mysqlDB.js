let conn = require('./mysqlconn.js');
// console.log('db---------------------->',db);
let apiResult = require('../modules/ApiResult.js');


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
    pageselect:function(table,where,callback){
        let  condition = 'and'+ where.where.map(x=> ` ${x.f} ${x.o} '${x.v}' `).join('and');
        let sql = `select * from ${table} where 1=1 ${condition} limit ${(where.pageNo-1)*where.qty} , ${where.qty}`;
        let sql2 = `select count(*) as total  from ${table} where 1=1 ${condition}`;
        
        //需要同步执行
        let total = 0;
        let data = {};
        conn(sql2,function(data){
            total = JSON.parse(data).data.total;
        });
        conn(sql,function(data){
            data = JSON.parse(data).data;
            
        });

        let result = {
            data,
            total
        }
        callback(apiResult(true,result,null));
    },
    select:function(table,where,callback){
        let  condition = 'and'+ where.where.map(x=> ` ${x.f} ${x.o} '${x.v}' `).join('and');
        let sql = `select * from ${table} where 1=1 ${condition}`;
        conn(sql,callback);
    },
    delete:function(collection,data,callback){},
    update:function(collection,data,callback){}
}
module.exports = DB;