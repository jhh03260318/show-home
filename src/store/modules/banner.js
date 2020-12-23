// 引入接口数据
import { SelecBannerList} from "../../utils/request";

// 存储数据模块
const state ={
    bannerList:[],//轮播图列表
};
// 修改state模块
const mutations = {
    // 修改轮播图列表
    changBannerList(state,arr){
        state.bannerList = arr;
    }
};

// 修改mutations模块
const actions = {
    BannerListActions(context){
        // 请求接口数据
        SelecBannerList().then(res=>{
            if(res.data.code===200){
                context.commit("changBannerList",res.data.list);
            }
        })
    }
};

// 传递数据，优化
const getters = {
    bannerList(state){
        return state.bannerList;
    }
};

// 暴露所有的模块
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}