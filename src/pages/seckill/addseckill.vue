<template>
  <!-- 添加秒杀活动 -->
  <div class="seckill">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 活动名称 -->
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <!-- 活动期限 -->
        <el-form-item label="活动期限" prop="time">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            @change="changtime"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 一级分类 -->
        <el-form-item label="一级分类" prop="first_cateid">
          <el-select
            v-model="ruleForm.first_cateid"
            placeholder="请选择一级分类"
            @change="categoryListChange"
          >
            <el-option
              v-for="item in categorylist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类" prop="second_cateid">
          <el-select
            v-model="ruleForm.second_cateid"
            placeholder="请选择二级分类"
            @change="secondecategorychange"
          >
            <el-option
              v-for="item in secondeCategory"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品 -->
        <el-form-item label="商品" prop="goodsid">
          <el-select v-model="ruleForm.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="ruleForm.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!-- 添加修改重置 -->
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            v-if="info.isadd"
            >添加</el-button
          >
          <el-button
            type="primary"
            @click="updateSeckillByOne('ruleForm')"
            v-else
            >修改</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="cancle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 引入公共消息组件
import { successAlert, warningAlert } from "../../utils/alert";
// 引入接口数据
import {
  InsertScekill,
  SelectSeckillByOne,
  UpdataSeckill
} from "../../utils/request";
export default {
  // 接受子组件的信息
  props: ["info"],
  data() {
    return {
      time: [],
      secondeCategory: "", //二级分类
      goods: [], //商品信息
      ruleForm: {
        title: "", //商品分类名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品分类一级编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1 //状态
      },
      rules: {
        title: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          InsertScekill(this.ruleForm).then(res => {
            if (res.data.code === 200) {
              successAlert(res.data.msg);
              this.cancle();
              this.seckillListActions();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消添加
    cancle() {
      this.ruleForm = {
        title: "", //商品分类名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品分类一级编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1 //状态
      };
      this.time = [];
      this.secondeCategory = "";
      this.info.isshow = false;
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.time = [];
    },
    ...mapActions({
      CategoryListActon: "category/CategoryListActon", //商品分类
      goodslistAction: "goods/GoodsListActions", //商品列表
      goodscountAction: "goods/GoodsCountActions", //商品总数
      changpageAction: "goods/GoodsPageActions",
      seckillListActions: "seckill/SeckillListActions"
    }),
    // 当商品一级分类改变时
    categoryListChange() {
      this.ruleForm.second_cateid = "";
      // this.secondeCategory = this.categorylist[e].children;
      var index = this.categorylist.findIndex(
        item => item.id == this.ruleForm.first_cateid
      );
      this.secondeCategory = this.categorylist[index].children;
    },
    // 二级分类改变时
    secondecategorychange(e) {
      // 二级分类改变时，商品信息清空
      this.goods = [];
      this.ruleForm.goodsid = "";
      //   遍历二级分类
      for (let i in this.goodslist) {
        var secid = this.goodslist[i].second_cateid;
        // 当二级分类中的id与商品分类的id相等的时候
        if (secid === e) {
          this.goods.push(this.goodslist[i]);
        }
      }
    },
    // 时间文本框发生变化时
    changtime(time) {
      this.ruleForm.begintime = time[0];
      this.ruleForm.endtime = time[1];
    },
    // 根据id获取一条秒杀活动
    getSeckill(id) {
      SelectSeckillByOne({ id }).then(res => {
        if (res.data.code === 200) {
          this.ruleForm = res.data.list;
          this.ruleForm.id = id;
          this.time.push(this.ruleForm.begintime);
          this.time.push(this.ruleForm.endtime);
        }
      });
    },
    // 修改活动信息
    updateSeckillByOne() {
      UpdataSeckill(this.ruleForm).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancle();
          this.seckillListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      categorylist: "category/CategoryList", //商品分类列表
      goodslist: "goods/GoodsList", //商品列表
      goodscount: "goods/GoodsCount", //商品总数
      goodssize: "goods/GoodsSize" //每页显示多少条
    })
  },
  mounted() {
    this.CategoryListActon(); //商品分类
    this.goodslistAction(); //商品
  }
};
</script>

<style scoped>
.el-date-editor {
  width: 100%;
}
</style>