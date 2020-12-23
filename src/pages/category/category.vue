<template>
  <!-- 商品分类 -->
  <div class="classification">
    <!-- 添加商品分类 -->
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 商品分类列表子组件 -->
    <v-categorylist @updateCategory="updateCategory($event)"></v-categorylist>
    <!-- 添加或者修改的子组件 -->
    <v-add :info="info" ref="updateCatefory"></v-add>
  </div>
</template>

<script>
// 引入接口数据
import { InsertClassification } from "../../utils/request";
// 引入公共消息弹窗
import { successAlert, warningAlert } from "../../utils/alert";
// 引入添加组件
import vAdd from "./addcategory";
//引入商品分类列表组件
import vCategorylist from "./categoryList";
export default {
  data(){
    return{
      info:{
        isshow:false,
        title:"",
        isadd:""
      }
    }
  },
  components:{
    vAdd,
    vCategorylist
  },
  methods:{
    // 添加商品分类
    add(){
      this.info.isshow = true;
      this.info.title = "添加商品分类";
      this.info.isadd = true;
    },
    // 修改商品分类
    updateCategory(id){
      this.info.isshow = true;
      this.info.title = "修改商品分类";
      this.info.isadd = false;
      this.$refs.updateCatefory.getCategory(id);
    }
  }
};
</script>

<style scoped>

</style>