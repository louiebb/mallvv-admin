<template>
  <div class="myaside">
    <el-col :span="24">
    <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="classify">商品分类</el-menu-item>
              <el-menu-item index="1-2" @click="list">商品列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span @click="userAdmin">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="modifyPwd">修改密码</el-menu-item>
              <el-menu-item index="2-2" @click="modifyInfo">资料修改</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="orderlist">订单列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
  </div>
</template>

<script>
export default {
  name: "myaside",
  data() {
    return {
      page: "aside",
    };
  },
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      list(){
        this.$router.push({name:'shoplist'});
      },
      classify(){
        this.$router.push({name:'shopclassify'});
      },
      userAdmin(){
        this.$router.push({name:'userlist'});
      },
      modifyPwd(){
        this.$router.push({name:'userpwd'});
      },
      modifyInfo(){
        this.$router.push({name:'userinfo'});
      },
      orderlist(){
        this.$router.push({name:'orderlist'});
      },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-submenu{
    min-width: 200px;
  }
</style>
