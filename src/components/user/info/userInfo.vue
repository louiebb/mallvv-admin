<template>
  <div class="userInfo">
    <!-- <div style="height:30px;border-bottom:1px solid #fff;light-height:30px;font-size:20px;margin-bottom:10px;">设置我的资料</div>
    <el-form ref="form" :model="form" label-width="80px" style="max-height:600px;">
      <el-form-item label="我的角色">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input class="inp"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input class="inp"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.resource">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="头像">
        <el-input class="inp" style="display:block;float:left;margin-right:10px;"></el-input>
        <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" style="overflow:hidden;">
          <el-button slot="trigger" size="small" type="primary" style="float:left;">选取文件</el-button>
          <el-button style="margin:0 10px; float:left;" size="small" type="success" @click="submitUpload">查看图片</el-button>
          <div slot="tip" class="el-upload__tip" style="float:right;margin-right:480px;">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机">
        <el-input class="inp"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input class="inp"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.desc" class="inpt"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('dynamicValidateForm')">确认修改</el-button>
        <el-button type="info">重新填写</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
export default {
  name: 'userInfo',
  data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
