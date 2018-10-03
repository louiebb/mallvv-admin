<template>
  <div class="userList">
    <el-form :inline="true" :model="formInline" label-width="40px" size="mini" style="height:90px;">
      <el-form-item label="账号" prop="account">
        <el-input size="mini" placeholder="请输入" v-model="formInline.account"></el-input>
      </el-form-item>
      <el-form-item size="mini" label="别名" prop="nickname">
        <el-input size="mini" placeholder="请输入" v-model="formInline.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input size="mini" placeholder="请输入" v-model="formInline.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input size="mini" placeholder="请输入" v-model="formInline.email"></el-input>
      </el-form-item>
      <user-role  @setUserRoleType="setUserRoleType" :currobj="{value:formInline.role,type:'show',width:formLabelWidth,title:'角色'}"></user-role>
      <el-form-item>
        <el-button size="mini" type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form size="mini">
      <el-form-item>
      <el-button type="info" @click="handleSelectDelete">删除选中</el-button>
      <el-button type="info" @click="addOpend()">添加</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-table :data="data.tableData" border max-height="450" style="width: 100% padding-top:20px;" :default-sort="{prop: 'id', order: 'descending'}"> 根据id倒叙 -->
    <el-table :data="data.tableData" border max-height="450" @selection-change="changeFun">
      <el-table-column type="selection" >
      </el-table-column>
      <el-table-column fixed header-align="center"  show-overflow-tooltip resizable align="center" type="index" width="50"></el-table-column>
      <el-table-column  prop="id" label="ID" >
      </el-table-column>
      <el-table-column prop="nickname" label="别名">
      </el-table-column>
      <el-table-column prop="account" label="账号">
      </el-table-column>
      <el-table-column prop="phone" label="手机" width="120" >
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="role" label="角色" >
        <template slot-scope="scope">
          <span>{{userRoleData[scope.row.role]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据库时间" width="160" >
        <template slot-scope="scope">
          <span>{{scope.row.regtime|dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="加入时间" width="160" >
          <template slot-scope="scope">
          <span>{{scope.row.jointime|dateFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column   label="状态" >
        <template slot-scope="scope">
          <span>{{scope.row.state?'启用':'禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChangePage" :current-page="pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="qty" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>


    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off"></el-input>
        </el-form-item> -->
         <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <user-role  @setUserRoleType="setFormUserRole" :currobj="{value:form.role,type:'unshow',width:formLabelWidth,title:'角色'}"></user-role>
        <el-form-item label="加入日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.jointime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
         <el-form-item label="状态">
          <el-switch v-model="form.state"></el-switch>
          {{form.state?'启用':'禁用'}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="!dialogStatus" @click="handleUpdate(form)">确 定</el-button>
        <el-button type="primary" v-if="dialogStatus" @click="handleAdd(form)">添 加</el-button>
      </div>
    </el-dialog>
    <div>{{userRoleData}}</div>
  </div>
</template>

<script>
  import UserRole from '../common/userdropdown';
export default {
  name: 'userList',
  filters:{
    dateFormat:function(val) {
      return (new Date(val)).toFormat("YYYY-MM-DD HH24:MI:SS")
    }
  },
  components:{
    UserRole
  },
   methods: {
    setUserRoleType(val){
       this.formInline.role = val;
     },
    setFormUserRole(val){
      this.form.role = val;
     },
     //多选
    changeFun(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
     //分页
    handleSizeChange(val) {
      this.qty = val;
      console.log(`每页 ${val} 条`,this.qty);
      this.getuserData();
    },
    handleCurrentChangePage(val) {
      this.pageNo = val;
      console.log(`当前页: ${val}`,this.pageNo);
      this.getuserData();
    },
      //编辑操作
    handleEdit(index, row) {
      this.dialogStatus = false;
      row.state = row.state ? true:false;
      this.form = row;
      // 排序后此法不行，索引会倒过来
      // this.data.tableData[index].state = this.data.tableData[index].state ? true:false;
      // this.form =this.data.tableData[index];
      this.currentIndex = index
      this.dialogFormVisible = true
    },
     handleUpdate(data) {
      this.update(data).then(x=>{
        if(x.status){
          this.dialogFormVisible = false;
          this.$swal(
              '修改成功',
              '',
              'success'
            )
        }else{
           this.$swal(
              '修改失败',
              '请再次尝试修改',
              'error'
            )
        }
      })
    },
    handleDelete(index, row) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      swalWithBootstrapButtons({
        title: 'Are you sure?',
        text: "You will delete this shop!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          let id = this.data.tableData[index].id;
          this.delete(id).then(x=>{
            this.data.tableData.splice(index, 1);
            this.getuserData();
          });
          swalWithBootstrapButtons(
            'Deleted!',
            'Shop has been deleted.',
            'success'
          )
        } else if (
          // Read more about handling dismissals
          result.dismiss === this.$swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelled',
            'Your delete  is cancel :)',
            'error'
          )
        }
      });
    },
    handleSelectDelete(){
      //存放id的数据
      let idArrs = [];
      //选中的行数据
      let dataArrs = this.multipleSelection;
      //判断是否有选中的行
      if (!dataArrs.length) {
        this.$swal('删除失败','请选择要删除的行','error');
        return false;
      }
      //获取id放入数组
      dataArrs.forEach(x=>{
          idArrs.push(x.id);
      });
      //id数组中有itme就遍历执行删除函数
      if (idArrs.length) {
        idArrs.forEach(id=>{
            this.delete(id).then(x=>{
            //删除成功后重新获取数据
            this.getuserData();
          });
        })
      }
    },
    handleAdd(data){
      this.add(data).then(x=>{
        if(x.status){
          this.dialogFormVisible = false;
          this.getuserData();
          this.$swal(
              '添加成功',
              '',
              'success'
            );
        }else{
           this.$swal(
              '添加失败',
              '请再次尝试修改',
              'error'
            )
        }
      })
    },
    addOpend(){
      this.dialogStatus = true;
      this.form = {
        account:'',
        email:'',
        nickname:'',
        password:'',
        phone:'',
        jointime:Date.now(),
        role:'',
        state:false,
      }
      this.dialogFormVisible = true
    },
    add(data){
      data.jointime = (new Date(data.jointime)).toFormat("YYYY-MM-DD HH24:MI:SS");
      data.state = data.state?1:0;

      let promise = new Promise((resolve,reject)=>{
        this.$axios.post('/api/userAdd',{
          values:data,
        }).then((result) => {
          if(result.data&&result.data.status){
            resolve(result.data);
          }
        }).catch((err) => {
          console.log('delete',err);
        });
      })
      return promise;
    },
    cancel() {
      this.dialogFormVisible = false
    },
    update(data){
      console.log(11111,data);
       let promise = new Promise((resolve,reject)=>{
        this.$axios.post('/api/userupdatebyid',{
          where:{f:'id',o:'=',v:data.id},
          values:data,
        }).then((result) => {
          if(result.data&&result.data.status){
            resolve(result.data);
          }
        }).catch((err) => {
          console.log('delete',err);
        });
      })
      return promise;
    },
    getuserData(){
      let where =  [{f:'account',o:'like',v:'%%'}];
      where = JSON.stringify(where);
      this.$axios.get(encodeURI(`api/userlist?pageNo=${this.pageNo}&qty=${this.qty}&where=${where}`)).then(x=>{
          if(x.data&&x.data.status){
            this.data.sourceData = x.data.data;
            this.data.tableData = this.data.sourceData.data;
            this.total = this.data.sourceData.total;
          }
      }).catch(x=>console.log(x));
    },
    delete(id){
      let promise = new Promise((resolve,reject)=>{
        this.$axios.post('/api/userdeletebyid',{
          where:{f:'id',o:'=',v:id}
        }).then((result) => {
          if(result.data&&result.data.status){
            resolve(result.data);
          }
        }).catch((err) => {
          console.log('delete',err);
        });
      })
      return promise;
    },
  },
  computed:{
    userRoleData:{
      get(){
        return this.$store.state.user.userRole.formate;
      },
      set(){}
    }
  },
  data() {
      return {
        //分页
        pageNo:1,
        qty:5,
        total:0,
        //dialog
        dialogFormVisible: false,
        formLabelWidth:'80px',
        currentIndex: '',
        dialogStatus:true,
        //数据
        form: {},
        data:{
        tableData: [],
        sourceData:{}
        },
        //搜索
        formInline: {
          nickname: '',
          role: '全部',
          phone:'',
          email:'',
          account:'',
        },
        //删除多个
        multipleSelection:[]
      }
  },
  created(){
      this.getuserData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.userList {
  line-height: 1em;
  text-align: center;
  .el-form-item--mini.el-form-item{
    margin-bottom: 10px;
  }
}
</style>
