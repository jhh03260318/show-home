//引入接口数据文件
import {SelectCategory} from "../../utils/request";

//存储数据模块
const state = {
    // 商品分类列表
    categoryList:[],
};

//修改state模块
const mutations = {
    // 商品分类列表
    changCategoryList(state,arr){
        state.categoryList = arr;
    },
};
// 修改mutations模块
const actions = {
    // 商品分类列表
    CategoryListActon(context){
        // 调用接口数据
        SelectCategory({istree:true}).then(res=>{
            if(res.data.code===200){
                context.commit("changCategoryList",res.data.list);
            }
        })
    }
}
//将数据传递出去，优化
const getters = {
    CategoryList(state){
        return state.categoryList;
    }
}

// 将所有的模块暴露出去
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}