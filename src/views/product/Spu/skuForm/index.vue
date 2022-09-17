<template>
  <!-- 添加sku -->
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{ spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input
      ></el-form-item>
      <el-form-item label="价格(元)"
        ><el-input
          placeholder="价格(元)"
          v-model.number="skuInfo.price"
          type="number"
          min="0"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input
      ></el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          placeholder="规格描述"
          v-model="skuInfo.skuDesc"
        ></el-input
      ></el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" class="demo-form-inline" label-width="100px">
          <el-form-item
            :label="attrInfo.attrName"
            v-for="attrInfo in attrInfoList"
            :key="attrInfo.id"
            style="margin: 5px 0"
          >
            <el-select
              placeholder="请选择"
              style="margin-right: 50px"
              v-model="attrInfo.attrIdAndValueId"
            >
              <el-option
                :label="attrValue.valueName"
                :value="`${attrInfo.id}:${attrValue.id}`"
                v-for="attrValue in attrInfo.attrValueList"
                :key="attrValue.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" class="demo-form-inline" label-width="100px">
          <el-form-item
            :label="spuSaleAttr.saleAttrName"
            v-for="spuSaleAttr in spuSaleAttrList"
            :key="spuSaleAttr.id"
          >
            <el-select
              placeholder="请选择"
              style="margin-right: 50px"
              v-model="spuSaleAttr.SaleAttrIdAndSaleAttrValueId"
            >
              <el-option
                :label="spuSaleAttrValue.saleAttrValueName"
                :value="`${spuSaleAttr.id}:${spuSaleAttrValue.id}`"
                v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
                :key="spuSaleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item> </el-form
      ></el-form-item>
      <el-form-item label="图片列表">
        <template>
          <el-table
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            border
            :data="spuImageList"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="图片">
              <template slot-scope="{ row }">
                <img
                  :src="row.imgUrl"
                  :alt="row.imgName"
                  style="width: 100px"
                />
              </template>
            </el-table-column>
            <el-table-column prop="imgName" label="名称"> </el-table-column>
            <el-table-column label="操作" width="400">
              <template slot-scope="{ row }">
                <el-tag v-if="row.isDefault" type="success">默认</el-tag>
                <el-button
                  v-else
                  type="primary"
                  size="mini"
                  @click="isDefault(row)"
                  >设为默认</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSkuInfo">保存</el-button>
        <el-button @click="cancelAddOrEdit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      //spu名称
      spuName: "",
      // 图片列表
      spuImageList: [],
      // spu销售属性列表
      spuSaleAttrList: [],
      // 销售信息列表
      attrInfoList: [],
      // sku信息
      skuInfo: {
        // 父组件传递的
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 数据双向绑定
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",
        // 代码获取
        // 默认图片
        skuDefaultImg: "",
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        // 图片列表
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        // 销售属性列表
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      // 暂时收集图片列表
      imageList: [],
    };
  },
  methods: {
    // 选择图片
    handleSelectionChange(val) {
      // console.log(val);
      this.imageList = val;
    },
    // 取消添加或编辑
    cancelAddOrEdit() {
      this.$emit("changeScenes", {
        scenes: 0,
        flag: 0,
      });
      Object.assign(this._data, this.$options.data());
    },
    // 获取数据
    getSkuData(row, attrIdList) {
      // console.log(row, attrIdList);
      this.spuName = row.spuName;
      this.skuInfo.category3Id = row.category3Id;
      this.skuInfo.spuId = row.id;
      this.skuInfo.tmId = row.tmId;
      let { CategoryAId, CategoryBId, CategoryCId } = attrIdList;
      this.getSpuImageList(row.id);
      this.getSpuSaleAttrList(row.id);
      this.getAttrInfoList(CategoryAId, CategoryBId, CategoryCId);
    },
    // 获取图片信息
    getSpuImageList(id) {
      this.$API.spu
        .reqGetSpuImageList(id)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            let array = res.data;
            array.forEach((item) => {
              item.isDefault = 0;
            });
            this.spuImageList = array;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取spu销售属性列表
    getSpuSaleAttrList(id) {
      this.$API.spu
        .reqGetSpuSaleAttrList(id)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.spuSaleAttrList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取销售信息列表
    getAttrInfoList(id1, id2, id3) {
      this.$API.spu
        .reqGetAttrInfoList(id1, id2, id3)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.attrInfoList = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 设置默认图片
    isDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      // 收集默认图片
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 保存按钮
    saveSkuInfo() {
      // 整理参数
      const { attrInfoList, spuSaleAttrList, imageList, skuInfo } = this;
      // 平台属性
      attrInfoList.forEach((item) => {
        if (item.attrIdAndValueId) {
          let [attrId, valueId] = item.attrIdAndValueId.split(":");
          // console.log(attrId, valueId);
          skuInfo.skuAttrValueList.push({
            attrId,
            valueId,
          });
        }
      });
      // 销售属性
      spuSaleAttrList.forEach((item) => {
        if (item.SaleAttrIdAndSaleAttrValueId) {
          let [saleAttrId, saleAttrValueId] =
            item.SaleAttrIdAndSaleAttrValueId.split(":");
          skuInfo.skuSaleAttrValueList.push({
            saleAttrId,
            saleAttrValueId,
          });
        }
      });
      // 图片数据整理
      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      // 发送请求
      this.$API.spu
        .reqSaveSkuInfo(skuInfo)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "保存成功",
            });
            this.cancelAddOrEdit();
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
