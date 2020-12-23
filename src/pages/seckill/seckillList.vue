<template>
  <div class="seckillList">
    <el-table
      :data="seckillList"
      stripe
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <!-- 活动名称 -->
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <!-- slot-scope是elementui的一个获取某一行数据的值 -->
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="updateseckill(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="delteseckill(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { DeleteSeckillByOne } from "../../utils/request";
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      seckillList: "seckill/seckillList" //秒杀活动列表
    })
  },
  methods: {
    ...mapActions({
      seckillListActions: "seckill/SeckillListActions"
    }),
    // 编辑
    updateseckill(id) {
      this.$emit("updateseckill", id);
    },
    // 删除
    delteseckill(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteSeckillByOne({ id }).then(res => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.seckillListActions();
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
    this.seckillListActions();
  }
};
</script>

<style>
</style>