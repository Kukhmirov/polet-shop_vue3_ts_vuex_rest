<script setup lang="ts">
import { computed, ref, watch } from "vue";

import ProductCard from "@/components/utility/ProductCard.vue";
import TheFilter from "@/components/UI/TheFilter.vue";
import { PRODUCT } from "@/constants/constants";

interface Props {
  models: ProductsModel[];
}

const props = defineProps<Props>()

let itemsCountToRender = ref(PRODUCT.PRODUCTS_LIMIT);

const productsToRender = computed(() =>
  props.models.slice(0, itemsCountToRender.value)
);

const handleShowMore = (count: number) => {
  itemsCountToRender.value += count;
};

watch(
  () => props.models,
  () => {
    itemsCountToRender.value = PRODUCT.PRODUCTS_LIMIT;
  }
);

</script>

<template>
  <TheFilter />
  <ul class="products-list">
    <li
      class="products-list__item"
      v-for="product in productsToRender"
      :key="product.id"
    >
      <ProductCard
        :image="product.image"
        :price="product.price"
        :title="product.title"
        :rating="product.rating"
        :id="product.id"
      />
    </li>
  </ul>
  <button
    v-if="itemsCountToRender < models.length"
    @click="handleShowMore(PRODUCT.PRODUCTS_LIMIT)"
  >
    Show more
  </button>
</template>

<style scoped lang="scss">
.products-list {
  display: grid;
  gap: 25px;
  list-style: none;
  padding: 0;
}
.products-list__show-more {
  padding: 20px 0 0;
}

button {
  padding: 10px 20px;
  margin-top: 20px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: #ffa801;
  color: #fff;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .products-list {
    gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
  }
}

@media screen and (min-width: 1024px) {
  .products-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1280px) {
  .products-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>