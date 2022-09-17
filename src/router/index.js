import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                  如果设置为 true，项目将不会显示在边栏中（默认值为 false）
 * alwaysShow: true              如果设置为 true，将始终显示根菜单
 *                                如果未设置 alwaysShow，当项目有多个子路由时，
 *                               它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为 no 重定向将不会在痕迹导航中重定向
 * name:'router-name'             该名称由 <keep-alive> （必须设置!!!） 使用
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               名称显示在侧边栏和痕迹导航中（推荐集）
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
    breadcrumb: false            如果设置为 false，则该项目将隐藏在痕迹导航中（默认值为 true）
    activeMenu: '/example/list'  如果设置路径，边栏将突出显示您设置的路径
  }
 */

/**
 * 常量路由
 * 没有权限要求的基页
 *所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
];

/* 异步路由
不同角色 通过筛选 */
export const asyncRouters = [
  // 自己新增路由
  {
    path: "/acl",
    component: Layout,
    name: "Acl",
    meta: { title: "权限管理", icon: "el-icon-unlock" },
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/acl/user"),
        meta: { title: "用户管理" },
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/acl/role/index"),
        meta: { title: "角色管理" },
      },
      {
        path: "role/auth/:id",
        name: "Auth",
        component: () => import("@/views/acl/role/roleAuth/index"),
        meta: { activeMenu: "/acl/role", title: "角色授权" },
        hidden: true,
      },
      {
        path: "permission",
        name: "Permission",
        component: () => import("@/views/acl/permission"),
        meta: { title: "菜单管理" },
      },
    ],
  },

  {
    path: "/product",
    component: Layout,
    name: "Product",
    meta: { title: "商品管理", icon: "el-icon-goods" },
    children: [
      {
        path: "trademark",
        name: "TradeMark",
        component: () => import("@/views/product/TradeMark"),
        meta: { title: "品牌管理" },
      },
      {
        path: "attr",
        name: "Attr",
        component: () => import("@/views/product/Attr"),
        meta: { title: "平台属性管理" },
      },
      {
        path: "spu",
        name: "Spu",
        component: () => import("@/views/product/Spu"),
        meta: { title: "Spu管理" },
      },
      {
        path: "sku",
        name: "Sku",
        component: () => import("@/views/product/Sku"),
        meta: { title: "Sku管理" },
      },
    ],
  },
  {
    path: "/test",
    component: Layout,
    name: "Test",
    meta: { title: "测试管理", icon: "el-icon-goods" },
    children: [
      {
        path: "test1",
        name: "Test1",
        component: () => import("@/views/test/test1"),
        meta: { title: "测试管理1" },
      },
      {
        path: "test2",
        name: "Test2",
        component: () => import("@/views/test/test2"),
        meta: { title: "测试管理2" },
      },
    ],
  },
];

/* 任意路由 
出现错误的情况404 */
export const anyRouters = [
  // 404 页必须放在末尾!!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
