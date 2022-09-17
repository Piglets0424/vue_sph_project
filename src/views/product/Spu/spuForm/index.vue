<template>
  <!-- 新增和修改 -->
  <div>
    <el-form :model="spuInfo" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input
          v-model="spuInfo.spuName"
          placeholder="请输入SPU名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选品牌" v-model="spuInfo.tmId">
          <el-option
            :label="trademark.tmName"
            :value="trademark.id"
            v-for="trademark in trademarkList"
            :key="trademark.id"
            >{{ trademark.tmName }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuInfo.description"
          type="textarea"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/upload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlePictureSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrIdAndName"
        >
          <el-option
            :label="saleValue.name"
            :value="`${saleValue.id}:${saleValue.name}`"
            v-for="saleValue in unSelectSaleAttr"
            :key="saleValue.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 30px"
          :disabled="!attrIdAndName"
          @click="addSaleValue"
          >添加销售属性</el-button
        >
        <el-table
          :data="spuInfo.spuSaleAttrList"
          border
          style="margin: 20px 0px; width: 100%"
        >
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名">
          </el-table-column>
          <el-table-column prop="spuSaleAttrValueList" label="属性名称列表">
            <template slot-scope="{ row }">
              <el-tag
                closable
                style="margin: 5px 10px"
                v-for="(saleAttrValue, index) in row.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                @close="handleClose(row, index)"
                >{{ saleAttrValue.saleAttrValueName }}</el-tag
              ><el-input
                class="input-new-tag"
                style="margin: 5px 10px"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="$event.target.blur"
                @blur="handleInputBlurConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                style="margin: 5px 10px"
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="400">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.saleAttrName}吗？`"
                @onConfirm="deleteSaleAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdateInfo">保存</el-button>
        <el-button @click="cancelAddOrEdit(), handleScenes()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      // 照片墙
      dialogImageUrl: "",
      dialogVisible: false,
      // 品牌列表
      trademarkList: [],
      // 销售属性
      baseSaleAttrList: [],
      // spu信息
      spuInfo: {
        category3Id: 0,
        description: "",
        tmId: "",
        spuName: "",
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      // 收集未选择的销售属性id 名称
      attrIdAndName: "",
      // spu图片
      spuImageList: [],
    };
  },
  computed: {
    // 未选择的销售属性
    unSelectSaleAttr() {
      // 将已有的属性从全部属性中过滤出形成新的数组
      return this.baseSaleAttrList.filter((item) => {
        return this.spuInfo.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
    },
  },
  methods: {
    // 取消添加或编辑
    cancelAddOrEdit() {
      // this.spuInfo = {
      //   category3Id: 0,
      //   description: "",
      //   tmId: "",
      //   spuName: "",
      //   spuImageList: [],
      //   spuSaleAttrList: [],
      // };
      // this.attrId = "";
      // this.spuImageList = [];
      // Object.assign 合并对象 this._data为响应式数据  this.$options.data()该实例的data()函数
      Object.assign(this._data, this.$options.data());
    },
    // 场景切换
    handleScenes() {
      this.$emit("changeScenes", {
        scenes: 0,
        flag: 0,
      });
    },
    // 获取数据
    getSpuFormData(row, id) {
      this.spuInfo.category3Id = id;
      this.getTrademarkList();
      this.getBaseSaleAttrList();
      if (row) {
        // 获取spu信息
        this.$API.spu
          .reqGetSpuInfo(row.id)
          .then((res) => {
            // console.log(res);
            if (res.code == 200) {
              this.spuInfo = res.data;
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        // 获取spu图片
        this.$API.spu
          .reqGetSpuImageList(row.id)
          .then((res) => {
            // console.log(res);
            if (res.code == 200) {
              let imageList = res.data;
              // 这里是为了照片墙显示 将imgUrl转为url imgName转为name
              imageList.forEach((item) => {
                item.name = item.imgName;
                item.url = item.imgUrl;
              });
              this.spuImageList = imageList;
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // 获取品牌数据
    getTrademarkList() {
      this.$API.spu
        .reqGetTrademarkList()
        .then((res) => {
          //   console.log(res);
          if (res.code == 200) {
            this.trademarkList = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取销售属性
    getBaseSaleAttrList() {
      this.$API.spu
        .reqGetBaseSaleAttrList()
        .then((res) => {
          //   console.log(res);
          if (res.code == 200) {
            this.baseSaleAttrList = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除tag标签
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },
    // 显示输入框
    showInput(row) {
      // console.log(row);
      // 通过设置inputVisible相应值来用于input与button的切换
      this.$set(row, "inputVisible", true);
      // 通过设置相应数据inputValue收集数据
      this.$set(row, "inputValue", "");
      // 让输入框自动聚焦
      this.$nextTick((_) => {
        this.$refs.saveTagInput.focus();
      });
    },
    // 输入框失去焦点
    handleInputBlurConfirm(row) {
      // console.log(row);
      // 新增的销售属性值不能为空
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message.error("属性值不能为空");
        row.inputVisible = false;
        return;
      }
      // 属性值不能重复
      // let result = row.spuSaleAttrValueList.every((item) => {
      //   return item.saleAttrValueName != inputValue;
      // });
      let result = row.spuSaleAttrValueList.some(
        (item) => item.saleAttrValueName == inputValue
      );
      if (result) {
        this.$message.error("属性值不能重复");
        row.inputVisible = false;
        return;
      }
      let newSpuSaleAttrValueList = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      row.spuSaleAttrValueList.push(newSpuSaleAttrValueList);
      row.inputVisible = false;
    },
    // 删除图片
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // 收集照片墙数据
      this.spuImageList = fileList;
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片成功
    handlePictureSuccess(response, file, fileList) {
      this.spuImageList = fileList;
    },
    // 添加新的销售属性
    addSaleValue() {
      // 将收集好的数据进行分割
      let [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(":");
      let newSpuSaleAttrList = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spuInfo.spuSaleAttrList.push(newSpuSaleAttrList);
      this.attrIdAndName = "";
    },
    // 删除SaleAttrValue
    deleteSaleAttrValue($index) {
      // console.log($index);
      this.spuInfo.spuSaleAttrList.splice($index, 1);
    },
    // 保存按钮
    saveOrUpdateInfo() {
      // 对于携带的图片参数不需要name url参数 新增的图片需要imgUrl imgName
      this.spuInfo.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: item.response ? item.response.data : item.url,
        };
      });
      this.$API.spu
        .reqSaveOrUpdateSpuInfo(this.spuInfo)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "保存成功",
            });
            //清空数据
            this.cancelAddOrEdit();
            // 改变场景 flag判断修改还是新增  1为新增0为修改
            this.$emit("changeScenes", {
              scenes: 0,
              flag: this.spuInfo.id ? 0 : 1,
            });
          } else {
            this.$message.error(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
