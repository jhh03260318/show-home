// 引入接口数据
import {SelectMemberList} from "../../utils/request";
// 存储数据模块
const state = {
    // 会员列表
    memberList:[]
};
// 修改state模块
const mutations = {
    // 修改会员列表
    changMemberList(state,arr){
        state.memberList = arr;
    }
};
// 修改mutations模块
const actions = {
    MemberListActions(context){
        // 请求数据接口
        SelectMemberList().then(res=>{
            if(res.data.code===200){
                context.commit("changMemberList",res.data.list);
            }
        })
    }
};
// 将数据传递出去
const getters = {
    MemberList(state){
        return state.memberList;
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}