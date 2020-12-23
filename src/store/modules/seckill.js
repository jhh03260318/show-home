// 引入接口数据
import { SelecScekillList } from "../../utils/request";

// 存储数据模块
const state = {
    seckillList: [],//秒杀列表
};
// 修改state模块
const mutations = {
    // 修改秒杀列表
    changSeckillList(state, arr) {
        state.seckillList = arr;
    }
};

// 修改mutations模块
const actions = {
    SeckillListActions(context) {
        // 请求接口数据
        SelecScekillList().then(res => {
            if (res.data.code === 200) {
                context.commit("changSeckillList", res.data.list);
            }
        })
    }
};

// 传递数据，优化
const getters = {
    seckillList(state) {
        return state.seckillList;
    }
};

// 暴露所有的模块
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}