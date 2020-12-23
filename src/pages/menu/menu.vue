<template>
  <div class="menu">
    <!-- 添加菜单 -->
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加和修改组件 -->
    <v-add :info="info"></v-add>
    <!-- 菜单列表 -->
    <v-menulist></v-menulist>
  </div>
</template>

<script>
//引入菜单列表组件
import vMenulist from "./menuList";
import vAdd from "./addmenu";
export default {
  components: {
    vMenulist,
    vAdd
  },
  data() {
    return {
      info: {
        menuid: "",
        show: false,
        title: ""
      }
    };
  },
  methods:{
    add(){
      this.info.show = true,
      this.info.title = '添加菜单'
    }
  }
};
</script>

<style scoped>
.el-button {
  width: 60px;
  padding: 12px 0px;
}
.menuList {
  margin-top: 20px;
}
</style>