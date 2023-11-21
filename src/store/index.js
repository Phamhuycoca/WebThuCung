import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    quyen: null,
    nguoidungId: null,
    isAuthenticated: false,
  },
  getters: {
    getToken: state => state.token,
    getNguoiDungId: state => state.nguoidungId,
    getQuyen: state => state.quyen,
    getisAuthenticated: state => state.isAuthenticated,
  },
  mutations: {
    setToken(state) {
      state.token = sessionStorage.getItem('token');
    },
    setNguoiDungId(state) {
      state.nguoidungId = sessionStorage.getItem('NguoiDungId');
    },
    setQuyen(state) {
      state.quyen = sessionStorage.getItem('Quyen');
    },
    setisAuthenticated(state) {
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = sessionStorage.clear('token');
    },
    removeNguoiDungId(state) {
      state.nguoidungId = sessionStorage.clear('NguoiDungId')
    },
    removeQuyen(state) {
      state.quyen = sessionStorage.clear('Quyen');
    },
    removeIsAuthenticated(state) {
      state.isAuthenticated = false
    },
  },
  actions: {
    Login(context, data) {
      try {
        sessionStorage.setItem('token', data);
        context.commit('setToken');
      } catch (error) {
        console.log(error)
      }
    },
    DecodeToken(context, data) {
      try {
        sessionStorage.setItem('NguoiDungId', data.nguoiDungId);
        sessionStorage.setItem('Quyen', data.quyen);
        context.commit('setNguoiDungId');
        context.commit('setQuyen');
        context.commit('setisAuthenticated')
      } catch (error) {
        console.log(error);
      }
    },
    Logout(context) {
      try {
        context.commit('removeToken');
        context.commit('removeNguoiDungId');
        context.commit('removeQuyen');
        context.commit('removeIsAuthenticated');
        context.commit('removeListCart');
        context.dispatch('getsessionStorage')
      } catch (error) {
        console.log(error);
      }
    },
    getsessionStorage(context) {
      console.log('getsessionStorage');
      if (sessionStorage.getItem('token')) {
        context.commit('setToken');
        context.commit('setisAuthenticated');
      }
      if (sessionStorage.getItem('NguoiDungId')) {
        context.commit('setNguoiDungId');
      }
      if (sessionStorage.getItem('Quyen')) {
        context.commit('setQuyen');
      }
    },
  },
  modules: {
  }

})