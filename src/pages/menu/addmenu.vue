<template>
  <div class="addmenu">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 菜单名称 -->
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <!-- 上级菜单 -->
        <el-form-item label="上级菜单" prop="pid">
          <el-select v-model="ruleForm.pid" placeholder="请选择">
            <el-option label="请选择" value="xuanze" disabled></el-option>
            <el-option label="顶级菜单" value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
            <!-- <el-option label="顶级菜单" value="0"></el-option>
            <el-option label="系统配置" value="1"></el-option>
            <el-option label="商城管理" value="2"></el-option> -->
          </el-select>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型" prop="resource">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item label="菜单图标" prop="icons" v-if="ruleForm.type === 1">
          <el-select v-model="ruleForm.icon" placeholder="请选择">
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
          <el-select v-model="ruleForm.url" placeholder="请选择">
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
            v-model="ruleForm.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >添加</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//引入公共请求数据
import { addMenu } from "../../utils/request.js";
//引入公共消息弹框提示
import { successAlert, warningAlert } from "../../utils/alert.js";

import { mapGetters, mapActions } from "vuex";
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
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
        icon: [{ required: true, message: "请选择菜单图标", trigger: "change" }]
      }
    };
  },
  methods: {
    cancel() {
      this.info.show = false;
      this.ruleForm = {
        title: "", //菜单名称
        pid: "", //上级菜单
        icon: "", //菜单图标
        type: 1, //菜单类型
        url: "", //菜单地址
        status: 0 //状态
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addMenu(this.ruleForm).then(res => {
            if ((res.data.code = 200)) {
              successAlert(res.data.msg);
              this.cancel();
              this.MenuList();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapActions({
      MenuList: "menu/menuListAction"
    })
  },
  computed: {
    ...mapGetters({
      list: "menu/menuList"
    })
  }
};
</script>

<style scoped>
/* 菜单名称 */
.el-input {
  height: 40px;
}
/* 上级菜单 */
.el-input--suffix {
  width: 218px;
  height: 40px;
}
</style>