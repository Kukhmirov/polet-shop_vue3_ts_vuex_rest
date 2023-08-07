<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";

import { logoPolet } from "@/assets/images/indexImages";

const router = useRouter();
const store = useStore();

const category = ref(store.getters["useApiStore/getAllCategories"]);
let isActiveTab = ref("all");

const isHomepage = computed(() => router.currentRoute.value.path === '/');

const setActiveCategory = (selectedCategory: string) => {
  isActiveTab.value = selectedCategory;
  store.dispatch("useCartStore/setActiveCategory", selectedCategory);
  if (router.currentRoute.value.path !== '/') {
    router.push('/');
  }
};

const openCartModal = () => {
  store.dispatch("useCartStore/setIsCartModalOpen", true);
};

const cartFull = computed(() => {
  return store.getters["useCartStore/getProductInCart"].length;
});

</script>

<template>
    <header>
      <div class="header">
        <div class="container">
          <div class="header__box">
            <div class="header__logo-box">
              <router-link
                to="/"
                :class="[
                  'header__logo',
                  isHomepage ? 'header__logo-disabled' : 'header__logo_active',
                ]"
                disabled="true"
              >
                <img :src="logoPolet" alt="Логотип компании">
              </router-link>
            </div>
            <div class="header__menu-box">
              <ul class="header__menu" >
                <li
                  v-for="item in category"
                  :key="item"
                  :class="[
                    'header__menu-item',
                    { header__item_active: isActiveTab === item },
                  ]"
                  @click="setActiveCategory(item)"
                >
                  {{ item.toUpperCase() }}
                </li>
              </ul>
            </div>
            <div class="header__items-box">
              <font-awesome-icon
                class="header__item"
                :icon="['fas', 'cart-shopping']"
                @click="openCartModal"
              />
              <span
                class="header__cart-length"
                v-if="cartFull"
              >
                {{ cartFull }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
</template>
  
<style scoped lang="scss" >
.header {
  border-bottom: 1px solid #969696;
  padding: 10px 0;

  &__box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__logo-disabled {
    pointer-events: none;
  }
  &__logo_active {
    color: #ffa801;
    &:hover {
      opacity: 0.6;
      transition: opacity 0.3s ease-in;
    }
  }
  &__logo-box {
    img {
      max-height: 50px;
    }
  }
  &__menu-box {
    display: flex;
    align-items: center;
    padding: 0 0 0 10px;
  }

  &__menu {
    display: flex;
  }
  &__menu-item {
    padding: 10px 14px;
    border-radius: 6px;
    cursor: pointer;
  }
  &__item_active {
    background-color: transparent;
    position: relative;
    font-weight: 600;
    color: #222222;
    cursor: default;
  }

  &__items-box {
    position: relative;
    margin-left: auto;
  }
  &__item {
    margin-left: 15px;
    cursor: pointer;
  }
  &__cart-length {
    position: absolute;
    top: -10px;
    right: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ffa801;
    font-size: 12px;
  }
}

.open {
  display: block;
}
@media (max-width: 768px) {
  .header {
    padding: 5px 0;

    &__box {
      flex-direction: column;
      align-items: center;
    }

    &__logo-box {
      margin-bottom: 10px;
    }

    &__menu-box {
      padding: 0;
    }

    &__menu {
      flex-wrap: wrap;
      justify-content: center;
    }

    &__menu-item {
      margin-bottom: 5px;
    }

    &__items-box {
      width: 100%;
      display: flex;
      justify-content: end;
      margin-left: 0;
      margin-top: 10px;
    }
  }
}
</style>