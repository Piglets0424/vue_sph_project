// sup管理模块api

import request from "@/utils/request";

// 获取spu数据列表
// /admin/product/{page}/{limit}    get     参数三级id
export const reqGetSpuDataList = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    params: { category3Id },
  });
};

// 获取品牌信息
// GET /admin/product/baseTrademark/getTrademarkList
export const reqGetTrademarkList = () =>
  request.get("/admin/product/baseTrademark/getTrademarkList");

// 获取销售属性
// GET /admin/product/baseSaleAttrList
export const reqGetBaseSaleAttrList = () =>
  request.get("/admin/product/baseSaleAttrList");

// 根据id获取spu信息
// GET /admin/product/getSpuById/{spuId}
export const reqGetSpuInfo = (spuId) =>
  request.get(`/admin/product/getSpuById/${spuId}`);

// 获取spu图片
// GET /admin/product/spuImageList/{spuId}
export const reqGetSpuImageList = (spuId) =>
  request.get(`/admin/product/spuImageList/${spuId}`);

// 新增或修改spu信息
// POST /admin/product/saveSpuInfo  POST /admin/product/updateSpuInfo
export const reqSaveOrUpdateSpuInfo = (data) => {
  // 如果带有参数含有id则为修改信息
  if (data.id) {
    return request({
      method: "post",
      url: "/admin/product/updateSpuInfo",
      data,
    });
  } else {
    return request({
      method: "post",
      url: "/admin/product/saveSpuInfo",
      data,
    });
  }
};

// 删除spu
// DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) =>
  request.delete(`/admin/product/deleteSpu/${spuId}`);

// 获取spu销售属性列表
// GET /admin/product/spuSaleAttrList/{spuId}
export const reqGetSpuSaleAttrList = (spuId) =>
  request.get(`/admin/product/spuSaleAttrList/${spuId}`);

// 获取销售信息列表
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttrInfoList = (category1Id, category2Id, category3Id) =>
  request.get(
    `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
  );

// 保存sku信息
// POST /admin/product/saveSkuInfo
export const reqSaveSkuInfo = (data) =>
  request.post("/admin/product/saveSkuInfo", data);

// 查询sku信息
// GET /admin/product/findBySpuId/{spuId}
export const reqSkuBySpuId = (spuId) =>
  request.get(`/admin/product/findBySpuId/${spuId}`);
