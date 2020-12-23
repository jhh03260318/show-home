<template>
  <!-- 商品管理 -->
  <div class="commonditymange">
    <!-- 添加角色 -->
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 商品列表 -->
    <v-commangelist @updateGoods="updateGoods($event)"></v-commangelist>
    <!-- 添加或者修改商品子组件 -->
    <v-addcom :info="info" ref="updateGoods"></v-addcom>
  </div>
</template>

<script>
// 引入添加商品组件
import vAddcom from "./addcommange";
// 引入商品列表组件
import vCommangelist from "./commangeList";
export default {
  data() {
    return {
      info: {
        isshow: false,
        titile: "",
        isadd: true
      }
    };
  },
  components: {
    vAddcom,
    vCommangelist
  },
  methods: {
    // 添加
    add() {
      this.info.isshow = true;
      this.info.title = "添加商品";
      this.info.isadd = true;
    },
    // 弹框并根据id获取一条商品信息
    updateGoods(id) {
      this.info.isshow = true;
      this.info.title = "修改商品";
      this.info.isadd = false;
      this.$refs.updateGoods.getGoods(id);
    }
  }
};
</script>

<style scoped>
.el-button {
  width: 60px;
  padding: 10px 0px;
}
</style>