<template>
  <div class="addmember">
    <el-dialog :title="info.title" :visible.sync="info.isshow" width="40%">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
        <!-- 用户名密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <!-- 角色状态 -->
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="ruleForm.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!-- 添加修改取消 -->
        <el-form-item>
          <el-button type="primary" @click="updateManageByOne('ruleForm')"
            >修改</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { SelectMemberByOne, UpdataMember } from "../../utils/request";
// 引入公共信息提示
import { successAlert, warningAlert } from "../../utils/alert";
import { mapActions } from "vuex";
export default {
  // 接受父组件的值
  props: ["info"],
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        phone: "", //手机号
        nickname: "", //昵称
        password: "", //用户密码
        status: "" //用户状态1正常2禁用
      },
      formLabelWidth: "120px"
      //   rules: {
      //     username: [
      //       { required: true, message: "请输入用户名", trigger: "blur" },
      //       { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
      //     ]
      //   }
    };
  },
  methods: {
    //   submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //         // 添加会员
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    ...mapActions({
        memberListAction:"member/MemberListActions"
    }),
    getmember(uid) {
      SelectMemberByOne({ uid }).then(res => {
        if (res.data.code === 200) {
          this.ruleForm = res.data.list;
          this.ruleForm.password = "";
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel() {
      this.ruleForm = {
        phone: "", //手机号
        nickname: "", //昵称
        password: "", //用户密码
        status: "" //用户状态1正常2禁用
      };
      this.info.isshow = false;
    },
    updateManageByOne() {
      UpdataMember(this.ruleForm).then(res => {
        if ((res.data.code = 200)) {
          successAlert(res.data.msg);
          this.cancel();
          this.memberListAction();
        }
      });
    }
  }
};
</script>

<style>
</style>