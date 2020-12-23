<template>
  <div class="categoryList">
    <el-table
      :data="categoryList"
      stripe
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>

      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="scope">
          <img
            class="categoryImg"
            :src="$prefiximgUrl + scope.row.img"
            alt=""
          />
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
          <el-button type="danger" @click="deltemenu(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 引入接口数据
import { DeleteCategoryByOne } from "../../utils/request";
// 引入公共消息组件
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      categoryList: "category/CategoryList"
    })
  },
  methods: {
    ...mapActions({
      categoryLists: "category/CategoryListActon"
    }),
    // 修改商品分类信息
    updatemenu(id) {
      //传给父组件，通知父组件打开编辑窗口
      this.$emit("updateCategory", id);
    },
    // 删除一条商品分类信息
    deltemenu(id) {
        DeleteCategoryByOne({id}).then(res=>{
            if(res.data.code===200){
                successAlert(res.data.msg);
                this.categoryLists();
            }else{
                warningAlert(res.data.msg);
            }
        })
    }
  },
  mounted() {
    this.categoryLists();
  }
};
</script>

<style scoped>
.categoryImg {
  width: 60px;
  height: 60px;
}
</style>