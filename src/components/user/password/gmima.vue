<template>
  <div>
    <div style="height:30px;border-bottom:1px solid #fff;light-height:30px;font-size:20px;">修改密码</div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" style="margin-top:20px;min-height:500px;">
      <el-form-item label="当前密码：" prop="user">
        <el-input v-model.string="ruleForm2.user" class="inp"></el-input>
      </el-form-item>

      <el-form-item label="新密码：" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" class="inp"></el-input>
      </el-form-item>

      <el-form-item label="确认密码：" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" class="inp"></el-input>
      </el-form-item>

      <el-row>
        <el-button class="btn" type="primary" @click.native="submitForm('ruleForm2')">
          <div>确认修改</div>
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script type="text/javascript">
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
</script>
<style>
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
  width: 100px;
  height: 38px;
  margin: 0 100px;
}
.label {
  border: 1px solid black;
}
.inp {
  width: 200px;
}
</style>
