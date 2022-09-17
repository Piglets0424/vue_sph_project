// 品牌管理api
import request from "@/utils/request";

// 获取商品列表
// /admin/product/baseTrademark/{page}/{limit}  get
export const reqTradeMarkList = (page, limit) => {
  return request({
    method: "get",
    url: `/admin/product/baseTrademark/${page}/${limit}`,
  });
};

// 添加品牌
/* // /admin/product/baseTrademark/save    post   参数 logoUrl tmName
export const reqSaveTradeMark = (data) =>{
  return request({
    method:'post',
    url:'/admin/product/baseTrademark/save',
    data
  })
} */

// 修改品牌信息
/* // /admin/product/baseTrademark/update    put    参数 id logoUrl tmName
export const reqUpdateTradeMark = (data) =>{
  return request({
    method:'put',
    url:'/admin/product/baseTrademark/update',
    data
  })
} */

// 添加或修改品牌信息
export const reqSaveOrUpdateTradeMark = (data)=>{
  if (data.id) {
    return request({
      method:'put',
      url:'/admin/product/baseTrademark/update',
      data
    })
  }else{
    return request({
      method:'post',
      url:'/admin/product/baseTrademark/save',
      data
    })
  }
}

// 删除品牌信息
// /admin/product/baseTrademark/remove/{id}   delete    
export const reqDeleteTradeMark = (id) =>{
  return request({
    method:'delete',
    url:`/admin/product/baseTrademark/remove/${id}`
  })
}