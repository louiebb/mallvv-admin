<template>
  <div class="login">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <div class="logo"><img src="../../assets/logo.png" alt="" srcset=""></div>
    <h3 class="title">XXX系统登录</h3>
    <el-form-item prop="account">
      <el-input prefix-icon="el-icon-message" type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input prefix-icon="el-icon-document" type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      <br>
      <el-button class="reset" type="info" style="width:100%;" @click.native.prevent="handleReset('ruleForm')">重置</el-button>
    </el-form-item>

    <el-form-item>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6"><el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox></el-col>
      <el-col :span="6"><a class="text-info forgetpwd">忘记密码?</a></el-col>
    </el-row>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
   data() {
      var validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('账号验证失败'));
          return false;
        }
        callback();

      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码验证失败'));
          return false;
        }
        callback();

      };
      return {
        logining: false,
        ruleForm: {
          account: 'louiebb',
          password: '123'
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { validator: validateAccount }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset(formName) {
        this.$refs[formName].resetFields();
        console.log(666);

      },
      handleSubmit(ev) {
        var _this = this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.ruleForm.account, password: this.ruleForm.password };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              let { msg, code, user } = data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ name:'index' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
  .login{
    height: 100% ;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    position: relative;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .logo{
    text-align: center;
  }
  .forgetpwd{
    cursor: pointer;
  }
  .reset{
    margin-top: 10px;
  }
</style>
