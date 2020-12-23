<template>
  <div class="specifications">
    <!-- 添加商品规格 -->
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 商品规格列表子组件 -->
    <v-speclist @updatespec="updatespec($event)"></v-speclist>
    <!-- 添加或者修改商品规格子组件 -->
    <v-add :info="info" ref="updatespec"></v-add>
  </div>
</template>

<script>
// 引入添加商品规格子组件
import vAdd from "./addspecifications";
// 引入商品规格列表子组件
import vSpeclist from "./specificationsList";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "",
        isadd: ""
      }
    };
  },
  components: {
    vAdd,
    vSpeclist
  },
  methods: {
    // 添加商品规格
    add() {
      this.info.isshow = true;
      this.info.title = "添加商品规格";
      this.info.isadd = true;
    },
    // 修改商品规格
    updatespec(id) {
      this.info.isshow = true;
      this.info.title = "修改商品规格";
      this.info.isadd = false;
      this.$refs.updatespec.getspec(id);
    }
  }
};
</script>

<style>
</style>