import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    quyen: null,
    nguoidungId: null,
    isAuthenticated: false,
    totalCart: '',
    lisCart: []
  },
  getters: {
    getToken: state => state.token,
    getNguoiDungId: state => state.nguoidungId,
    getQuyen: state => state.quyen,
    getisAuthenticated: state => state.isAuthenticated,
    getCart: state => state.lisCart,
    getTotalCart: state => state.totalCart
  },
  mutations: {
    setToken(state) {
      state.token = sessionStorage.getItem('token');
    },
    setNguoiDungId(state) {
      state.nguoidungId = sessionStorage.getItem('nguoidungId');
    },
    setQuyen(state) {
      state.quyen = sessionStorage.getItem('quyen');
    },
    SetisAuthenticated(state) {
      state.isAuthenticated = true;
    },
    setListCart(state) {
      state.lisCart = sessionStorage.getItem('carts');
    },
    setTotalCart(state) {
      state.totalCart = localStorage.getItem('TotalCart')
    },
    removeToken(state) {
      state.token = sessionStorage.clear('token');
    },
    removeNguoiDungId(state) {
      state.nguoidungId = sessionStorage.clear('nguoidungId')
    },
    removeQuyen(state) {
      state.quyen = sessionStorage.clear('quyen');
    },
    removeIsAuthenticated(state) {
      state.isAuthenticated = false
    },
    removeListCart(state) {
      state.lisCart = sessionStorage.clear('carts');
    },
    removeTotalCart(state) {
      state.totalCart = localStorage.clear('TotalCart');
    }
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
        sessionStorage.setItem('nguoidungId', data.nguoiDungId);
        sessionStorage.setItem('quyen', data.quyen);
        context.commit('setNguoiDungId');
        context.commit('setQuyen');
        context.commit('SetisAuthenticated')
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
        context.commit('removeTotalCart');
        context.dispatch('getsessionStorage')
      } catch (error) {
        console.log(error);
      }
    },
    getsessionStorage(context) {
      console.log('getsessionStorage');
      if (sessionStorage.getItem('token')) {
        context.commit('setToken');
        context.commit('SetisAuthenticated');
      }
      if (sessionStorage.getItem('nguoidungId')) {
        context.commit('setNguoiDungId');
      }
      if (sessionStorage.getItem('quyen')) {
        context.commit('setQuyen');
      }
      if (sessionStorage.getItem('carts')) {
        context.commit('setListCart')
      }
      if (localStorage.getItem('TotalCart')) {
        context.commit('setTotalCart')
      }
    },
    async getListCarts(context, data) {
      try {
        sessionStorage.setItem('carts', JSON.stringify(data));
        context.commit('setListCart');
        localStorage.setItem('TotalCart', data.length)
        context.commit('setTotalCart')
        context.dispatch('getsessionStorage')
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }

})
