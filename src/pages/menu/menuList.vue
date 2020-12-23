<template>
  <div class="menuList">
    <!--菜单列表，并对其进行删除和修改  -->
    <el-table
      :data="menuList"
      stripe
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180">
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <!-- slot-scope是elementui的一个获取某一行数据的值 -->
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="updatemenu(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deltemenu(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑 -->
    <v-updatemenu
      :info="info"
      ref="add"
      @menuListRefresh="menuListRefresh"
    ></v-updatemenu>
  </div>
</template>

<script>
//引入编辑组件
import vUpdatemenu from "./updatemenu.vue";
import { mapGetters, mapActions } from "vuex";
import { DeleteMenuByOne } from "../../utils/request";
//引入公共消息弹框提示
import { successAlert, warningAlert } from "../../utils/alert.js";
export default {
  data() {
    return {
      info: {
        menuid: "",
        show: false,
        title: ""
      }
    };
  },
  components: {
    vUpdatemenu
  },
  computed: {
    ...mapGetters({
      menuList: "menu/menuList"
    })
  },
  methods: {
    ...mapActions({
      MenuList: "menu/menuListAction"
    }),
    //点击编辑
    updatemenu(id) {
      this.info.show = true;
      this.info.title = "编辑菜单";
      this.info.id = id;
      this.$refs.add.getDetail(id);
    },
    //子组件发生变化时，需要刷新父组件里的数据，需要重新执行一次该方法
    menuListRefresh() {
      this.MenuList();
    },
    //根据Id删除一条菜单信息
    deltemenu(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteMenuByOne({ id: id }).then(res => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.MenuList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.MenuList();
  }
};
</script>

<style scoped>
.el-table-column {
  height: 50px;
}
.el-button {
  width: 50px;
  height: 30px;
  padding: 0;
}
</style>