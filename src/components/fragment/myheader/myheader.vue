<template>
  <div class="myheader">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" srcset="">
      <h1 class="name">{{name}}后台管理系统</h1>
    </div>
    <p class="dec">
      欢迎{{user}}登录我们的{{name}}系统，在这你可以猥琐欲为
    </p>
    <div class="out">
       <el-button  type="danger"  size="mini" plain>退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "myheader",
  data() {
    return {
      page: "header",
      name:this.$store.state.header.name,
      user:JSON.parse(sessionStorage.user).account
    };
  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .myheader{
    line-height: 1em;
    display: flex;
    align-self: center;
    justify-content: space-between;
    width: 100%;
    .logo{
      display: flex;
      line-height: 1.15;
      img{
        display: inline-block;
        vertical-align: middle;
      }
    }
    .name{
      vertical-align: middle;
      font-size: 1.5em;
      margin-left: 1em;
    }
    .out{
      display: flex;
      flex-direction: column;
      align-self: center;
    }
    .dec{
      margin-left: 30em;
    padding-top: 10px;
    }
  }
</style>
