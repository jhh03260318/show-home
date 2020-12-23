<template>
  <!-- 会员列表 -->
  <div class="memberList">
    <!-- 表格 -->
    <el-table :data="memberList" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="updatmember(scope.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed:{
        ...mapGetters({
            memberList:"member/MemberList",
        }),
    },
    methods:{
        ...mapActions({
            memberListAction:"member/MemberListActions"
        }),
        // 编辑
        updatmember(uid){
            this.$emit("updatemember",uid);
        }
    },
    mounted(){
        this.memberListAction();
    }
};
</script>

<style>
</style>