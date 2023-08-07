<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store/index";

import ProductList from "@/components/ProductList.vue";
import CartModal from "@/components/UI/modal/CartModal.vue";
import ProductSlider from "@/components/slider/ProductSlider.vue";

const store = useStore();

const products = ref(store.getters["useApiStore/getProducts"]);

const filterCategory = (activeCategory: string) => {
  return activeCategory === 'all'
    ? products.value
    : products.value.filter((product: ProductsModel) => {
        return product.category === activeCategory;
      });
}

const productListData = computed(() => {
  const searchValue = ref(store.getters["useCartStore/getSearchByName"]);
  const activeCategory = ref(store.getters["useCartStore/getActiveCategory"]);
  const searchPriceValue = ref(store.getters["useCartStore/getSearchPriceValue"]);

  const filteredProducts = filterCategory(activeCategory.value).filter((product: ProductsModel) => {
    return product.title.toLowerCase().includes(searchValue.value.toLowerCase());
  });

  if(searchPriceValue.value.min > 0 || searchPriceValue.value.max > 0) {
    const filteredPriceProducts = filteredProducts.length > 0 ? filteredProducts.filter((product: ProductsModel) => {
        return searchPriceValue.value.min <= +product.price && +product.price <= searchPriceValue.value.max;
      })
      : filterCategory(activeCategory.value).filter((product: ProductsModel) => {
        return searchPriceValue.value.min <= +product.price && +product.price <= searchPriceValue.value.max;
      })
    
    return filteredPriceProducts;
  }

  return searchValue.value.length > 2 ? filteredProducts : filterCategory(activeCategory.value);
});
</script>

<template>
    <div class="catalog">
      <CartModal />
      <div class="container">
        <ProductSlider
          class="swiper"
          :productsData="products"
        />
        <ProductList :models="productListData" />
        <div>
          <h1 v-if="productListData.length === 0">Sorry, nothing found...</h1>
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
.swiper {
  margin-bottom: 50px;
}
.catalog {
  padding: 50px 0;
}
</style>