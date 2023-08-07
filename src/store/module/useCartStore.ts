import { ActionContext } from "vuex";
import { clearLocalStorare, setToLocalStorage, getFromLocalStorage, removeLocalStorageById } from "@/util/helpers";

export interface State {
    activeCategory: string;
    productInCart: Array<any>;
    isCartModalOpen: boolean;
    searchValue: string;
    searchPriceValue: object;
}

const state = (): State => ({
  activeCategory: "all",
  productInCart: [],
  isCartModalOpen: false,
  searchValue: "",
  searchPriceValue: [],
});

const getters = {
  productInCart: (state: State) => (id: number) => {
    return state.productInCart.find((productItem) => productItem.id === +id);
  },
  getActiveCategory(state: State) {
    return state.activeCategory;
  },
  getProductInCart(state: State) {
    return state.productInCart;
  },
  getIsCartModalOpen(state: State) {
    return state.isCartModalOpen;
  },
  getSearchByName(state: State) {
    return state.searchValue;
  },
  getSearchPriceValue(state: State) {
    return state.searchPriceValue;
  }
};

const actions = {
  fetchCartStorage({ commit }: ActionContext<State, State>) {
    commit("setProductToCart", getFromLocalStorage("cart") || []);
  },
  setActiveCategory({ commit }: ActionContext<State, State>, activeCategory: string) {
    commit("setActiveCategory", activeCategory);
  },
  setProductToCart({ commit, state }: ActionContext<State, State>, productToCart: object[]) {
    const newProductToCart = [...state.productInCart, productToCart];
    
    commit("setProductToCart", newProductToCart);
  },
  setIsCartModalOpen({ commit }: ActionContext<State, State>, isCartModalOpen: boolean) {
    commit("setIsCartModalOpen", isCartModalOpen);
  },
  setIncrementQuantity({ commit, state }: ActionContext<State, State>, productId: number) {
    const product = state.productInCart.find((productItem) => productItem.id === productId);
    product.quantity + 1;
    
    commit("setIncrementQuantity", product);
  },
  setDecrementQuantity({ commit, state }: ActionContext<State, State>, productId: number) {
    const product = state.productInCart.find((productItem) => productItem.id === productId);
    product.quantity - 1;
    
    commit("setDecrementQuantity", product);
  },
  removeProductFromCart({ commit }: ActionContext<State, State>, productId: number) {
    removeLocalStorageById("cart", productId);
    commit("removeProductFromCart", productId);
  },
  clearCart({ commit }: ActionContext<State, State>) {
    clearLocalStorare("cart");
    commit('clearCart');
  },
  setSearchByName({ commit }: ActionContext<State, State>, searchValue: string) {
    commit('setSearchByName', searchValue);
  },
  setSearchByPriceRange({ commit }: ActionContext<State, State>, searchPriceValue: object) {
    commit('setSearchByPriceRange', searchPriceValue);
  },
};

const mutations = {
    setActiveCategory(state: State, activeCategory: string) {
      state.activeCategory = activeCategory;
    },
    setProductToCart(state: State, newProductToCart: object[]) {
      state.productInCart = newProductToCart;
      
      setToLocalStorage("cart", state.productInCart);
    },
    setIsCartModalOpen(state: State, isCartModalOpen: boolean) {
      state.isCartModalOpen = isCartModalOpen;
    },
    setIncrementQuantity(state: State, product: { id: number, quantity: number }) {
      const index = state.productInCart.findIndex((p) => p.id === product.id);
      if (index > -1) {
        state.productInCart[index].quantity++;
      }
    },
    setDecrementQuantity(state: State, product: { id: number, quantity: number }) {
      const index = state.productInCart.findIndex((p) => p.id === product.id);
      if (index > -1) {
        state.productInCart[index].quantity--;
      }
    },
    removeProductFromCart(state: State, productId: number) {
      state.productInCart = state.productInCart.filter((product) => product.id !== productId);
    },
    clearCart(state: State) {
      state.productInCart = [];
    },
    setSearchByName(state: State, searchValue: string) {
      state.searchValue = searchValue;
    },
    setSearchByPriceRange(state: State, searchPriceValue: object) {
      state.searchPriceValue = searchPriceValue;
    },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
