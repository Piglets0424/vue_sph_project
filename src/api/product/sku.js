import request from "@/utils/request";

// 获取sku列表
// GET /admin/product/list/{page}/{limit}
export const reqGetSkuList = (page, limit) =>
  request.get(`/admin/product/list/${page}/${limit}`);

// 上架
// GET /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) =>
  request.get(`/admin/product/onSale/${skuId}`);

// 下架
// GET /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) =>
  request.get(`/admin/product/cancelSale/${skuId}`);

// 获取详情
// GET /admin/product/getSkuById/{skuId}
export const reqGetSkuInfoById = (skuId) =>
  request.get(`/admin/product/getSkuById/${skuId}`);

// 删除sku
// DELETE /admin/product/deleteSku/{skuId}
export const reqDeleteSku = (skuId) =>
  request.delete(`/admin/product/deleteSku/${skuId}`);
