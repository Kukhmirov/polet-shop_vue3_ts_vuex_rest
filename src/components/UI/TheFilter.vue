<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/store/index";

import { PRODUCT } from "@/constants/constants";


const store = useStore();

const searchInput = ref<string>("");
const minPrice = ref<number>();
const maxPrice = ref<number>();

const handleSearchInput = (event: Event) => {
  searchInput.value = (event.target as HTMLInputElement).value;
  store.dispatch("useCartStore/setSearchByName", searchInput.value);
};

const removeInput = () => {
  searchInput.value = "";
  store.dispatch("useCartStore/setSearchByName", searchInput.value);
};

const handleSearchPrice = () => {
  const rangePrice = {
    min: minPrice.value || PRODUCT.MIN_PRICE,
    max: maxPrice.value || PRODUCT.MAX_PRICE,
  }
  store.dispatch("useCartStore/setSearchByPriceRange", rangePrice);
}

</script>

<template>
  <div class="filters">
    <div class="priceRange">
      <span>price range</span>
      <input
        v-model="minPrice"
        placeholder="0"
        type="number"
        class="filters__search-input filters__search-input--price"
        @input="handleSearchPrice"
      >
      <input
        v-model="maxPrice"
        placeholder="1000"
        type="number"
        class="filters__search-input filters__search-input--price"
        @input="handleSearchPrice"
      >
    </div>
    <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
    <input
      v-model="searchInput"
      placeholder="Search"
      type="text"
      class="filters__search-input"
      @input="handleSearchInput"
    >
    <font-awesome-icon
      class="filters__remove"
      :icon="['fas', 'delete-left']"
      @click="removeInput"
    />
  </div>
</template>

<style scoped lang="scss">
.filters {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;

  &__search-input {
    margin: 0 20px;
  }

  &__search-input {
    margin: 0 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    font-size: 14px;
    transition: border-color 0.3s ease;

    &--price {
      width: 100px;
    }

    &:focus {
      border-color: #000;
    }
  }
  
  &__remove {
    color: red;
    cursor: pointer;
  }
}
</style>