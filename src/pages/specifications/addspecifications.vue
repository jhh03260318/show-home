<template>
  <!-- 添加商品规格 -->
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 规格名称 -->
        <el-form-item label="规格名称" prop="specsname">
          <el-input v-model="ruleForm.specsname"></el-input>
        </el-form-item>
        <!-- 规格名称 -->
        <el-form-item
          v-for="(item, index) in specAttr"
          :key="index"
          label="规格属性"
          prop="attrs"
        >
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" v-if="index === 0" @click="attrSpec"
            >新增规格属性</el-button
          >
          <el-button type="danger" v-else @click="delSpec(index)"
            >删除</el-button
          >
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
          <el-button type="primary" @click="updateSpecByOne('ruleForm')" v-else
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
// 引入接口数据
import { InsertSpec, SelectSpecByOne, UpdataSpec } from "../../utils/request";
// 引入公共信息提示
import { successAlert, warningAlert } from "../../utils/alert";
import { mapActions } from "vuex";
export default {
  // 接受父组件的值
  props: ["info"],
  data() {
    return {
      specAttr: [{ value: "" }], //规格属性
      ruleForm: {
        specsname: "", //商品规格名称
        attrs: "", //商品规格属性
        status: 1 //状态
      },
      rules: {
        specsname: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions({
      SpecLists: "spec/SpecListAction", //商品规格列表分页
      SpecCount: "spec/SpectCountAction", //商品规格总数
      SpacePage: "spec/SpecPageActions" //修改当前页数
    }),
    //添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.attrs = this.specAttr.map(item => item.value).join(",");
          InsertSpec(this.ruleForm).then(res => {
            if (res.data.code === 200 && res.data.msg === "添加成功") {
              successAlert(res.data.msg);
              this.cancle();
              this.SpecLists();
              this.SpecCount();
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
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 取消添加
    cancle() {
      this.ruleForm = {
        specsname: "", //商品规格名称
        attrs: "", //商品规格属性
        status: 1 //状态
      };
      this.info.isshow = false;
      this.specAttr = [{ value: "" }]; //规格属性
    },
    //添加商品规格
    attrSpec() {
      this.specAttr.push({ value: "" });
    },
    // 删除商品规格
    delSpec(index) {
      this.specAttr.splice(index, 1);
    },
    // 根据id获取一条商品规格信息
    getspec(id) {
      SelectSpecByOne({ id }).then(res => {
        if (res.data.code === 200) {
          this.ruleForm = res.data.list[0];
          this.ruleForm.id = id;
          let arr = this.ruleForm.attrs.split(",");
          this.specAttr = [];
          for (let i in arr) {
            this.specAttr.push({ value: arr[i] });
          }
        } else if (res.data.code === 403) {
          warningAlert(res.data.msg);
          this.$router.push("/login");
        }
      });
    },
    // 修改一条商品规格信息
    updateSpecByOne() {
      this.ruleForm.attrs = this.specAttr.map(item => item.value).join(",");
      UpdataSpec(this.ruleForm).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancle();
          this.SpecLists();
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
    }
  }
};
</script>

<style>
</style>