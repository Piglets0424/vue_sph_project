<template>
  <el-form :inline="true" :model="classification" class="demo-form-inline">
    <el-form-item label="一级分类">
      <el-select
        v-model="CategoryAId"
        placeholder="请选择一级分类"
        @change="getCategoryB"
        :disabled="!isDisabled"
      >
        <el-option
          :label="sortA.name"
          :value="sortA.id"
          v-for="sortA in classification.CategoryA"
          :key="sortA.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        v-model="CategoryBId"
        placeholder="请选择二级分类"
        @change="getCategoryC"
        :disabled="!isDisabled"
      >
        <el-option
          :label="sortB.name"
          :value="sortB.id"
          v-for="sortB in classification.CategoryB"
          :key="sortB.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        v-model="CategoryCId"
        placeholder="请选择三级分类"
        @change="handlerCategoryC"
        :disabled="!isDisabled"
      >
        <el-option
          :label="sortC.name"
          :value="sortC.id"
          v-for="sortC in classification.CategoryC"
          :key="sortC.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Classification",
  props:['isDisabled'],
  data() {
    return {
      classification: {
        CategoryA: [],
        CategoryB: [],
        CategoryC: [],
      },
      CategoryAId: "",
      CategoryBId: "",
      CategoryCId: "",
    };
  },
  mounted() {
    this.$API.attr
      .reqGetCategory1()
      .then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.classification.CategoryA = res.data;
        } else {
          this.$message.error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // 获取二级分类
    getCategoryB() {
      // 一级分类发生变化二级分类三级分类要置空重新发送请求
      this.classification.CategoryB = [];
      this.classification.CategoryC = [];
      this.CategoryBId = "";
      this.CategoryCId = "";
      //   console.log(this.CategoryAId);
      this.$API.attr
        .reqGetCategory2(this.CategoryAId)
        .then((res) => {
          //   console.log(res);
          if (res.code == 200) {
            this.classification.CategoryB = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取三级分类
    getCategoryC() {
      // 当二级分类发生变化时要将三级分类置空
      this.classification.CategoryC = [];
      this.CategoryCId = "";
      this.$API.attr
        .reqGetCategory3(this.CategoryBId)
        .then((res) => {
          //   console.log(res);
          if (res.code == 200) {
            this.classification.CategoryC = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // // 当点击三级分类时获取属性值列表
    handlerCategoryC() {
      let { CategoryAId, CategoryBId, CategoryCId } = this;
      this.$emit("attrIdList",{ CategoryAId, CategoryBId, CategoryCId } );
    },
  },
};
</script>

<style></style>
