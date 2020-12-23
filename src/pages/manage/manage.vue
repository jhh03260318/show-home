<template>
  <!-- 管理员管理 -->
  <div class="manage">
    <!-- 添加管理员 -->
    <el-button type="primary" @click="addmanage">添加</el-button>
    <!-- 管理员列表组件 -->
    <v-managelist  @updatemanage="updatemanage($event)"></v-managelist>
    <!-- 添加或者修改组件 -->
    <v-add :info="info" ref="update"></v-add>
  </div>
</template>

<script>
// 引入管理员列表组件
import vManagelist from "./manageList";
// 引入添加或者修改组件
import vAdd from "./addmanage";
export default {
  data() {
    return {
      // 添加或者修改功能子组件的信息
      info: {
        isshow: false, //控制显示和隐藏
        title: "", //弹框的标题
        isadd: true //判断是添加还是修改，默认是添加
      }
    };
  },
  // 注册组件
  components: {
    vManagelist,
    vAdd
  },
  methods: {
    //添加管理员
    addmanage() {
      this.info.isshow = true;
      this.info.title = "添加管理员";
      this.info.isadd = true;
    },
    //修改管理员
    updatemanage(id) {
      this.info.isshow = true;
      this.info.title = "修改管理员";
      this.info.isadd = false;
      this.$refs.update.updatemanage(id);
    }
  }
};
</script>

<style scoped>
.el-button {
  width: 60px;
  padding: 10px 0px;
}
.manageList {
  margin-top: 20px;
}
</style>