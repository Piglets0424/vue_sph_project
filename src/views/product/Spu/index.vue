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
      <!-- spu列表数据 -->
      <div v-show="scenes == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="attrIdList.CategoryCId == 0"
          @click="addOrEdit()"
          >添加SPU</el-button
        >
        <el-table
          :data="spuDataList"
          border
          style="margin: 20px 0px; width: 100%"
        >
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称"> </el-table-column>
          <el-table-column prop="description" label="spu描述">
          </el-table-column>
          <el-table-column label="操作" width="400">
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                type="success"
                icon="el-icon-plus"
                title="添加sku"
                @click="addSku(row)"
              ></el-button
              ><el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                title="修改spu"
                @click="addOrEdit(row)"
              ></el-button
              ><el-button
                type="info"
                size="mini"
                icon="el-icon-info"
                title="查看当前spu的sku列表"
                @click="getSkuList(row)"
              ></el-button>
              <el-popconfirm
                :title="`确定删除${row.spuName}吗？`"
                @onConfirm="deleteSpu(row)"
              >
                <el-button
                  style="margin-left: 10px"
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                ></el-button
              ></el-popconfirm>
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
      </div>
      <!-- 新增和修改 -->
      <SpuForm
        v-show="scenes == 1"
        @changeScenes="changeScenes"
        ref="supFrom"
      ></SpuForm>
      <!-- 添加sku -->
      <SkuForm
        v-show="scenes == 2"
        @changeScenes="changeScenes"
        ref="skuFrom"
      ></SkuForm>
    </el-card>

    <el-dialog
      :title="`${spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :beforeClose="closeDialogTable"
    >
      <el-table :data="skuList" v-loading="loading">
        <el-table-column property="skuName" label="名称"></el-table-column>
        <el-table-column property="price" label="价格"></el-table-column>
        <el-table-column property="weight" label="重量"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./spuForm/index.vue";
import SkuForm from "./skuForm/index.vue";
export default {
  name: "Spu",
  components: { SpuForm, SkuForm },
  data() {
    return {
      // 三级联动是否可用
      showTable: true,
      // 三级id
      attrIdList: {
        CategoryAId: 0,
        CategoryBId: 0,
        CategoryCId: 0,
      },
      // 分页器数据
      // 当前页
      page: 1,
      // 每页多少条数据
      pageSize: 5,
      //总条数
      total: 0,
      // spu数据
      spuDataList: [],
      // 场景 0spu数据 1修改添加表单 2添加sku
      scenes: 0,
      dialogTableVisible: false,
      skuList: [],
      spuName: "",
      loading: true,
    };
  },
  methods: {
    // 获取三级id
    getAttrIdList(attrIdList) {
      this.attrIdList = attrIdList;
      this.getSpuDataList();
    },
    // 获取spu数据列表
    getSpuDataList() {
      let { page, pageSize } = this;
      this.$API.spu
        .reqGetSpuDataList(page, pageSize, this.attrIdList.CategoryCId)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.total = res.data.total;
            this.spuDataList = res.data.records;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.page = val;
      this.getSpuDataList();
    },
    // 改变每页大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSpuDataList();
    },
    // 添加或者修改spu
    addOrEdit(row) {
      this.scenes = 1;
      this.showTable = false;
      this.$refs.supFrom.getSpuFormData(row, this.attrIdList.CategoryCId);
    },
    // 添加sku
    addSku(row) {
      this.scenes = 2;
      this.showTable = false;
      this.$refs.skuFrom.getSkuData(row, this.attrIdList);
    },
    // 改变场景
    changeScenes({ scenes, flag }) {
      // console.log(flag);
      // console.log(scenes);
      this.scenes = scenes;
      this.showTable = true;
      if (flag) {
        this.page = 1;
        this.getSpuDataList();
      } else {
        this.getSpuDataList();
      }
    },
    // 删除spu
    deleteSpu(row) {
      // console.log(row.id);
      this.$API.spu
        .reqDeleteSpu(row.id)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.spuDataList.length > 1 ? this.getSpuDataList() : --this.page,
              this.getSpuDataList();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 产看sku信息
    getSkuList(row) {
      // console.log(row);
      this.spuName = row.spuName;
      this.dialogTableVisible = true;
      this.$API.spu
        .reqSkuBySpuId(row.id)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.skuList = res.data;
            this.loading = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //关闭对话框回调
    closeDialogTable(close, instance, done) {
      this.skuList = [];
      this.loading = true;
      close();
    },
  },
};
</script>
