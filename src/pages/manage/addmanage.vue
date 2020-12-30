<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" width="40%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 角色信息 -->
        <el-form-item label="所属角色" prop="region">
          <el-select v-model="ruleForm.roleid" placeholder="请选择所属角色">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
              v-show="item.status===1"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
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
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            v-if="info.isadd"
            >添加</el-button
          >
          <el-button
            type="primary"
            @click="updateManageByOne('ruleForm')"
            v-else
            >修改</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 引入接口数据
import {
  InsertManage,
  SelectManageByOne,
  UpdateManageByOne
} from "../../utils/request";
// 引入公共消息提示组件
import { successAlert, warningAlert } from "../../utils/alert.js";
export default {
  // 接受父组件的值
  props: ["info"],
  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        roleid: "", //角色编号
        username: "", //用户名成
        password: "", //用户密码
        status: "" //用户状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            // 添加管理员
          InsertManage(this.ruleForm).then(res => {
            if ((res.data.code = "200")) {
              successAlert(res.data.msg);
              this.cancel();
              this.manageList();
              this.manageCounts();
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
      roleLists: "manage/roleListAction",
      manageList: "manage/mangeListAction", //管理员列表
      manageCounts: "manage/manageCountAction", //管理员总数，用于分页
    }),
    //点击取消时，将弹框内的所有数据清空
    cancel() {
      this.info.isshow = false;
      this.ruleForm = {
        roleid: "", //角色编号
        username: "", //用户名成
        password: "", //用户密码
        status: "" //用户状态1正常2禁用
      };
    },
    //根据id展示管理员信息
    updatemanage(uid) {
      SelectManageByOne({ uid }).then(res => {
        if (res.data.code === 200) {
          this.ruleForm = res.data.list;
          this.ruleForm.password = "";
        }
      });
    },
    //根据id删除一条信息
    updateManageByOne() {
      UpdateManageByOne(this.ruleForm).then(res => {
        if (res.data.code === 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.manageList();
            this.manageCounts();
        }else{
            warningAlert(res.data.msg);
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      rolelist: "manage/roleList"
    })
  },
  mounted() {
    this.roleLists();
  }
};
</script>

<style scoped>
.el-input {
  width: 50%;
}
</style>