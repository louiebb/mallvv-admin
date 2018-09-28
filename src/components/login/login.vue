<template>
  <div class="login">
    <div>
      <div class="small">

        <!-- <img src="./assets/logo.png"> -->
        <h2>商品后台管理系统</h2>

        <el-form :model="ruleForm2" status-icon :rules="rules2" label-position="right" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名：" prop="user">
            <el-input v-model.string="ruleForm2.user"></el-input>
          </el-form-item>

          <el-form-item label="密码：" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item type="flex" justify="end" label="">
            <el-button class="btn" type="primary"  @click.native="submitForm('ruleForm2')">登录</el-button>
          </el-form-item>
          <el-checkbox v-model="checked" class="jizhu">
            <div style="color:red;">记住密码</div>
          </el-checkbox>
          <router-link to="login">
            <div style="float:right;color:red;">忘记密码</div>
          </router-link>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
       var checkUser = (rule, value, callback) => {
        // if(!/^\S{6,20}$/.test(value)){
        //   callback(new Error('密码不能有空格'));
        // }
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else {
              callback();
            }
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {

            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        checked: false,
        ruleForm2: {
          pass: '',
          checkPass: '',
          user: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          user: [
            { validator: checkUser, trigger: 'blur' }
          ]
        }
      };
    },
     methods: {
      selectUser(){
        let checked = false;
        //请求
        //
        //
        //请求返回信息
        //
        return checked;
      },

      submitForm(formName) {
        //
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({name:'Home'});
            }else {
            return false;
          }
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html,
body,
.login {
  height: 100%;
}
</style>

<style scoped>
.app img {
  display: block;
  margin: 0 auto;
  height: 100px;
}
h2 {
  text-align: center;
  color: #fff;
}
/*.app{position: absolute; top:0; bottom:0; right:0; left:0; margin:auto;border:1px solid black; width:500px;height:480px;}*/
.small {
  width: 405px;
  height: 345px;
  background: rgba(41, 42, 46, 0.73);
  padding: 10px;
  border-radius: 15px;
  padding-right: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.btn {
  height: 38px;
}
.el-form-item {
    margin-bottom: 10px;
}
.label {
  border: 1px solid black;
}
.jizhu {
  margin-left: 100px;
}
.login {
  background: url(../../../static/img/login/bg.png) no-repeat;
}
</style>
