<template>
  <!-- 所有角色信息 -->
  <div class="roleList">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="角色状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="updateRole(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteRole(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//引入接口数据
import { DeleteRoleByOne } from "../../utils/request";
//引入公共组件
import {successAlert} from '../../utils/alert';
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      roleList: "role/roleListAction"
    }),
    //修改
    updateRole(id) {
      //传递给父组件，父组件调用弹窗
      this.$emit("updateRole", id);
    },
    //删除一条角色信息
    deleteRole(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteRoleByOne({ id: id }).then(res => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.roleList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    ...mapGetters({
      tableData: "role/roleList"
    })
  },
  mounted() {
    this.roleList();
  }
};
</script>

<style scoped>
.el-button {
  width: 60px;
  padding: 10px 0px;
}
</style>