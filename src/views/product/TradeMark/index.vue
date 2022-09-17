<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 表格组件-->
    <el-table :data="tradeMarkList" border>
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <!-- 作用域插槽 -->
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
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
    >
    </el-pagination>
    <!-- 添加/修改对话框 -->
    <el-dialog
      :title="form.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" style="width: 80%">
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input v-model="form.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl" label-width="100px">
          <!-- 上传图片 -->
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark(false)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      // 当前页
      page: 1,
      // 每页大小
      pageSize: 4,
      // 总条数
      total: 0,
      // 表格数据
      tradeMarkList: [],
      // 对话框
      dialogFormVisible: false,
      // 表单
      form: {
        tmName: "",
        logoUrl: "",
      },
      //表单验证规则
      rules: {
        tmName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请上传logo" }],
      },
    };
  },
  mounted() {
    this.getTradeMarkList();
  },
  methods: {
    // 获取表格数据
    async getTradeMarkList() {
      let { page, pageSize } = this;
      let result = await this.$API.tradeMark.reqTradeMarkList(page, pageSize);
      // console.log(result);
      if (result.code == 200) {
        this.tradeMarkList = result.data.records;
        this.total = result.data.total;
      } else {
        alert(result.message);
      }
    },
    // 改变页
    handleCurrentChange(val) {
      this.page = val;
      this.getTradeMarkList();
    },
    // 改变每页大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTradeMarkList();
    },
    // 显示对话框
    showDialog() {
      this.dialogFormVisible = true;
      this.form = {
        tmName: "",
        logoUrl: "",
      };
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      this.form.logoUrl = res.data;
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 jpg/png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG || (isPNG && isLt2M);
    },
    // 修改按钮
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      // 使用浅拷贝 避免直接修改从服务器中获取的数据
      this.form = { ...row };
    },
    // 添加或更新品牌
    addOrUpdateTradeMark() {
      // 先判断表单是否通过
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$API.tradeMark
            .reqSaveOrUpdateTradeMark(this.form)
            .then((res) => {
              // console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: this.form.id ? "修改成功!" : "添加成功!",
                  type: "success",
                });
                this.getTradeMarkList();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch((error) => {
              console.log(error);
            });
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除商品
    deleteTradeMark(row) {
      let { tmName, id } = row;
      this.$confirm(`此操作将永久删除${tmName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.tradeMark.reqDeleteTradeMark(id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getTradeMarkList();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
