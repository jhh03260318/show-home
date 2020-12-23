<template>
  <!-- 添加轮播图 -->
  <div class="addbanner">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <!-- 文件上传 -->
        <el-form-item label="图片" prop="img">
          <div class="box-img">
            <h3>+</h3>
            <img v-if="imageUrl" :src="imageUrl" alt="" />
            <input type="file" @change="changImg" />
          </div>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="ruleForm.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!-- 添加修改重置 -->
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            v-if="info.isadd"
            >添加</el-button
          >
          <el-button
            type="primary"
            @click="updateCategoryByOne('ruleForm')"
            v-else
            >修改</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="cancle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 引入公共消息子组件
import { successAlert, warningAlert } from "../../utils/alert";
// 引入接口数据
import { InsertBanner } from "../../utils/request";
export default {
  // 接受子组件的信息
  props: ["info"],
  data() {
    return {
      imageUrl: "",
      ruleForm: {
        title: "", //商品分类名称
        img: "", //图片文件
        status: 1 //状态
      },
      rules: {
        title: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          InsertBanner(this.ruleForm).then(res=>{
            if(res.data.code===200){
              successAlert(res.data.msg);
              this.cancle();
            }else{
              warningAlert(res.data.msg);
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //显示图片
    changImg(e) {
      //获取文件流信息
      let file = e.target.files[0];
      //判断图片大小
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("图片大小不能超过2M");
        return;
      }
      //声明可上传的图片后缀
      var imgsuffix = [".jpg", ".jpeg", ".png", ".gif"];
      var imgsuffixName = file.name.slice(file.name.lastIndexOf("."));
      // 判断上传的图片格式是否符合
      if (!imgsuffix.some(item => item === imgsuffixName)) {
        warningAlert("图片格式上传不正确");
        return;
      } else {
        successAlert("图片格式上传正确");
      }
      //显示获取的图片文件
      this.imageUrl = URL.createObjectURL(file);
      //将文件流信息存入ruleForm中
      this.ruleForm.img = file;
    },
    // 取消添加
    cancle() {
      this.ruleForm = {
        title: "", //商品分类名称
        img: "", //图片文件
        status: 1 //状态
      };
      this.imageUrl = "";
      this.info.isshow = false;
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.box-img {
  width: 150px;
  height: 150px;
  border: 1px dashed #d9d9d9;
  position: relative;
}

.box-img h3 {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 150px;
  text-align: center;
}

.box-img img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.box-img input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>