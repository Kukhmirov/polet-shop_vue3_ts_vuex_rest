import { InjectionKey } from "vue";
import { Module, Store, useStore as baseUseStore, createStore } from "vuex";

import useApiStore, { State as ApiState } from "./module/useApiStore";
import useCartStore, { State as CartStore } from "./module/useCartStore";

export interface RootState {
  useApiStore: Module<ApiState, RootState>;
  useCartStore: Module<CartStore, RootState>;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

const store = createStore<RootState>({
  modules: {
    useApiStore: useApiStore as unknown as Module<ApiState, RootState>,
    useCartStore: useCartStore as unknown as Module<CartStore, RootState>,
  },
});

export const useStore = () => baseUseStore(key);

export default store;