// 主页模块仓库
import mockRequest from "@/utils/mockRequest";

export default {
  // 开启命名空间
  namespaced: true,
  //准备actions对象——响应组件中用户的动作
  actions: {
    getData({ commit }) {
      mockRequest
        .get("home/list")
        .then((res) => {
          if (res.code == 20000) {
            commit("GETDATA", res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  //准备mutations对象——修改state中的数据
  mutations: {
    GETDATA(state, data) {
      state.dataList = data;
    },
  },
  //准备state对象——保存具体的数据
  state: {
    dataList: {},
  },
  //数据需要经过加工后再使用时 简化数据
  getters: {
    totalSales(state) {
      const {
        salesTotal,
        salesToday,
        salesGrowthLastDay,
        salesGrowthLastMonth,
      } = state.dataList;
      let obj = {
        salesTotal,
        salesToday,
        salesGrowthLastDay,
        salesGrowthLastMonth,
      };
      return obj || {};
    },
    views(state) {
      const { visitTotal, visitToday, visitTrend } = state.dataList;
      let obj = {
        visitTotal,
        visitToday,
        visitTrend,
      };
      return obj || {};
    },
    payNum(state) {
      const { payTotal, payRate, payTrend } = state.dataList;
      let obj = {
        payTotal,
        payRate,
        payTrend,
      };
      return obj || {};
    },
    activity(state) {
      const { activityRate, activityGrowthLastDay, activityGrowthLastMonth } =
        state.dataList;
      let obj = {
        activityRate,
        activityGrowthLastDay,
        activityGrowthLastMonth,
      };
      return obj || {};
    },
    orderInfo(state) {
      const { orderFullYearAxis, orderFullYear, orderRank } = state.dataList;
      let obj = {
        orderFullYearAxis,
        orderFullYear,
        orderRank,
      };
      return obj || {};
    },
    userInfo(state) {
      const { userFullYearAxis, userFullYear, userRank } = state.dataList;
      let obj = {
        userFullYearAxis,
        userFullYear,
        userRank,
      };
      return obj || {};
    },
    searchWord(state) {
      return state.dataList.searchWord || [];
    },
    saleRank(state) {
      return state.dataList.saleRank || {};
    },
  },
};
