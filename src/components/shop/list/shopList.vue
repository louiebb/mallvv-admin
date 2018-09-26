<template>
  <div class="shopList">
    <el-form  :inline="true" :model="formInline" class="nav demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="formInline.type" placeholder="请选择分类">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit"><i class="el-icon-search"></i></el-button>
    </el-form-item>
    </el-form>
    <el-table class="table"  border :data="tableData" style="width: 100%; text-align: center;">
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column width="50" label="ID" >
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="商品分类" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.stock }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="折扣" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.discount }}</span>
        </template>
      </el-table-column>
       <el-table-column label="备注" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="qty"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'shopList',
  data () {
    return {
      page: 'shopList',
      pageNo:1,
      qty:3,
      total:0,
      tableData:[],
      datas:{},
      formInline: {
          name: '',
          type: ''
      },
    }
  },
  computed:{
  },
  methods:{
    onSubmit() {
      console.log('submit!');
    },
    getData(){
      this.$axios.post('/api/shoplist',{
        pageNo:this.pageNo,
        qty:this.qty,
        where:[
          {
            f:'name',
            o:'like',
            v:'%',
          },
          {
            f:'type',
            o:'=',
            v:'200101'
          }
        ]
        }).then((result) => {
          if(result.data&&result.data.status){
            this.datas = result.data ;
            this.tableData = this.datas.data;
            this.total =  this.tableData.length;
          }
          console.log(this.datas);
        }).catch((err) => {
        });
    },
    handleSizeChange(val) {
      this.qty = val;
      console.log(`每页 ${val} 条`,this.qty);
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      console.log(`当前页: ${val}`,this.pageNo);
      this.getData();

    }
},
  created(){
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .shopList{
    .nav{
      line-height: 1em;
    }
    .table{
      line-height: 1em;
    }
  }
</style>
