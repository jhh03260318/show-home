<template>
  <div class="specificationsList">
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格" width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性" width="180">
        <template slot-scope="scope">
          <el-tag type="success" v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="updatespec(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteSpecByOne(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="changCount"
      :page-size="changSize"
      @current-change="changPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 引入公共消息弹框
import { successAlert, warningAlert } from "../../utils/alert";
// 引入接口信息
import { DeleteSpecByOne } from "../../utils/request";
export default {
  computed: {
    ...mapGetters({
      tableData: "spec/SpecList", //商品规格列表分页
      changCount: "spec/SpecCount", //商品规格列表总数
      changSize: "spec/SpecSize" //每页显示多少条数
    })
  },
  methods: {
    ...mapActions({
      SpecLists: "spec/SpecListAction", //商品规格列表分页
      SpecCount: "spec/SpectCountAction", //商品规格总数
      SpacePage: "spec/SpecPageActions" //修改当前页数
    }),
    // 点击页码时
    changPage(page) {
      this.SpacePage(page);
      this.SpecLists(); //商品列表
    },
    // 修改一条商品规格信息
    updatespec(id) {
      //通知父组件打开弹窗
      this.$emit("updatespec", id);
    },
    // 删除一条规格信息
    deleteSpecByOne(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteSpecByOne({ id }).then(res => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.SpecLists(); //商品列表
              this.SpecCount(); //商品规格总数
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
  mounted() {
    this.SpecLists(); //商品列表
    this.SpecCount(); //商品规格总数
  }
};
</script>

<style>
</style>