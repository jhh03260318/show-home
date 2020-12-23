<template>
  <div class="commangeList">
    <!-- 表格 -->
    <el-table :data="goodslist" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="180">
      </el-table-column>
      <el-table-column prop="img" label="图片" width="180">
        <template slot-scope="scope">
          <img class="goodsimg" :src="$prefiximgUrl + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew === 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot === 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >正常</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="updateCommon(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteCommonByOne(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="goodscount"
      :page-size="goodssize"
      @current-change="changpage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 引入接口数据
import { DeleteGoodsByOne } from "../../utils/request";
// 引入公共消息组件
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      goodslist: "goods/GoodsList", //商品列表
      goodscount: "goods/GoodsCount", //商品总数
      goodssize: "goods/GoodsSize" //每页显示多少条
    })
  },
  methods: {
    ...mapActions({
      goodslistAction: "goods/GoodsListActions", //商品列表
      goodscountAction: "goods/GoodsCountActions", //商品总数
      changpageAction: "goods/GoodsPageActions"
    }),
    // 页码发生变化时
    changpage(page) {
      this.changpageAction(page);
      this.goodslistAction();
    },
    // 编辑
    updateCommon(id) {
      // 通知父组件打开弹窗
      this.$emit("updateGoods", id);
    },
    // 删除一条商品信息
    deleteCommonByOne(id) {
      DeleteGoodsByOne({ id }).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.goodslistAction();
          this.goodscountAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.goodslistAction();
    this.goodscountAction();
  }
};
</script>

<style scoped>
.goodsimg {
  width: 60px;
  height: 60px;
}
</style>