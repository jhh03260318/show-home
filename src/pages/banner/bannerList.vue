<template>
  <!-- 轮播图列表 -->
  <div class="bannerList">
    <el-table
      :data="bannerList"
      stripe
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180">
      </el-table-column>

      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="scope">
          <img class="bannerImg" :src="$prefiximgUrl + scope.row.img" alt="" />
        </template>
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
          <el-button type="primary" @click="updatemenu(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deltebanner(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引用接口数据
import { mapGetters, mapActions } from "vuex";
import { DeleteBannerByOne } from "../../utils/request";
import { successAlert, warningAlert } from '../../utils/alert';
export default {
  computed: {
    ...mapGetters({
      bannerList: "banner/bannerList"
    })
  },
  methods: {
    ...mapActions({
      bannerListActions: "banner/BannerListActions"
    }),
    // 编辑
    updatemenu(id) {
      this.$emit("updatebanner", id);
    },
    // 删除
    deltebanner(id){
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteBannerByOne({ id }).then(res => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
             this.bannerListActions();
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
    this.bannerListActions();
  }
};
</script>

<style scoped>
.bannerImg {
  width: 60px;
  height: 60px;
}
</style>