<template>
  <!-- banner图管理 -->
  <div class="banner">
    <!-- 添加轮播图 -->
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 轮播图组件 -->
    <v-banner @updatebanner="updatebanner($event)"></v-banner>
    <!-- 添加或修改轮播图子组件 -->
    <v-add :info="info" ref="updatebanner"></v-add>
  </div>
</template>

<script>
// 引入添加轮播图子组件
import vAdd from "./addbanner";
// 引入轮播图子组件
import vBanner from "./bannerList";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "",
        isadd: true
      }
    };
  },
  components: {
    vAdd,
    vBanner
  },
  methods: {
    //   添加弹框
    add() {
        this.info.isshow = true,
        this.info.title = "添加轮播图",
        this.info.isadd = true
    },
    // 修改
    updatebanner(id){
      this.info.isshow = true,
      this.info.title = "修改轮播图",
      this.info.isadd = false
      this.$refs.updatebanner.getbanner(id);
    }
  }
};
</script>

<style>
</style>