//引入接口数据
import { SelectRole } from '../../utils/request';

//存储数据模块
const state = {
    roleList: []
};
//修改state模块
const mutations = {
    changRoleList(state, arr) {
        state.roleList = arr;
    }
}
//修改mutations模块
const actions = {
    roleListAction(context) {
        //请求数据
        SelectRole().then(res => {
            if (res.data.code === 200) {
                context.commit("changRoleList", res.data.list)
            }
        })
    }
}

//将数据传递出去，优化
const getters = {
    roleList(state) {
        return state.roleList;
    }
}

//将所有的模块暴露出去
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}