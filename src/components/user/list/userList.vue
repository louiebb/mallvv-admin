<template>
  <div class="userList">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="height:50px;">
      <el-form-item label="登录名">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.region" placeholder="管理员">
            <el-option label="管理员1" value="shanghai"></el-option>
            <el-option label="管理员2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom:10px;">
      <el-button type="info" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      <el-button type="info">添加</el-button>
    </el-row>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="form.juese" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="加入日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.jointime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核状态" :label-width="formLabelWidth">
          <el-input v-model="form.zhuangtai" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" border max-height="450" style="width: 100% padding-top:20px;" :default-sort="{prop: 'id', order: 'descending'}">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column fixed prop="id" label="ID" width="120" sortable>
      </el-table-column>
      <el-table-column prop="name" label="登录名" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="手机" width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="160">
      </el-table-column>
      <el-table-column prop="juese" label="角色" width="100">
      </el-table-column>
      <el-table-column prop="jointime" label="加入时间" width="120" sortable>
      </el-table-column>
      <el-table-column prop="zhuangtai" label="审核状态" width="80">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'userList',
   methods: {
      //编辑操作
    handleEdit(index, row) {
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
      handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    cancel() {
      this.dialogFormVisible = false
    },
    update() {
      this.form.jointime = reformat(this.form.jointime)
      // this.form.id = reformat(this.form.id)
      // this.form.phone = reformat(this.form.phone)
      // this.tableData.push(this.form)
      this.dialogFormVisible = false
    }
    },
    computed:{

    },
    data() {
      return {
        dialogFormVisible: false,
        formLabelWidth: '80px',
        form: {},
        value6: '',
        currentPage3: 1,
        currentIndex: '',
          formInline: {
          user: '',
          region: '',
        },
        tableData: [{
          id:'1001',
          name: '王小虎',
          phone:'18824357892',
          email:'123@qq.com',
          juese: '管理员1',
          jointime: '2018-9-20',
          zhuangtai: '通过'
        }, {
          id:'1002',
          name: '王小虎',
          phone:'18824357892',
          email:'123@qq.com',
          juese: '管理员1',
          jointime: '2018-9-12',
          zhuangtai: '通过'
        },{
          id:'1003',
          name: '王小虎',
          phone:'18824357892',
          email:'123@qq.com',
          juese: '管理员1',
          jointime: '2018-9-30',
          zhuangtai: '通过'
        },{
          id:'1004',
          name: '王小虎',
          phone:'18824357892',
          email:'123@qq.com',
          juese: '管理员1',
          jointime: '2018-9-09',
          zhuangtai: '通过'
        },{
          id:'1005',
          name: '王小虎',
          phone:'18824357892',
          email:'123@qq.com',
          juese: '管理员1',
          jointime: '2018-9-03',
          zhuangtai: '通过'
        },{
          id:'1007',
          name: '王小虎',
          phone:'18824357892',
          email:'123@qq.com',
          juese: '管理员1',
          jointime: '2018-9-18',
          zhuangtai: '通过'
        }]
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .userList{
    line-height: 1em;
  }
</style>
