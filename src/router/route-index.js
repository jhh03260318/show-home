import Vue from 'vue'
import Router from 'vue-router';
import store from '../store/index';

Vue.use(Router)
//引入login组件
import login from '../pages/login/login.vue';
//引入首页home组件
import home from '../pages/home/home.vue';
// 引入消息组件
import { successAlert, warningAlert } from "../utils/alert";

function url(url) {
  return store.state.user.menus_url.some(item => item === url);
}

const router = new Router({
  routes: [
    //注册login组件
    {
      path: '/login',
      component: login
    },
    //注册首页index组件
    {
      path: '/',
      component: () => import('../pages/index/index.vue'),
      children: [
        {
          path: '',
          name: '首页',
          component: () => import('../pages/home/home.vue')
        },
        {
          path: 'menu',
          name: '菜单管理',
          component: () => import('../pages/menu/menu.vue'),
          beforeEnter(to, from, next) {
            url('/menu') ? next() : next("/");
          }
        },
        {
          path: 'role',
          name: '角色管理',
          component: () => import('../pages/roles/role.vue'),
          beforeEnter(to, from, next) {
            url('/role') ? next() : next("/");
          }
        },
        {
          path: 'manage',
          name: '管理员管理',
          component: () => import('../pages/manage/manage.vue'),
          beforeEnter(to, from, next) {
            url('/manage') ? next() : next("/");
          }
        },
        {
          path: "category",
          name: "商品分类",
          component: () => import('../pages/category/category.vue'),
          beforeEnter(to, from, next) {
            url('/category') ? next() : next("/");
          }
        },
        {
          path: "specifications",
          name: "商品规格",
          component: () => import('../pages/specifications/specifications.vue')
        },
        {
          path: "commonditymange",
          name: "商品管理",
          component: () => import('../pages/commonditymange/commonditymange.vue'),
          beforeEnter(to, from, next) {
            url('/commonditymange') ? next() : next("/");
          }
        },
        {
          path: "member",
          name: "会员管理",
          component: () => import('../pages/member/member.vue'),
          beforeEnter(to, from, next) {
            url('/member') ? next() : next("/");
          }
        },
        {
          path: "banner",
          name: "轮播图管理",
          component: () => import('../pages/banner/banner.vue'),
          beforeEnter(to, from, next) {
            url('/banner') ? next() : next("/");
          }
        },
        {
          path: "seckill",
          name: "秒杀活动管理",
          component: () => import('../pages/seckill/seckill.vue'),
          beforeEnter(to, from, next) {
            url('/seckill') ? next() : next("/");
          }
        },
        {
          path: "*",
          redirect: "/"
        }
      ]
    },
    //任意路由时，跳转首页
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// 全局守卫
router.beforeEach((to, from, next) => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  if (to.path === "/") {
    if (!user.token) {
      warningAlert("登录已过期，请重新登录");
      router.push("/login");
      return;
    }
  }
  next();
})

export default router;
