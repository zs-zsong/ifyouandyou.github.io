import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        goods: []
    },
    getters: {
        sum(state) {
          var total = 0;
          state.goods.forEach((item) => {
            if (item.select) {
              total += item.price * item.number
            }
          })
          return total;
        },
        goodsNum(state) {
            return state.goods.length;
        }
    },
    mutations: {
        initGoods(state,data) {
            state.goods = data;
        },
        addGoods(state, item) {
            state.goods.push(item);
        },
        deleteGoods(state, index) {
            state.goods.splice(index,1);
        },
        updateGoods(state, data) {
          const {
            index,
            key,
            value
          } = data;
          state.goods[index][key] = value;
        }
    }
})

export default store;