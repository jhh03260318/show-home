<template>
  <div class="addroles">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 角色名称 -->
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="ruleForm.rolename"></el-input>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item label="角色权限">
          <el-tree
            :data="data"
            node-key="id"
            show-checkbox
            :default-expanded-keys="[1, 3]"
            :default-checked-keys="keys"
            :props="defaultProps"
            ref="tree"
          >
          </el-tree>
        </el-form-item>
        <!-- 角色状态 -->
        <el-form-item label="状态" prop="delivery">
          <el-switch
            v-model="ruleForm.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            v-if="info.isadd"
            >添加</el-button
          >
          <el-button type="primary" @click="updateRole('ruleForm')" v-else
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
//引入接口
import {
  InsertRole,
  SelectRoleByOne,
  UpdateRoleByOne
} from "../../utils/request";
//引入消息公共组件
import { successAlert, warningAlert } from "../../utils/alert.js";
export default {
  // 接受父组件的值
  props: ["info"],
  data() {
    return {
      keys: [],
      ruleForm: {
        rolename: "",
        menus: [],
        status: 1
      },
      defaultProps: {
        children: "children",
        label: "title"
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //获取树形节点中的被选中的key值，组成的是一个数组的形式 [1, 2, 3]
          this.ruleForm.menus = JSON.stringify(
            this.$refs.tree.getCheckedKeys()
          );
          InsertRole(this.ruleForm).then(res => {
            if (res.data.code === 200) {
              successAlert(res.data.msg);
              this.cancel();
              this.roleList();
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
    //修改单个角色的信息
    updateRole(formName) {
      this.ruleForm.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          UpdateRoleByOne(this.ruleForm).then(res => {
            if (res.data.code === 200) {
              successAlert(res.data.msg);
              //修改成功后将弹框消失
              this.cancel();
              //修改完之后刷新表格数据
              this.roleList();
            }else{
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
    //点击取消是，将弹框内的所有数据清空
    cancel() {
      this.info.show = false;
      this.ruleForm = {
        name: "" //菜单名称
      };
    },
    ...mapActions({
      //获取角色权限/菜单
      roleforomMenu: "menu/menuListAction",
      //添加完角色后需要更新
      roleList: "role/roleListAction"
    }),
    //获取一条角色信息
    updaterole(id) {
      SelectRoleByOne({ id: id }).then(res => {
        this.keys = this.$refs.tree.setCheckedKeys([]); //将默认勾选上的值清空
        if (res.data.code === 200) {
          this.ruleForm = res.data.list;
          //设置一个id，用于修改的唯一对比值
          this.ruleForm.id = id;
          this.keys = JSON.parse(res.data.list.menus);
        }
      });
    }
  },
  computed: {
    //获取角色的值
    ...mapGetters({
      data: "menu/menuList"
    })
  },
  mounted() {
    this.roleforomMenu();
  }
};
</script>

<style scoped>
/* 角色名称 */
.el-input {
  height: 40px;
}
</style>