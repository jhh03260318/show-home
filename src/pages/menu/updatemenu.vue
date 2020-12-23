<template>
  <div class="updatemenu">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form
        :model="oneMenu"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 菜单名称 -->
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="oneMenu.title"></el-input>
        </el-form-item>
        <!-- 上级菜单 -->
        <el-form-item label="上级菜单" prop="pid">
          <el-select v-model="oneMenu.pid" placeholder="请选择">
            <el-option label="请选择" value="xuanze" disabled></el-option>
            <el-option label="顶级菜单" value="0"></el-option>
            <el-option label="系统配置" value="1"></el-option>
            <el-option label="商城管理" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型" prop="resource">
          <el-radio-group v-model="oneMenu.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item label="菜单图标" prop="icons" v-if="oneMenu.type === 1">
          <el-select v-model="oneMenu.icon" placeholder="请选择">
            <el-option label="请选择" value="xuanze" disabled></el-option>
            <el-option
              v-for="item in icons"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单地址 -->
        <el-form-item label="菜单地址" prop="url" v-else>
          <el-select v-model="oneMenu.url" placeholder="请选择">
            <el-option label="请选择" value="xuanze" disabled></el-option>
            <el-option
              v-for="item in urls"
              :key="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="oneMenu.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >修改</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//引入接口
import { UpdateMenuByOne } from "../../utils/request.js";
import { mapGetters, mapActions } from "vuex";
//引入公共消息弹框提示
import { successAlert, warningAlert } from "../../utils/alert.js";
export default {
  //接受父组件传过来的值
  props: ["info"],
  data() {
    return {
      show: false, //状态
      ruleForm: {
        title: "", //菜单名称
        pid: "", //上级菜单
        icon: "", //菜单图标
        type: 1, //菜单类型
        url: "", //菜单地址
        status: 0 //状态
      },
      icons: ["el-icon-star-on", "el-icon-star-off", "el-icon-s-goods"],
      urls: [
        "/home",
        "/menu",
        "/role",
        "/manage",
        "/category",
        "/specifications",
        "/commonditymange",
        "/member",
        "/banner",
        "/seckill"
      ],
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
        icon: [{ required: true, message: "请选择菜单图标", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.oneMenu.id = this.info.id;
          UpdateMenuByOne(this.oneMenu).then(res => {
            if ((res.data.code = 200)) {
              this.info.show = false; //通知父组件将弹窗关闭
              successAlert(res.data.msg);
              this.$emit("menuListRefresh"); //执行成功过后，通知父组件，让父组件刷新数据
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapActions({
      selectOneMenu: "menu/oneMenuAction"
    }),
    getDetail(id) {
      this.selectOneMenu(id);
    }
  },
  computed: {
    ...mapGetters({
      oneMenu: "menu/oneMenu"
    })
  },
  mounted() {
    //   this.selectOneMenu();
  }
};
</script>

<style>
</style>