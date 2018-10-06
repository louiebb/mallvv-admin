<template>
  <div class="userInfo">
    <div style="height:30px;border-bottom:1px solid #fff;light-height:30px;font-size:20px;margin-bottom:10px;">设置我的资料</div>
    <el-form ref="form" :model="form" label-width="80px" style="max-height:600px;">
      <!-- <el-form-item label="我的角色">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="账号">
        <el-input v-model="form.account" class="inp"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"  class="inp"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.state">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload

        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i style="border: 1px solid #000;" v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone" class="inp"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" class="inp"></el-input>
      </el-form-item>
      <el-form-item label="token">
        <el-input type="text" v-model="form.token" class="inpt"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('dynamicValidateForm')">确认修改</el-button>
        <el-button type="info">重新填写</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data() {
      return {
        form:JSON.parse(sessionStorage.getItem('user')),
        imageUrl:'',
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>

   .avatar-uploader .el-upload {
    border: 1px dashed #0f0101;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
