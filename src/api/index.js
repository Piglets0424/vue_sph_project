// 将请求接口统一暴露

import * as attr from "./product/attr";
import * as tradeMark from "./product/tradeMark";
import * as sku from "./product/sku";
import * as spu from "./product/spu";

// 权限相关接口
import * as user from "./acl/user";
import role from "./acl/role";
import permission from "./acl/permission";

export default {
  attr,
  tradeMark,
  spu,
  sku,
  user,
  role,
  permission,
};
