let db = require('../sql/mysqlDB.js');

//路由映射表
//路由映射规则

let shoptable = 't_shop';
let typetable3 = 't_type_three';
let typetable2 = 't_type_two';
let business = {
  pageselect: function (data, callback) {
    let condition = 'and' + data.where.map(x => ` ${x.f} ${x.o} '${x.v}' `).join('and');
    let sql = `select * from ${shoptable} where 1=1 ${condition} limit ${(data.pageNo-1)*data.qty} , ${data.qty}`;
    let sql2 = `select count(*) as total  from ${shoptable} where 1=1 ${condition}`;
    console.log(sql);
    db.pageselect(sql, sql2, function (res) {
      callback(res);
    })
  },
  select: function (data, callback) {
    let condition = 'and' + data.where.map(x => ` ${x.f} ${x.o} '${x.v}' `).join('and');
    let sql = `select * from ${shoptable} where 1=1 ${condition}`;
    db.select(sql, function (res) {
      callback(res);
    })
  },
  deletebyid: function (data, callback) {
    let where = data.where;
    let condition = `${where.f} ${where.o} '${where.v}' `;
    let sql = `delete from ${shoptable} where ${condition}`;

    db.delete(sql, function (res) {
      callback(res);
    })
  },
  updatebyid: function (data, callback) {
    let valarr = [];
    let currdata = data.values;
    for (let key in currdata) {
      valarr.push({
        f: key,
        v: currdata[key]
      });
    }
    let condition = valarr.map(x => ` ${x.f} = '${x.v}' `).join(',');
    let sql = `update ${shoptable} set ${condition} where ${data.where.f} ${data.where.o} '${data.where.v}'`;
    db.update(sql, function (res) {
      callback(res);
    })
  },

  selectallclassfiy: function (data, callback) {
    let where = data.where;
    let condition = `${where.f} ${where.o} '${where.v}' `;
    let sql = '';

    if (where.t == '3') {
      sql = `select id,name,type  from ${typetable3} where  ${condition}`;
    } else if (where.t == '2') {
      sql = `select id,name,type  from ${typetable2} where  ${condition}`;
    }
    db.select(sql, function (res) {
      callback(res);
    })
  },
  selectclassfiy: function (data, callback) {
    let condition = 'and' + data.where.map(x => ` ${x.f} ${x.o} '${x.v}' `).join('and');
    let sql = `select * from ${typetable3} where 1=1 ${condition} limit ${(data.pageNo-1)*data.qty} , ${data.qty}`;
    let sql2 = `select count(*) as total  from ${typetable3} where 1=1 ${condition}`;
    db.pageselect(sql, sql2, function (res) {
      callback(res);
    })
  },
  classfiyupdatebyid: function (data, callback) {
    let valarr = [];
    let currdata = data.values;
    for (let key in currdata) {
      valarr.push({
        f: key,
        v: currdata[key]
      });
    }
    let condition = valarr.map(x => ` ${x.f} = '${x.v}' `).join(',');
    let sql = `update ${typetable3} set ${condition} where ${data.where.f} ${data.where.o} '${data.where.v}'`;
    db.update(sql, function (res) {
      callback(res);
    })
  },
  classfiydeletebyid: function (data, callback) {
    let where = data.where;
    let condition = `${where.f} ${where.o} '${where.v}' `;
    let sql = `delete from ${typetable3} where ${condition}`;
    db.delete(sql, function (res) {
      callback(res);
    })
  },
  classfiyadd: function (data, callback) {
    let values = data.values;
    let farr = [];
    let varr = [];
    for (let key in values) {
      farr.push(key);
      varr.push(`'${values[key]}'`);
    }
    farr = farr.join(',');
    varr = varr.join(',');
    let sql = `INSERT INTO ${typetable3} (${farr}) VALUE (${varr})`;
    console.log(sql);
    db.delete(sql, function (res) {
      callback(res);
    })
  },
}
module.exports = business;
