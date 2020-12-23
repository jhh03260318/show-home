<template>
<!-- 会员管理 -->
  <div class="member">
      <!-- <el-button type="primary" @click="add">添加</el-button> -->
      <!-- 添加子组件 -->
      <v-add :info="info" ref="updatemember"></v-add>
      <!-- 会员列表组件 -->
      <v-memberlist @updatemember="updatmember($event)"></v-memberlist>
  </div>
</template>

<script>
// 引入修改组件
import vAdd from "./addmember";
// 引入会员列表组件
import vMemberlist from "./memberList";
export default {
    data(){
        return{
            info:{
                isshow:false,
                title:'',
            }
        }
    },
    components:{
        vAdd,
        vMemberlist
    },
    methods:{
        updatmember(uid){
            this.info.isshow = true,
            this.info.title = "添加会员",
            this.$refs.updatemember.getmember(uid);
        }
    }
}
</script>

<style>

</style>