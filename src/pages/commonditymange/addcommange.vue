<template>
  <div class="addcommange">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
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
          >
            <el-option
              v-for="item in secondeCategory"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="ruleForm.goodsname"></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item label="价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <!-- 市场价格 -->
        <el-form-item label="市场价格" prop="market_price">
          <el-input v-model="ruleForm.market_price"></el-input>
        </el-form-item>
        <!-- 文件上传 -->
        <el-form-item label="图片" prop="img">
          <div class="box-img">
            <h3>+</h3>
            <img v-if="imageUrl" :src="imageUrl" alt="" />
            <input type="file" @change="changImg" />
          </div>
        </el-form-item>
        <!-- 商品规格 -->
        <el-form-item label="商品规格" prop="specsid">
          <el-select
            v-model="ruleForm.specsid"
            placeholder="请选择规格"
            @change="changSpecs"
          >
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item label="规格属性" prop="specsattr">
          <el-select v-model="ruleForm.specsattr" placeholder="请选择规格属性">
            <el-option
              v-for="item in secondeSpecs"
              :key="item.id"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否新品 -->
        <el-form-item label="是否新品" prop="isnew">
          <el-radio-group v-model="ruleForm.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 是否热卖 -->
        <el-form-item label="是否热卖" prop="ishot">
          <el-radio-group v-model="ruleForm.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="ruleForm.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!-- 富文本编辑器 -->
        <el-form-item label="商品描述" prop="description">
          <div id="editor"></div>
        </el-form-item>
        <!-- 添加删除修改 -->
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            v-if="info.isadd"
            >添加</el-button
          >
          <el-button type="primary" @click="updateGoods('ruleForm')" v-else
            >修改</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 引入公共消息组件
import { successAlert, warningAlert } from "../../utils/alert";
// 引入富文本编辑器
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
// 引用数据接口
import {
  InsertCommange,
  SelectGoodsByOne,
  UpdateGoodsByOne
} from "../../utils/request";
export default {
  // 接受父组件的值
  props: ["info"],
  data() {
    return {
      // 富文本的内容
      editor: "",
      imageUrl: "", //图片路径
      secondeCategory: "", //二级分类
      secondeSpecs: "", //规格属性
      ruleForm: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //上传文件
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品     1-是 2-否
        ishot: 1, //是否热卖推荐 1-是 2-否
        status: 1 //状态1正常2禁用
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //显示图片
    changImg(e) {
      //获取文件流信息
      let file = e.target.files[0];
      //判断图片大小
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("图片大小不能超过2M");
        return;
      }
      //声明可上传的图片后缀
      var imgsuffix = [".jpg", ".jpeg", ".png", ".gif"];
      var imgsuffixName = file.name.slice(file.name.lastIndexOf("."));
      // 判断上传的图片格式是否符合
      if (!imgsuffix.some(item => item === imgsuffixName)) {
        warningAlert("图片格式上传不正确");
        return;
      } else {
        successAlert("图片格式上传正确");
      }
      //显示获取的图片文件
      this.imageUrl = URL.createObjectURL(file);
      //将文件流信息存入ruleForm中
      this.ruleForm.img = file;
    },
    // 取消添加
    cancel() {
      this.ruleForm = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //上传文件
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品     1-是 2-否
        ishot: 1, //是否热卖推荐 1-是 2-否
        status: 1 //状态1正常2禁用
      };
      this.imageUrl = "";
      this.info.isshow = false;
    },
    //Dialog弹出时触发的事件
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.ruleForm.description);
    },
    ...mapActions({
      CategoryListActon: "category/CategoryListActon", //商品分类
      SpecLists: "spec/SpecListAction", //商品规格列表分页
      SpecCount: "spec/SpectCountAction", //商品规格总数
      SpacePage: "spec/SpecPageActions", //修改当前页数
      goodslistAction: "goods/GoodsListActions", //商品列表
      goodscountAction: "goods/GoodsCountActions" //商品总数
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
    // 当商品规格发生改变时，对应的规格属性也应该发生改变
    changSpecs() {
      this.ruleForm.specsattr = "";
      // this.secondeSpecs = this.specList[e].attrs;
      var index = this.specList.findIndex(
        item => item.id == this.ruleForm.specsid
      );
      this.secondeSpecs = this.specList[index].attrs;
    },
    // 添加商品
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.description = this.editor.txt.html();
          console.log(this.ruleForm);
          // 调用数据接口
          InsertCommange(this.ruleForm).then(res => {
            if ((res.data.code = "200")) {
              successAlert(res.data.msg);
              this.cancel();
              this.goodslistAction();
              this.goodscountAction();
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
    // 根据id获取一条商品信息
    getGoods(id) {
      SelectGoodsByOne({ id }).then(res => {
        if (res.data.code === 200) {
          this.ruleForm = res.data.list;
          this.imageUrl = this.$prefiximgUrl + this.ruleForm.img;
          this.ruleForm.id = id;
          // this.categoryListChange();
          // this.changSpecs();
        }
      });
    },
    // 根据id修改一条商品信息
    updateGoods() {
      this.ruleForm.description = this.editor.txt.html();
      console.log(this.ruleForm);
      UpdateGoodsByOne(this.ruleForm).then(res=>{
        if(res.data.code===200){
          successAlert(res.data.msg);
          this.cancel();
          this.goodslistAction();
          this.goodscountAction();
        }else{
          warningAlert(res.data.msg);
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      categorylist: "category/CategoryList", //商品分类列表
      specList: "spec/SpecList"
    })
  },
  mounted() {
    this.CategoryListActon();
    this.SpecLists();
  }
};
</script>

<style scoped>
.box-img {
  width: 150px;
  height: 150px;
  border: 1px dashed #d9d9d9;
  position: relative;
}

.box-img h3 {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 150px;
  text-align: center;
}

.box-img img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.box-img input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>