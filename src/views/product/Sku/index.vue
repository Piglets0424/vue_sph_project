<template>
  <div>
    <el-table :data="skuDataList" border style="width: 100%">
      <el-table-column label="序号" type="index" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称"> </el-table-column>
      <el-table-column prop="skuDesc" label="描述"> </el-table-column>
      <el-table-column label="默认图片" width="200">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="150">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="120"> </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="{ row }">
          <el-button
            v-if="!row.isSale"
            type="info"
            size="mini"
            icon="el-icon-top"
            title="上架"
            @click="onSale(row)"
          ></el-button>
          <el-button
            v-else
            size="mini"
            type="success"
            icon="el-icon-bottom"
            title="下架"
            @click="cancelSale(row)"
          ></el-button
          ><el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            title="修改sku"
            @click="editInfo"
          ></el-button
          ><el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            title="查看详情"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-popconfirm
            :title="`确定删除${row.skuName}吗？`"
            @onConfirm="deleteSku(row)"
          >
            <el-button
              style="margin-left: 30px"
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              title="删除sku"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4, 5, 10]"
      :page-size="pageSize"
      :total="total"
      layout="  prev,pager, next, jumper,->,sizes,total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <el-drawer
      :visible.sync="drawer"
      :before-close="closeDrawer"
      :with-header="false"
      size="40%"
    >
      <div style="margin-top: 50px">
        <el-row>
          <el-col :span="5">名称</el-col>
          <el-col :span="16">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">描述</el-col>
          <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">价格</el-col>
          <el-col :span="16">{{ skuInfo.price }}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">平台属性 </el-col>
          <el-col :span="16">
            <el-tag
              type="success"
              v-for="skuAttrValue in skuInfo.skuAttrValueList"
              :key="skuAttrValue.id"
              style="margin-right: 5px"
              >{{ skuAttrValue.valueName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">商品图片</el-col>
          <el-col :span="16">
            <template>
              <div class="block">
                <el-carousel trigger="click">
                  <el-carousel-item
                    v-for="skuImage in skuInfo.skuImageList"
                    :key="skuImage.id"
                  >
                    <img :src="skuImage.imgUrl" alt="" style="width: 100%" />
                  </el-carousel-item>
                </el-carousel>
              </div>
            </template>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      // 当前页
      page: 1,
      // 每页数据条数
      pageSize: 5,
      // 总页数
      total: 0,
      // 表格数据
      skuDataList: [],
      // 抽屉
      drawer: false,
      // sku详情
      skuInfo: {},
    };
  },
  methods: {
    // 改变当前页
    handleCurrentChange(val) {
      this.page = val;
      this.getSkuList();
    },
    // 改变每页大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSkuList();
    },
    // 获取列表数据
    getSkuList() {
      this.$API.sku
        .reqGetSkuList(this.page, this.pageSize)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.total = res.data.total;
            this.skuDataList = res.data.records;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 上架
    onSale(row) {
      // console.log(row);
      this.$API.sku
        .reqOnSale(row.id)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "上架成功",
            });
            row.isSale = 1;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 下架
    cancelSale(row) {
      // console.log(row);
      this.$API.sku
        .reqCancelSale(row.id)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "下架成功",
            });
            row.isSale = 0;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 修改
    editInfo() {
      this.$message({
        type: "info",
        message: "功能正在开发中",
      });
    },
    // 详情
    getSkuInfo(row) {
      this.drawer = true;
      this.$API.sku
        .reqGetSkuInfoById(row.id)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.skuInfo = res.data;
          } else {
            this.drawer = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 删除
    deleteSku(row) {
      this.$API.sku
        .reqDeleteSku(row.id)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getSkuList();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 关闭抽屉
    closeDrawer() {
      (this.drawer = false), (this.skuInfo = {});
    },
  },
  mounted() {
    this.getSkuList();
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-row .el-col-5 {
  font-size: 20px;
  font-weight: 700;
  text-align: right;
}
.el-row .el-col {
  margin: 20px 10px;
}
</style>
