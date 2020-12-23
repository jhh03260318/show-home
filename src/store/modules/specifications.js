// 引入接口数据
import { SelectSpecCount, SelectSpecList } from "../../utils/request";
// 存储数据模块
const state = {
    // 每页显示条数
    size: 2,
    // 总记录数
    count: 0,
    // 当前页码数
    page: 1,
    // 商品规格列表
    SpecList: []
};
// 修改state模块
const mutations = {
    // 修改总记录数
    changCount(state, count) {
        state.count = count;
    },
    //修改当前页码数
    changPage(state, page) {
        state.page = page;
    },
    // 修改商品规格列表
    changeSpecList(state, arr) {
        state.SpecList = arr;
    }
};
// 修改mutations模块
const actions = {
    // 商品规格总数
    SpectCountAction(context) {
        // 请求数据接口
        SelectSpecCount().then(res => {
            if (res.data.code === 200) {
                context.commit("changCount", res.data.list[0].total);
            }
        })
    },
    // 当前页数
    SpecPageActions(context, page) {
        context.commit("changPage", page);
    },
    // 商品规格列表，分页
    SpecListAction(context) {
        let cpage = {
            size: context.state.size,
            page: context.state.page
        }
        // 请求数据接口
        SelectSpecList(cpage).then(res => {
            if (res.data.code === 200) {
                if ((res.data.list === null || res.data.list.length === 0) && context.state.page > 1) {
                    var page = context.state.page - 1;
                    context.commit("changPage", page);
                    context.dispatch('SpecListAction');
                }
                context.commit("changeSpecList", res.data.list);
            }
        })
    }
};
// 将数据传递，优化
const getters = {
    // 商品规格总数
    SpecCount(state) {
        return state.count;
    },
    // 商品规格列表，分页
    SpecList(state) {
        return state.SpecList;
    },
    // 每页显示数
    SpecSize(state) {
        return state.size;
    }
};

// 将所有模块暴露出去
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}