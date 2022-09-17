<template>
  <div>
    <!-- 三级分类 -->
    <el-card style="margin: 20px 0">
      <Classification
        @attrIdList="getAttrIdList"
        :isDisabled="showTable"
      ></Classification>
    </el-card>

    <el-card>
      <!-- 属性表格 -->
      <div v-show="showTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!idList.CategoryCId"
          @click="showAddOrEditAttr"
          >添加属性</el-button
        >
        <el-table
          :data="attrInfoList"
          border
          style="margin-top: 20px; width: 100%"
        >
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="180">
          </el-table-column>
          <el-table-column prop="attrValueList" label="属性值列表">
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                plain
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0 10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" width="200" label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="
                  showAddOrEditAttr();
                  editAttr(row);
                "
              ></el-button>
              <el-popconfirm
                :title="`你确定要删除${row.attrName}属性吗？`"
                @onConfirm="deleteAttrValue(row.id)"
                ><el-button
                  style="margin-left: 10px"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button
              ></el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加修改属性表格 -->
      <div v-show="showAddOrEditAttrTable">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="属性名">
            <el-input
              type="text"
              v-model="AddOrEditAttrTable.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!AddOrEditAttrTable.attrName || !isAdd"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-table
          :data="AddOrEditAttrTable.attrValueList"
          border
          style="margin: 20px 0; width: 70%"
        >
          <el-table-column label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column prop="valueName" label="属性值">
            <template slot-scope="{ row, $index }">
              <el-input
                v-if="row.flag"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                autofocus="true"
                @blur="showSpan(row)"
                @keyup.native.enter="showSpan(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="showInput(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除属性值${row.valueName}吗？`"
                @onConfirm="delValueName($index)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="saveAttrInfo"
          :disabled="AddOrEditAttrTable.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="showAttrTable">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      //
      idList: {
        CategoryAId: 0,
        CategoryBId: 0,
        CategoryCId: 0,
      },
      // 是否可添加属性
      isAdd: true,
      // 表格数据
      attrInfoList: [],
      // 是否显示表格
      showTable: true,
      // 是否显示添加修改属性表格
      showAddOrEditAttrTable: false,
      // 添加修改属性表格数据
      AddOrEditAttrTable: {
        // 属性名
        attrName: "",
        // 属性值
        attrValueList: [],
        // 三级id
        categoryId: 0,
        // 三级
        categoryLevel: 3,
      },
    };
  },
  methods: {
    // 获取id
    getAttrIdList(attrIdList) {
      let { CategoryAId, CategoryBId, CategoryCId } = attrIdList;
      this.idList = {
        CategoryAId,
        CategoryBId,
        CategoryCId,
      };
      this.getAttrInfoList();
    },
    // 获取表格数据
    getAttrInfoList() {
      let { CategoryAId, CategoryBId, CategoryCId } = this.idList;
      this.$API.attr
        .reqGetAttrInfoList(CategoryAId, CategoryBId, CategoryCId)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.attrInfoList = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 显示添加属性表格
    showAddOrEditAttr() {
      (this.AddOrEditAttrTable = {
        // 属性名
        attrName: "",
        // 属性值
        attrValueList: [],
        // 三级id
        categoryId: this.idList.CategoryCId,
        // 三级
        categoryLevel: 3,
      }),
        (this.showTable = false);
      this.showAddOrEditAttrTable = true;
    },
    // 显示属性表格
    showAttrTable() {
      this.showTable = true;
      this.showAddOrEditAttrTable = false;
      this.isAdd = true;
    },
    // 修改按钮
    editAttr(row) {
      // 因为数据结构中出现对象里边套数组 数组里边又嵌套对象 因此需要使用深拷贝解决
      this.AddOrEditAttrTable = cloneDeep(row);
      // 将相应的元素值添加上flag标记用于查看模式与修改模式的切换
      this.AddOrEditAttrTable.attrValueList.forEach((item) => {
        // 必须使用$set将添加进的flag作为响应式数据
        this.$set(item, "flag", false);
      });
    },
    // 添加属性值
    addAttrValue() {
      // 向属性值中添加元素 push
      this.AddOrEditAttrTable.attrValueList.push({
        // 添加时没有id   在已有的属性中新增属性值时具有id  所有的属性值id相同
        attrId: this.AddOrEditAttrTable.id,
        valueName: "",
        // 控制查看模式还是编辑模式
        flag: true,
      });
      // 自动聚焦
      this.$nextTick(() => {
        let index = this.AddOrEditAttrTable.attrValueList.length - 1;
        this.$refs[index].focus();
      });
    },
    // 显示span
    showSpan(row) {
      // 如果属性值为空这不能作为属性值
      // console.log(row);
      if (row.valueName.trim() == "") {
        this.$message.error("请输入正确的属性值");
        this.isAdd = false;
        return;
      }
      // 新增属性值不能与已有的属性值重复
      let isRepat = this.AddOrEditAttrTable.attrValueList.some((item) => {
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) {
        this.$message.error("请勿输入相同的属性值");
        this.isAdd = false;
        return;
      }
      row.flag = false;
      this.isAdd = true;
    },
    // 显示input框
    showInput(row, index) {
      row.flag = true;
      // 自动聚焦
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    delValueName(index) {
      this.AddOrEditAttrTable.attrValueList.splice(index, 1);
    },
    // 保存按钮添加或修改属性
    saveAttrInfo() {
      // 整理参数 空的属性值去除   flag字段去除
      this.AddOrEditAttrTable.attrValueList =
        this.AddOrEditAttrTable.attrValueList.filter((item) => {
          // 属性值不为空
          if (item.valueName != "") {
            // 删除flag
            delete item.flag;
            return true;
          }
        });
      this.$API.attr
        .reqSaveAttrInfo(this.AddOrEditAttrTable)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.showTable = true;
            this.showAddOrEditAttrTable = false;
            this.getAttrInfoList();
            this.$message({
              type: "success",
              message: "保存成功",
            });
            this.getAttrInfoList();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除属性
    deleteAttrValue(id) {
      this.$API.attr
        .reqDeleteAttrValue(id)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getAttrInfoList();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
