<template>
  <!-- 秒杀活动 -->
  <div class="seckill">
    <!-- 添加秒杀活动 -->
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 秒杀活动列表 -->
    <v-seckilllist @updateseckill="updateseckill($event)"></v-seckilllist>
    <!-- 添加或者修改子组件 -->
    <v-add :info="info" ref="updateseckill"></v-add>
  </div>
</template>

<script>
// 引入添加秒杀活动
import vAdd from "./addseckill";
// 引入秒杀活动列表
import vSeckilllist from "./seckillList";
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
    vSeckilllist
  },
  methods: {
    // 添加
    add() {
      this.info.isshow = true, 
      this.info.title = "添加活动";
      this.info.isadd = true;
    },
    // 编辑
    updateseckill(id) {
      this.info.isshow = true,
      this.info.title = "修改活动";
      this.info.isadd = false;
      this.$refs.updateseckill.getSeckill(id);
    }
  }
};
</script>

<style>
</style>