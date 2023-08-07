import { ActionContext } from "vuex";

import baseAPI from "@/api/base";
import { API_DATA } from "@/constants/constants";

export interface State {
  products: ProductsModel[];
}

const state = (): State => ({
  products: [],
});

const getters = {
  getProductById: (state: State) => (id: number) => {
    return state.products.find((product) => product.id === id);
  },
  isProducts(state: State) {
    return state.products.length > 0;
  },
  getProducts(state: State) {
    return state.products;
  },
  getAllCategories: (state: State) => {
    const tmp = state.products.map((product) => {
      return product.category
    });    
    tmp.unshift('all');

    return [...new Set(tmp)];
  },
};

const actions = {
  async fetchProducts({ commit }: ActionContext<State, State>) {
    try {
      const response = await baseAPI.get(API_DATA.GET_DATA);
      const data = await response.data;
      commit("setProducts", data);
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  setProducts(state: State, products: ProductsModel[]) {
    state.products = products;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
