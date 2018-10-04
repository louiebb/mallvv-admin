let db = require('../sql/mysqlDB.js');
let async = require('async');
let dateutils =  require('date-utils');

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
      //  console.log(sql);

       let sql2 = `select count(*) as total  from ${usertable} where 1=1 ${condition}`;
       db.pageselect(sql, sql2, function (res) {
         callback(res);
       })
    },
    deletebyid: function (data, callback) {
         let where = data.where;
         let condition = `${where.f} ${where.o} '${where.v}' `;
         let sql = `delete from ${usertable} where ${condition}`;
         db.common(sql, function (res) {
           callback(res);
         });
    },
    deleteSelect: (data, callback) => {
      let idarr = JSON.parse(data.where);
      let doarr = [];
      //如何保证每一个都删除了
      idarr.forEach(x=>{
        doarr.push(function(callback) {
          callback(null, deleteid(x,function(params) {
              return params;
          }))
        });
      })
      async.parallel(doarr, function (err, results) {
        console.log("err:", err);
        console.log("results", results);
      });
    },
    deleteid(id,cb){
      let sql = `delete from ${usertable} where id = ${id}`;
      db.common(sql, function (res) {
        cb(res);
      });
    },
    updatebyid: function (data, callback) {
      let valarr = [];
      let currdata = data.values;
      currdata.state = currdata.state ? 1 : 0;
      currdata.jointime = (new Date(currdata.jointime)).toFormat("YYYY-MM-DD HH24:MI:SS");
      delete currdata.regtime;
      for (let key in currdata) {
        valarr.push({
          f: key,
          v: currdata[key]
        });
      }
      let condition = valarr.map(x => ` ${x.f} = '${x.v}' `).join(',');
      let sql = `update ${usertable} set ${condition} where ${data.where.f} ${data.where.o} '${data.where.v}'`;
      console.log(1111,sql);

      db.common(sql, function (res) {
        callback(res);
      })
    },
    add: function (data, callback) {
      let values = data.values;
      let farr = [];
      let varr = [];
      for (let key in values) {
        farr.push(key);
        varr.push(`'${values[key]}'`);
      }
      farr = farr.join(',');
      varr = varr.join(',');
      let sql = `INSERT INTO ${usertable} (${farr}) VALUE (${varr})`;
      db.common(sql, function (res) {
        callback(res);
      });
    },
    userrole(cb){
      let sql = `select * from t_role `;
      db.common(sql, function (res) {
        cb(res);
      });
    }
}

module.exports = userBusiness ;
