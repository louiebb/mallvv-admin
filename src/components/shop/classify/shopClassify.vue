<template>
  <div class="shopClassify">

    <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-button size="small" type="primary" @click="addOpen">新增</el-button>
    </el-menu>

    <el-table class="table tb-edit" border :data="tableData" style="width: 100%;" highlight-current-row>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" type="selection" width="55">
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" type="index" width="50"></el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" width="50" label="ID">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" label="商品名称">
        <template slot-scope="scope"><span>{{ scope.row.name }}</span></template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" width="100" label="父级">
        <template slot-scope="scope">{{ parentData.formate[scope.row.parent] }}</template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" width="100" label="类型编码">
        <template slot-scope="scope">{{ scope.row.type }}</template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" width="100" label="地址">
        <template slot-scope="scope">{{ scope.row.url }}</template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChangePage" :current-page="pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="qty" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <el-dialog title="分类信息" :visible.sync="dialogFormVisible" class="dialog">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类编码" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.type" auto-complete="off"></el-input>
        </el-form-item>
        <shop-type :currobj="{value:form.parent,width:formLabelWidth,title:'父级'}"></shop-type>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="!dialogStatus" @click="handleUpdate(form)">确 定</el-button>
        <el-button type="primary" v-if="dialogStatus" @click="handleAdd(form)">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ShopType from "../common/shopType";

export default {
  name: 'shopClassify',
  data () {
    return {
      page: 'shopClassify',
      pageNo:1,
      qty:5,
      total:0,
      tableData:[],
      datas:{},
      pData:{
        source:[],
        formate:{}
      },
      formInline: {
          name: '',
          type: ''
      },
      //dialog
      dialogFormVisible: false,
      form: {},
      formLabelWidth:'80px',
      currentIndex: '',
      dialogStatus:true
    }
  },
  computed:{
    parentData:{
      get(){
        return this.pData;
      },
      set(val){
        this.pData = val
      }
    }
  },
  components:{
    ShopType
  },
  methods:{
    onSubmit() {
      console.log('submit!');
    },
    getParentData(){
      this.$axios.post('/api/shopAllClassify',{
        where:{f:'1',o:'=',v:'1',t:'2'}
        }).then((result) => {
          console.log(result);
          if(result.data&&result.data.status){
            this.pData.source = result.data.data ;
            let obj = this.pData.source;
            let currentobj = {};
            obj.forEach(x=> currentobj[x.type] = x.name);
            this.pData.formate = currentobj;
            console.log(this.pData);
          }
        }).catch((err) => {
          console.log('getData',err);
      });
    },
    getData(){
      this.$axios.post('/api/shopClassify',{
        pageNo:this.pageNo,
        qty:this.qty,
        where:[{f:'1',o:'=',v:'1',}]
        }).then((result) => {
          if(result.data&&result.data.status){
            this.datas = result.data.data ;
            this.tableData = this.datas.data;
            this.total =  this.datas.total;
          }
        }).catch((err) => {
          console.log('getData',err);
        });
    },
    //分页
    handleSizeChange(val) {
      this.qty = val;
      console.log(`每页 ${val} 条`,this.qty);
      this.getData();
    },
    handleCurrentChangePage(val) {
      this.pageNo = val;
      console.log(`当前页: ${val}`,this.pageNo);
      this.getData();
    },
    //行修改
    handleCurrentChange(row, event, column) {
        console.log(row, event, column, event.currentTarget)
    },
    handleEdit(index, row) {
        this.dialogStatus = false;
        this.form = this.tableData[index];
        this.currentIndex = index;
        this.dialogFormVisible = true;
    },
    addOpen() {
      this.dialogStatus = true;
      this.form = {name:'',parent:'',type:'',url:''};
      this.dialogFormVisible = true
    },
    add(data){
      let promise = new Promise((resolve,reject)=>{
        this.$axios.post('/api/classfiyAdd',{
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
      this.dialogFormVisible = false;
    },
    delete(id){
      let promise = new Promise((resolve,reject)=>{
        this.$axios.post('/api/classfiyDeleteById',{
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
    update(data){
       let promise = new Promise((resolve,reject)=>{
        this.$axios.post('/api/classfiyUpdateById',{
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
    handleAdd(data){
      this.add(data).then(x=>{
        if(x.status){
          this.dialogFormVisible = false;
          this.$swal(
              '添加成功',
              '',
              'success'
            )
        }else{
           this.$swal(
              '添加失败',
              '请再次尝试修改',
              'error'
            )
        }
      })
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
        let id = this.tableData[index].id;
        this.delete(id).then(x=>{
          this.tableData.splice(index, 1);
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
},
  created(){
    this.getData();
    this.getParentData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.shopClassify {
  * {
    line-height: 1em;
  }
}
</style>
