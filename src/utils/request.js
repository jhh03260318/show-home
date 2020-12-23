import { successAlert, warningAlert } from "./alert";
//该文件主要用于请求接口数据，并将请求到的数据暴露出去
//引入axios
import axios from 'axios';
import { Form } from 'element-ui';
//引入qs，qs用于登录时将请求的参数转换为字符串格式
import qs from 'qs';

import store from '../store/index';

const baseUrl = '/api';

//请求拦截
axios.interceptors.request.use(config => {
    console.group("请求:", config.url);
    //取除存放在store的token值
    if (config.url !== baseUrl + '/api/userlogin') {
        config.headers.authorization = store.state.user.token;
    }
    return config;
});

//响应拦截
axios.interceptors.response.use(res => {
    console.group('本次响应的接口路径' + res.config.url);
    console.log(res);
    console.groupEnd('响应拦截结束');
    return res;
});

//添加菜单
export const addMenu = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/menuadd',
        data: qs.stringify(data)
    });
};

//菜单列表,请求的参数为布尔值
export const MenuList = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/menulist',
        params: params
    })

};

//查询一条菜单数据
export const SelectMenuByOne = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/menuinfo',
        params: params
    });
};

//修改菜单
export const UpdateMenuByOne = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/menuedit',
        data: qs.stringify(data)
    })
};
//删除一条菜单
export const DeleteMenuByOne = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/menudelete',
        data: data
    })
};
//添加角色
export const InsertRole = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/roleadd',
        data: qs.stringify(data)
    });
};

//查询所有角色信息
export const SelectRole = () => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/rolelist'
    });
};


//获取单个角色信息
export const SelectRoleByOne = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/roleinfo',
        params: params
    })
};

//修改单个角色的信息
export const UpdateRoleByOne = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/roleedit',
        data: qs.stringify(data)
    });
};

//删除单个角色的信息
export const DeleteRoleByOne = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/roledelete',
        data: data
    });
};

//添加管理员
export const InsertManage = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/useradd',
        data: qs.stringify(data)
    });
};

//获取所有的管理员列表
export const SelectManage = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/userlist',
        params,
    });
};

//获取管理员总数
export const SeletctManageCount = () => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/usercount',
    });
};

//获取一条管理员信息
export const SelectManageByOne = (id) => {
    return axios({
        method: "get",
        url: baseUrl + "/api/userinfo",
        params: id
    });
};

//修改一条管理员信息
export const UpdateManageByOne = (data) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/useredit",
        data: qs.stringify(data)
    });
};
//删除一条管理员信息
export const DeleteManageByOne = (uid) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/userdelete",
        data: uid
    });
}

//管理员登录
export const UserLogin = (data) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/userlogin",
        data: qs.stringify(data)
    });
};

//商品分类添加
export const InsertCategory = (category) => {
    //携带文件流请求数据接口
    var form = new FormData();
    for (let i in category) {
        form.append(i, category[i]);
    }
    return axios({
        method: "post",
        url: baseUrl + "/api/cateadd",
        data: form
    })
};

// 商品分类列表
export const SelectCategory = (bool) => {
    return axios({
        method: "get",
        url: baseUrl + "/api/catelist",
        params: bool
    });
};

// 通过id获取一条商品分类的信息
export const SelectCategoryByOne = (id) => {
    return axios({
        method: "get",
        url: baseUrl + "/api/cateinfo",
        params: id
    });
};
// 修改一条商品分类信息
export const UpdateCatrgoryByOne = (category) => {
    //携带文件流请求数据接口
    var form = new FormData();
    for (let i in category) {
        form.append(i, category[i]);
    }
    return axios({
        method: "post",
        url: baseUrl + "/api/cateedit",
        data: form
    })
};

// 删除一条商品分类
export const DeleteCategoryByOne = (id) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/catedelete",
        data: id
    });
};

// 添加一条商品规格
export const InsertSpec = (data) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/specsadd",
        data: qs.stringify(data),
    });
};

// 商品规格总数,用于分页
export const SelectSpecCount = () => {
    return axios({
        method: "get",
        url: baseUrl + "/api/specscount",
    });
};
// 商品规格列表
export const SelectSpecList = (params) => {
    return axios({
        method: "get",
        url: baseUrl + "/api/specslist",
        params
    });
};

// 根据id获取一条商品规格信息
export const SelectSpecByOne = (id) => {
    return axios({
        method: "get",
        url: baseUrl + "/api/specsinfo",
        params: id
    });
};

// 修改一条商品规格信息
export const UpdataSpec = (data) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/specsedit",
        data: qs.stringify(data),
    });
};

// 删除一条商品规格信息
export const DeleteSpecByOne = (id) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/specsdelete",
        data: id,
    });
};

// 添加商品
export const InsertCommange = (goods) => {
    //携带文件流请求数据接口
    var form = new FormData();
    for (let i in goods) {
        form.append(i, goods[i]);
    }
    return axios({
        method: "post",
        url: baseUrl + "/api/goodsadd",
        data: form
    })
};

// 获取商品总数
export const SelectGoodsCount = () => {
    return axios({
        method: "get",
        url: baseUrl + "/api/goodscount",
    });
};
// 获取商品列表，分页
export const SelectGoodsList = (params) => {
    return axios({
        method: "get",
        url: baseUrl + "/api/goodslist",
        params
    });
};

// 根据id获取一条商品信息
export const SelectGoodsByOne = (id) => {
    return axios({
        method: "get",
        url: baseUrl + "/api/goodsinfo",
        params: id
    });
};

// 根据id修改一条商品信息
export const UpdateGoodsByOne = (goods) => {
    //携带文件流请求数据接口
    var form = new FormData();
    for (let i in goods) {
        form.append(i, goods[i]);
    }
    return axios({
        method: "post",
        url: baseUrl + "/api/goodsedit",
        data: form
    })
};

// 根据id删除一条商品信息
export const DeleteGoodsByOne = (id) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/goodsdelete",
        data: id,
    });
};

// 会员列表
export const SelectMemberList = () => {
    return axios({
        method: "get",
        url: baseUrl + "/api/memberlist"
    });
};
// 根据id获取一条会员信息
export const SelectMemberByOne = (id) => {
    return axios({
        method: "get",
        url: baseUrl + "/api/memberinfo",
        params: id
    });
};

// 修改会员信息
export const UpdataMember = (data) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/memberedit",
        data: qs.stringify(data),
    });
};

// 添加轮播图
export const InsertBanner = (banner) => {
    //携带文件流请求数据接口
    var form = new FormData();
    for (let i in banner) {
        form.append(i, banner[i]);
    }
    return axios({
        method: "post",
        url: baseUrl + "/api/banneradd",
        data: form
    })
};
// 获取轮播图列表
export const SelecBannerList = () => {
    return axios({
        method: "get",
        url: baseUrl + "/api/bannerlist"
    });
};