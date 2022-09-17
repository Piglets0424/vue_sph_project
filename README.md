# 尚品汇后台管理系统

### vue-admin-template模板

> 这是一个极简的 vue admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

[国内访问](https://panjiachen.gitee.io/vue-admin-template)

### 文件夹认识

- build	---index.js	webpack配置文件【很少修改】
- mock   ---模拟一些mock.js实现的假数据，实际开发是真实接口
- node_modules   ---项目依赖模块
- public   ---ico静态图标，静态页面，经常放静态资源，打包时不会编译
- src   ---源代码
  - api文件夹   ---请求相关文件夹
  - assets文件夹   ---共享静态资源文件夹，在打包时会进行编译
  - components文件夹  ---非路由组件或全局组件
  - icons文件夹   ---svg矢量图
  - layout文件夹   ---存放一些组件与混入
  - router文件夹   ---路由文件夹
  - store文件夹   ---vuex状态管理
  - style文件夹   ---样式相关文件
  - utils文件夹   ---一些封装的js【axios】
  - views文件夹   ---路由组件
  - App.vue文件   ---根组件
  - main.js文件   ---入口文件
  - permission.js文件   ---与导航守卫相关 权限管理
  - settins.js文件   ---设置文件
- test文件夹   ---测试文件
- 其他配置文件

index.scss文件错误、将.*app-container*修改为.*app-main*

### 登录业务退出业务

静态组件

更换api	[Swagger UI](http://39.98.123.211:8170/swagger-ui.html)

代理跨域配置  接口为http://gmall-h5-api.atguigu.cn

axios二次封装的修改

### 路由组件的修改

删除不需要的路由组件

添加项目路由

### 使用flag来判断编辑模式还是查看模式

新增时直接向新增数据中添加flag属性

修改时使用$set添加

### 将数据设置为响应式数据

```
this.$set(item, "flag", false);
```

- item  对象
- flag 新增属性
- false 属性值

### 表单元素自动聚焦
