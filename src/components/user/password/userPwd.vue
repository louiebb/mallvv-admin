<template>
  <div class="userPwd">
    <div style="height:30px;border-bottom:1px solid #fff;light-height:30px;font-size:20px;">修改密码</div>
    <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top:20px;min-height:500px;">
      <el-form-item label="当前密码：" prop="currPwd">
        <el-input v-model="ruleForm.currPwd" class="inp"></el-input>
      </el-form-item>

      <el-form-item label="新密码：" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" class="inp"></el-input>
      </el-form-item>

      <el-form-item label="确认密码：" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" class="inp"></el-input>
      </el-form-item>

      <el-row>
        <el-button class="btn" type="primary" @click.native="submitForm('ruleForm')">
          <div>确认修改</div>
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'userPwd',
   data() {
       var checkPassWord = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原密码不能为空'));
        }else {
          if (this.user.password!=value) {
           return callback(new Error('原密码不正确!'));
          }
          callback();
        }
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {

            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        checked: false,
        ruleForm: {
          pass: '',
          checkPass: '',
          currPwd: ''
        },
        user:JSON.parse(sessionStorage.getItem('user')),
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          currPwd: [
            { validator: checkPassWord, trigger: 'blur' }
          ]
        }
      };
    },
     methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          this.user.password = this.ruleForm.checkPass;
          this.update(this.user).then(x=>{
            if (x.status) {
              sessionStorage.setItem('user',JSON.stringify(this.user));
              this.$swal(
                  '修改成功',
                  '',
                  'success'
                )
            }
          })
          }else {
            return false;
          }
        });

      },
      update(data){
       let promise = new Promise((resolve,reject)=>{
        this.$axios.post('/api/userupdatebyid',{
          where:{f:'id',o:'=',v:data.id},
          values:data,
        }).then((result) => {
          if(result.data&&result.data.status){
            resolve(result.data);
          }
        }).catch((err) => {
          console.log('update',err);
        });
      })
      return promise;
    },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
