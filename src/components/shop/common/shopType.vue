<template>
  <el-form-item :label="currobj.title" :label-width="currobj.width">
    <el-select v-model="currobj.value" placeholder="请选择分类">
      <el-option v-for="cls in classfiyData.source" v-if="allshow(cls.name)" :key="cls.type" @click.native="setShopType" :value="cls.type" :label="cls.name">
        <span style="float: left">{{ cls.name }}</span>
          <!-- -{{currobj.value === cls.role}} {{typeof currobj.value}}-{{typeof cls.role}} -->
        <span style="float: right; color: #8492a6; font-size: 13px">{{ cls.type }}</span>
      </el-option>
    </el-select>
  </el-form-item>
</template>
<script>
export default {
  props:['currobj'],
  data(){
    return {
      classfiyData:{
        source:[],
        formate:{},
      },
    }
  },
  methods:{
    allshow(val){
      console.log(val,this.currobj.type);
      if(this.currobj.type != 'show'){
        if (val=='全部' ) {
          return false;
        }
      }
      return true;
    },
    setShopType(){
      this.$emit('setShopType',this.currobj.value);
    },
    getClassfiyData(){
      this.$axios.post('/api/shopAllClassify',{
        where:{f:'1',o:'=',v:'1',t:this.currobj.table}
        }).then((result) => {
          if(result.data&&result.data.status){
            this.classfiyData.source = result.data.data ;
            let obj = this.classfiyData.source;
            let currentobj = {};
            obj.forEach(x=> currentobj[x.type] = x.name);
            this.classfiyData.formate = currentobj;
            //question lgz  搜索时需要全部选项，选择商品信息时去掉全部选项
            this.classfiyData.source.splice(0,0,{name:'全部',type:'全部',id:'0001'});
            this.$store.commit('setShopClassfiy',this.classfiyData);
          }
        }).catch((err) => {
          console.log('getData',err);
      });
    },
  },
  created(){
    this.getClassfiyData();
  }
}
</script>


