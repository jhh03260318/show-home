<template>
  <!-- 登录界面 -->
  <div class="login">
    <div class="login-box">
      <h3>登录</h3>
      <el-input
        placeholder="请输入用户名"
        v-model="user.username"
        clearable
      ></el-input>
      <el-input
        placeholder="请输入密码"
        v-model="user.password"
        show-password
      ></el-input>
      <div class="login-btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// 引入接口
import { UserLogin } from "../../utils/request";
// 引入公共消息弹窗
import { successAlert, warningAlert } from "../../utils/alert.js";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  // 登录
  methods: {
    ...mapActions({
      User: "User"
    }),
    login() {
      //方式一
      // UserLogin(this.user).then(res => {
      //   if (res.data.code === 200 && res.data.msg === "登录成功") {
      //     successAlert(res.data.msg);
      //     // 存储下token值
      //     if (localStorage.getItem("user") !== null) {
      //       localStorage.removeItem("user");
      //     }
      //     localStorage.setItem("user", JSON.stringify(res.data.list));
      //     this.$router.push("/");
      //   } else {
      //     warningAlert(res.data.msg);
      //   }
      // });

      //方式二
      UserLogin(this.user).then(res => {
        if (res.data.code === 200 && res.data.msg === "登录成功") {
          if (res.data.list.status === 1) {
            successAlert(res.data.msg);
            //将token值存入vux的store中
            this.User(res.data.list);
            this.$router.push("/");
          }else{
            warningAlert("用户状态异常，请联系管理员");
            return;
          }
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#553443, #2f3d60);
  position: fixed;
  left: 0;
  top: 0;
  position: relative;
}
.login-box {
  width: 502px;
  height: 302px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
h3 {
  font-size: 24px;
  width: auto;
  text-align: center;
  line-height: 24px;
  margin-top: 36px;
}
.el-input,
.el-button {
  width: 320px;
  height: 40px;
  margin-top: 24px;
}
</style>