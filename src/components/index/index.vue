<template>
  <div class="index">
    <el-container>
    <el-header>
      <my-header></my-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <my-aside></my-aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import MyAside from '../fragment/myaside/myaside';
import MyHeader from '../fragment/myheader/myheader';
export default {
  name: 'index',
  data () {
    return {
      page: 'index'
    }
  },
  components:{
    MyAside,
    MyHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header, .el-footer {
    background-color: rgba(192, 68, 11, 0.86);;
    color: #333;
    text-align: center;
    display: flex;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }

  .el-main {
     background-color: rgb(238, 238, 238);
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
