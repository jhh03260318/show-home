//作用范围:actions

//将所有的内容暴露，以便store中的index.js文件能够引用
export default {
    User(context,user){
        context.commit("changuser",user);
    }
}