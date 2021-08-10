import Vue from "vue";
import Vuex from "vuex";
import {
  server
} from "@/services/server.js";
import api from "@/services/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: ""
  },
  getters: { //getters เอาไว้เรียกใช้ข้อมูลใน state
    isLogin(state) {
      return state.isLogin
    },
    username(state) {
      return state.username
    }

  },
  mutations: { //mutations เอาไว้เข้าถึงข้อมูลใน state
    SET_LOGGED_IN(state) {
      state.isLogin = true
    },
    SET_LOGGED_OUT(state) {
      state.isLogin = false
    },
    SET_USERNAME(state, value) {
      state.username = value
    },

  },
  actions: {
    doLogin({
      commit,
      dispatch
    }, {
      username
    }) {
      let result = api.login({
        username
      });
      if (result == true) {
        // console.log(username)
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
      } else {
        dispatch("doLogout", {});
      }
    },
    doLogout({
      commit
    }) {
      api.logoff();
      commit("SET_LOGGED_OUT")
      commit("SET_USERNAME", "")
    },
    restoreLogin({
      commit
    }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem(server.USERNAME);
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username)
      }
    }
  },
  modules: {},
});