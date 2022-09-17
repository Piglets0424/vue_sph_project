import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, {
  resetRouter,
  asyncRouters,
  constantRoutes,
  anyRouters,
} from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    // 用户名
    name: "",
    // 头像
    avatar: "",
    // 菜单标记
    routes: [],
    // 按钮标记
    buttons: [],
    // 角色
    roles: [],
    // 现有的异步路由与服务器返回的路由标记进行对比之后的路由
    resultAsyncRouter: [],
    // 最终路由 合并之后
    endRouter: [],
  };
};

const state = getDefaultState();

// 定义一个函数用于计算异步路由
const computed = (asyncRouters, routes) => {
  // console.log(asyncRouters, routes);
  return asyncRouters.filter((item) => {
    // 数据中没有该元素返回-1
    if (routes.indexOf(item.name) != -1) {
      // 递归
      if (item.children && item.children.length) {
        item.children = computed(item.children, routes);
      }
      return true;
    }
  });
};

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  //存储用户信息  权限
  SET_USERINFO: (state, userInfo) => {
    // 用户名
    state.name = userInfo.name;
    // 用户头像
    state.avatar = userInfo.avatar;
    // 菜单权限
    state.routes = userInfo.routes;
    // 按钮权限
    state.buttons = userInfo.buttons;
    // 角色信息
    state.roles = userInfo.roles;
  },
  // 计算异步路由
  SET_RESULTASYNCROUTER: (state, asyncRouter) => {
    state.resultAsyncRouter = asyncRouter;
    state.endRouter = constantRoutes.concat(state.resultAsyncRouter,anyRouters)
    router.addRoutes(state.endRouter)
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject("验证失败，请重新登录。");
          }

          commit("SET_USERINFO", data);
          commit("SET_RESULTASYNCROUTER", computed(asyncRouters, data.routes));
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
