// 平台属性管理模块相关api

import request from "@/utils/request";

// 获取一级分类
// /admin/product/getCategory1      get
export const reqGetCategory1 = () => request.get("/admin/product/getCategory1");

// 获取二级分类
// /admin/product/getCategory2/{category1Id}    get
export const reqGetCategory2 = (category1Id) =>
  request.get(`/admin/product/getCategory2/${category1Id}`);

// 获取三级分类
// /admin/product/getCategory3/{category2Id}    get
export const reqGetCategory3 = (category2Id) =>
  request.get(`/admin/product/getCategory3/${category2Id}`);

//获取商品属性列表
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}    GET
export const reqGetAttrInfoList = (category1Id, category2Id, category3Id) =>
  request.get(
    `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
  );

// 添加修改商品属性信息
// /admin/product/saveAttrInfo  post
export const reqSaveAttrInfo = (data) => {
  return request({
    method: "post",
    url: "/admin/product/saveAttrInfo",
    data,
  });
};

// 删除商品属性信息
// /admin/product/deleteAttr/{attrId}     delete
export const reqDeleteAttrValue = (attrId) =>
  request.delete(`/admin/product/deleteAttr/${attrId}`);
