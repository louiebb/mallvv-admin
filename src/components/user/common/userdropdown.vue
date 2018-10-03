<template>
  <el-form-item :label="currobj.title" :label-width="currobj.width">
    <el-select v-model="currobj.value" placeholder="请选择角色">
      <el-option v-for="cls in userRole.source" v-if="allshow(cls.name)" :key="cls.role" @click.native="setUserRoleType" :value="cls.role" :label="cls.name">
        <span style="float: left">{{ cls.name }}</span>
          <!-- -{{currobj.value === cls.role}} {{typeof currobj.value}}-{{typeof cls.role}} -->
        <span style="float: right; color: #8492a6; font-size: 13px">{{ cls.role }}</span>
      </el-option>
    </el-select>
  </el-form-item>
</template>
<script>
export default {
  props:['currobj'],
  data(){
    return {
      userRole:{
        source:[],
        formate:{},
      },
    }
  },
  methods:{
    allshow(val){
      if(this.currobj.type != 'show'){
        if (val=='全部' ) {
          return false;
        }
      }
      return true;
    },
    setUserRoleType(){
      this.$emit('setUserRoleType',this.currobj.value);
    },
    getUserRole(){
      this.$axios.get('/api/userRole').then((result) => {
          if(result.data&&result.data.status){
            this.userRole.source = result.data.data ;
            let obj = this.userRole.source;
            let currentobj = {};
            obj.forEach(x=> currentobj[x.role] = x.name);
            this.userRole.formate = currentobj;
            //question lgz  搜索时需要全部选项，选择商品信息时去掉全部选项  v-if 可以隐藏全部
            this.userRole.source.splice(0,0,{name:'全部',role:'全部',type:'0001',id:'0001'});
            this.$store.commit('setUserRole',this.userRole);
          }
        }).catch((err) => {
          console.log('getData',err);
      });
    },
  },
  created(){
    this.getUserRole();
  }
}
</script>


