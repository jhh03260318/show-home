//引入请求数据接口文件
import { MenuList,SelectMenuByOne } from '../../utils/request';

//设置存储数据模块
const state = {
    //菜单列表
    menuList: [],
    //一条菜单数据
    oneMenu:{}
};
//设置操作state的模块
const mutations = {
    //菜单列表
    changList(state, arr) {
        state.menuList = arr;
    },
    //一条菜单数据
    changOneMenu(sate,arr){
        state.oneMenu = arr;
    }
}
//设置操作mutations的模块
const actions = {
    menuListAction(context) {
        //请求接口
        MenuList({ istree: true }).then(res => {
            //如果状态码为200时候
            if (res.data.code === 200) {
                context.commit("changList", res.data.list);
            }
        })
    },
    oneMenuAction(context,id){
        SelectMenuByOne({id}).then(res=>{
            // 如果状态码为200时候
            if (res.data.code === 200) {
                context.commit("changOneMenu", res.data.list);
            }
        })
    }
}
//优化
const getters = {
    menuList(state) {
        return state.menuList;
    },
    oneMenu(state){
        return state.oneMenu;
    }
}


//暴露出去，以便menuList.vue能够接受
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
