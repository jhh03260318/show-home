// 引入接口数据
import { SelectGoodsCount, SelectGoodsList } from "../../utils/request";

// 存储数据模块
const state = {
    // 每页显示条数
    size: 2,
    // 总记录数
    count: 0,
    // 当前页码数
    page: 1,
    // 商品列表
    GoodsList: []
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
    // 修改商品列表
    changeGoodsList(state, arr) {
        state.GoodsList = arr;
    }
};

// 修改mutations模块
const actions = {
    // 商品总数
    GoodsCountActions(context) {
        // 请求数据接口
        SelectGoodsCount().then(res => {
            if (res.data.code === 200) {
                context.commit("changCount", res.data.list[0].total);
            }
        })
    },
    // 当前页数
    GoodsPageActions(context, page) {
        context.commit("changPage", page);
    },
    // 商品列表
    GoodsListActions(context) {
        var params = {
            size: context.state.size,
            page: context.state.page
        };
        // 请求数据接口
        SelectGoodsList(params).then(res => {
            if (res.data.code === 200) {
                if ((res.data.list === null || res.data.list.length === 0) && context.state.page > 1) {
                    context.commit("changPage", context.state.page - 1);
                    context.dispatch("GoodsListActions");
                    return;
                }
                context.commit("changeGoodsList", res.data.list);
            }
        });
    }
};
// 将数据传递出去，优化
const getters = {
    GoodsCount(state) {
        return state.count;
    },
    GoodsList(state) {
        return state.GoodsList;
    },
    GoodsSize(state) {
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