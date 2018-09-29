<template>
  <div class="shopList">

    <el-form :inline="true" :model="formInline" class="nav demo-form-inline">
      <el-form-item>
        <el-button size="small" type="primary" @click="add">新增</el-button>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input clearable v-model="formInline.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <shop-type @setShopClassgiy="setShopClassgiy" :currobj="{table:'3',value:formInline.type,type:'show',width:formLabelWidth,title:'商品分类'}"></shop-type>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSearch"><i class="el-icon-search"></i></el-button>
      </el-form-item>
    </el-form>

    <el-table class="table tb-edit" border :data="tableData" style="width: 100%;" highlight-current-row>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" type="selection" width="55">
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" type="index" width="50"></el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" width="50" label="ID">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" label="商品分类" width="80">
        <template slot-scope="scope">
          <span>{{ classfiyData.formate[scope.row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" label="商品名称" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" label="库存" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.stock }}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" label="价格" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" label="折扣" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.discount }}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" label="备注" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop show-overflow-tooltip resizable align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChangePage" :current-page="pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="qty" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <el-dialog title="商品信息" :visible.sync="dialogFormVisible" class="dialog">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <shop-type @setShopClassgiy="setFormClassgiy" :currobj="{table:'3',value:Number(form.type),type:'unshow', width:formLabelWidth,title:'商品分类'}"></shop-type>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input v-model="form.stock" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="折扣" :label-width="formLabelWidth">
          <el-input v-model="form.discount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handleUpdate(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ShopType from "../common/shopType";
export default {
  name: 'shopList',
  data () {
    return {
      page: 'shopList',
      pageNo:1,
      qty:5,
      total:0,
      tableData:[],
      datas:{},
      formInline: {
          name: '',
          type: '全部'
      },
      //dialog
      dialogFormVisible: false,
      form: {},
      formLabelWidth:'80px',
      currentIndex: '',
    }
  },
  computed:{
    classfiyData:{
      get(){
        return this.$store.state.shop.shopClassfiy
      },
      set(){

      }
    }
  },
  methods:{
    onSearch() {
      this.getData();
    },
    getData(){
      let where = [{f:'name',o:'like',v:'%'+this.formInline.name+'%',}];
      console.log(this.formInline.type);
      if (!['全部','*'].includes(this.formInline.type)) {
        where.push({f:'type',o:'=',v:this.formInline.type});
      }
      this.$axios.post('/api/shoplist',{
        pageNo:this.pageNo,
        qty:this.qty,
        where
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
    setShopClassgiy(val){
      this.formInline.type = val;
    },
    setFormClassgiy(val){
      this.form.type = val;
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
        this.form = this.tableData[index];
        this.currentIndex = index;
        this.dialogFormVisible = true;
        console.log("edit",index, row);
    },
    add() {
      this.form = {
        ArtNo:'',
        brand:'',
        describe:'',
        discount:'',
        freeshipping:'',
        id:'',
        img:'',
        imglist:'',
        name:'',
        popularity:'',
        price:'',
        remark:'',
        sale:'',
        score:'',
        stock:'',
        storeid:'',
        type:0,
      }
      this.dialogFormVisible = true
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    delete(id){
      let promise = new Promise((resolve,reject)=>{
        this.$axios.post('/api/shopdeletebyid',{
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
        this.$axios.post('/api/shopupdatebyid',{
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
    handleUpdate(data) {
      this.update(data).then(x=>{
        if(x.status){
          this.dialogFormVisible = false;
          this.$swal(
              '修改成功',
              '',
              'success'
            ).then(x=>{
              this.getData();
            })
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
    handleSave:function(row){
    console.log("save",row);
        //保存数据，向后台取数据
    },
  },
  components:{
    ShopType
  },
  created(){
    this.getData();
    console.log(this.$store.state);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.shopList {
  * {
    line-height: 1em;
  }
}
</style>
