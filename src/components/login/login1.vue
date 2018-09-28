<template>
  <div class="container">
    <div>
      <div class="small">

        <!-- <img src="./assets/logo.png"> -->
        <h2>商品后台管理系统</h2>

        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名：" prop="user">
            <el-input v-model.string="ruleForm2.user"></el-input>
          </el-form-item>

          <el-form-item label="密码：" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-row>
            <el-button class="btn" type="primary" @click.native="submitForm('ruleForm2')">
              <div>登录</div>
            </el-button>
          </el-row>
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
//引入各种框架
  import Vue from 'vue';
  //import FontAwesome from 'font-awesome-4.7.0';
  //import '../static/font-awesome-4.7.0/css/font-awesome.css';
  //Vue.use(FontAwesome);
 import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  Vue.use(ElementUI);
  export default {
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
  name: 'App'
</script>

<style >
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
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 400px;
  height: 450px;
}
.btn {
  width: 300px;
  height: 38px;
  margin: 0 25%;
}
.label {
  border: 1px solid black;
}
.jizhu {
  margin-left: 100px;
}
body {
  background-color: #324057;
}
</style>
