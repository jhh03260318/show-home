<template>
  <div class="addcategory">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="上级分类" prop="pid">
          <el-select v-model="ruleForm.pid" placeholder="请选择商品分类">
            <el-option label="顶级分类" value="0"></el-option>
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="ruleForm.catename"></el-input>
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
// 引入公共消息组件
import { successAlert, warningAlert } from "../../utils/alert";
// 引入接口数据文件
import {
  InsertCategory,
  SelectCategoryByOne,
  UpdateCatrgoryByOne
} from "../../utils/request";
import { mapGetters, mapActions } from "vuex";
export default {
  // 接受父组件的值
  props: ["info"],
  data() {
    return {
      imageUrl: "",
      ruleForm: {
        pid: "", //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片文件
        status: 1 //状态
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          InsertCategory(this.ruleForm).then(res => {
            if (res.data.code === 200 && res.data.msg === "添加成功") {
              successAlert(res.data.msg);
              this.cancle();
              this.categoryLists();
            } else if (
              sessionStorage.getItem("user") === null ||
              res.data.msg === "登录已过期或访问权限受限"
            ) {
              warningAlert(res.data.msg);
              this.$router.push("/login");
            } else {
              warningAlert(res.data.msg);
            }
          });
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
        pid: "", //上级分类编号
        catename: "", //商品分类名称
        img: "", //图片文件
        status: 1 //状态
      };
      this.imageUrl = "";
      this.info.isshow = false;
    },
    ...mapActions({
      // 下拉菜单上级列表
      categoryLists: "category/CategoryListActon"
    }),
    // 通过id获取一条商品分类信息
    getCategory(id) {
      SelectCategoryByOne({ id }).then(res => {
        if (res.data.code === 200) {
          this.ruleForm = res.data.list;
          this.imageUrl = this.$prefiximgUrl + this.ruleForm.img;
          this.ruleForm.id = id;
        }
      });
    },
    // 修改一条商品分类信息
    updateCategoryByOne() {
      UpdateCatrgoryByOne(this.ruleForm).then(res => {
        if (res.data.code === 200 && res.data.msg === "操作成功") {
          successAlert(res.data.msg);
          this.cancle();
          this.categoryLists();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  computed: {
    ...mapGetters({
      categoryList: "category/CategoryList"
    })
  },
  mounted() {
    this.categoryLists();
  }
};
</script>

<style scoped lang="stylus">
.el-input {
  width: 50%;
}

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