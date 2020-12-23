<template>
  <!-- 首页 -->
  <div class="index">
    <el-container>
      <!-- 左侧导航栏 -->
      <el-aside width="150px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/manage">管理员管理</el-menu-item>
          </el-submenu> -->
          <template v-for="(item) in user.menus">
            <el-submenu :index="item.title" :key="item.id" v-if="item.children">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>{{item.title}}</span>
              </template>
              <template v-for="i in item.children">
                <el-menu-item :index="i.url" :key="i.id">{{i.title}}</el-menu-item>
              </template>
            </el-submenu>
            <!-- 这里显示没有目录的,即没有children -->
          <el-menu-item v-if="!item.children" :key="item.id" :index="item.url">{{item.title}}</el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <!-- 头部和身体 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <span>管理员</span>
          <i class="el-icon-setting"></i>
            <el-button type="primary" @click="goout">退出</el-button>
        </el-header>
        <!-- 身体 -->
        <el-main>
          <!-- 面包屑导航 -->
          <div class="crumbs-nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 视图出口 -->
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user" //左侧导航菜单信息
    })
  },
  methods:{
    goout(){
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            sessionStorage.removeItem("user");
            this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    
    }
  }
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
  line-height: 60px;
}
.el-aside {
  background-color: #20222a;
  color: white;
  text-align: center;
  line-height: 200px;
  height: 100vh;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-breadcrumb {
  height: 54px;
  line-height: 54px;
  margin-top: -25px;
}
</style>