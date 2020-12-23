<template>
  <div class="role">
    <!-- 添加角色 -->
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 角色列表组件 -->
    <v-rolelist @updateRole="updateRole($event)"></v-rolelist>
    <!-- 添加和删除角色组件 -->
    <v-add :info="info" ref="updaterole"></v-add>
  </div>
</template>

<script>
//引入添加角色组件
import vAdd from "./addroles";
//引入角色列表组件
import vRolelist from "./roleList";
export default {
  data() {
    return {
      info: {
        show: false,
        title: "",
        isadd: true
      },
      roleid: ""
    };
  },
  components: {
    vAdd,
    vRolelist
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.title = "添加菜单";
      this.info.isadd = true;
    },
    updateRole(id) {
      this.info.show = true;
      this.info.title = "修改菜单";
      this.info.isadd = false;
      this.$refs.updaterole.updaterole(id);
    }
  }
};
</script>

<style scoped>
.el-button {
  width: 60px;
  padding: 10px 0px;
}
.roleList {
  margin-top: 20px;
}
</style>