//作用范围：state,mutations,,getters

//将所有的内容暴露出去，然后在store中的index.js中调用

//用于存储数据
export const state = {
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
};
//用于修改state中的数据
export const mutations = {
    changuser(state, arr) {
        state.user = arr;
        if(arr){
            sessionStorage.setItem('user',JSON.stringify(arr));
        }else{
            sessionStorage.removeItem('user');
        }
    }
};
//用于优化传值
export const getters = {
    user(state) {
        return state.user;
    }
};