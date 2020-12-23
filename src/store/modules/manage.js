//引入接口文件
import { SelectRole, SelectManage, SeletctManageCount } from '../../utils/request'

//存储数据模块
const state = {
    roleList: [],//所有角色信息
    manageList: [],//所有管理员信息
    // 每页显示是的条数
    size: 2,
    // 当前页码数
    page: 1,
    //总的记录条数
    count: 0,
};
//修改state模块
const mutations = {
    // 角色信息
    changRoleList(state, arr) {
        state.roleList = arr
    },
    // 管理员信息
    changManageList(state, arr) {
        state.manageList = arr;
    },
    //管理员总数
    changManageCount(state, count) {
        state.count = count;
    },
    //当前第几页
    changPage(state, page) {
        state.page = page;
    }
};
//修改mutitions模块
const actions = {
    // 角色信息
    roleListAction(context) {
        //请求接口数据
        SelectRole().then(res => {
            if (res.data.code === 200) {
                //修改mutations的changRoleLit
                context.commit("changRoleList", res.data.list);
            }
        })
    },
    //管理员信息
    mangeListAction(context) {
        let params = {
            size: context.state.size,
            page: context.state.page,
        }
        SelectManage(params).then(res => {
            if (res.data.code === 200) {
                if ((res.data.list === null || res.data.list.SelectManage === 0) && context.state.page > 1) {
                    let newpage = context.state.page - 1;
                    context.commit("changPage", newpage);
                    context.dispatch("mangeListAction");
                } else {
                    context.commit("changManageList", res.data.list);
                }

            }
        })
    },
    //管理员总数，用于分页
    manageCountAction(context) {
        SeletctManageCount().then(res => {
            if (res.data.code = 200) {
                context.commit("changManageCount", res.data.list[0].total);
            }
        });
    },
    //修改页码数
    changPageAction(context, num) {
        context.commit("changPage", num);
    }
};
//将拿到的数据返回
const getters = {
    roleList(state) {
        return state.roleList;
    },
    manageList(state) {
        return state.manageList;
    },
    manageCount(state) {
        return state.count;
    },
    manageSize(state) {
        return state.size;
    }
};

//暴露模块
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}