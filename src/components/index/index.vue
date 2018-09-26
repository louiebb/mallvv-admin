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
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
