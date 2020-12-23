<template>
  <!-- 管理员列表 -->
  <div class="manageList">
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180">
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
          <el-button type="primary" @click="updatemanage(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteManageByOne(scope.row.uid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="manageCount"
      :page-size="manageSize"
      @current-change="changpage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//引入接口数据
import { DeleteManageByOne } from "../../utils/request";
//引入全局消息组件
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  methods: {
    ...mapActions({
      manageList: "manage/mangeListAction", //管理员列表
      manageCounts: "manage/manageCountAction", //管理员总数，用于分页
      changmanagePage: "manage/changPageAction" //修改当前页码
    }),
    //修改当前页码
    changpage(page) {
      this.changmanagePage(page);
      this.manageList();
    },
    //点击编辑
    updatemanage(id) {
      //传递给父组件，父组件调用弹窗
      this.$emit("updatemanage", id);
    },
    //删除一条管理员信息
    deleteManageByOne(uid) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteManageByOne({ uid }).then(res => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
             this.manageList();
             this.manageCounts();
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
      tableData: "manage/manageList", //管理员列表
      manageCount: "manage/manageCount", //管理员总数
      manageSize: "manage/manageSize" //每页显示多少条
    })
  },
  mounted() {
    this.manageList();
    this.manageCounts();
  }
};
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>