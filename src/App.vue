<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "@/store/index";

import TheHeader from "@/components/header/TheHeader.vue";
import TheLoader from "@/components/UI/TheLoader.vue";


const store = useStore();
const dataLoaded = ref(false);

onMounted(async () => {
  if(store.getters["useCartStore/getProductInCart"]) {
    await store.dispatch("useCartStore/fetchCartStorage");
  }
  if(!store.getters["useApiStore/isProducts"].value) {
    await store.dispatch("useApiStore/fetchProducts");
  }
  dataLoaded.value = true;
});
</script>

<template>
  <TheHeader v-if="dataLoaded"></TheHeader>
  <TheLoader v-if="!dataLoaded" />
  <router-view v-else/>
</template>