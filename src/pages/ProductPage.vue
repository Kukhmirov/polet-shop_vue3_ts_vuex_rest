<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";

import BlockQuantity from "@/components/UI/BlockQuantity.vue";
import { useQuantity } from "@/util/quantity";
import CartModal from "@/components/UI/modal/CartModal.vue";
import { noPhoto } from "@/assets/images/indexImages";



const store = useStore();
const router = useRouter();
const route = router.currentRoute.value.path;
const routeParams = route.split("/");
const lastDigit = Number(routeParams[routeParams.length - 1]);
const pr = ref();

const product = computed(() => pr.value = store.getters["useApiStore/getProductById"](lastDigit));

const [quantity, incrementQuantity, decrementQuantity] = useQuantity();


const isProductInCart = computed(() => store.getters["useCartStore/productInCart"](lastDigit));

const addToCart = () => {
  store.dispatch("useCartStore/setProductToCart", {...product.value, quantity: quantity.value});
};

const openCartModal = () => {
  router.push('/');
  store.dispatch("useCartStore/setIsCartModalOpen", true);
};

const isTruncated = ref(true);

const toggleTruncate = () => {
  isTruncated.value = !isTruncated.value;
};
const truncatedDescription = computed(() =>
  pr.value.description.slice(0, 200) + '...'
);
const toggleButton = computed(() =>
  isTruncated.value ? "Read more" : "Collapse"
);


</script>

<template>
  <CartModal />
  <div class="container">
    <div class="product-page">
      <div class="product-page__card">
        <div class="product-page__image-box">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.title"
            class="product-page__card-image"
          />
          <img
            v-else
            :src="noPhoto"
            alt="no photo"
            class="product-page__card-image"
          />
        </div>
        <div class="product-page__card-content">
          <h1 class="product-page__card-title"
            >{{ product.title }}
          </h1>

          <div class="product-page__card-rating">
            <font-awesome-icon
              :icon="['fas', 'star']"
              style="color: #ffea00;"
            />
            <p class="card__rating-text">
              {{ product.rating.rate }}
            </p>
          </div>
          <div class="product-page__card-actions">
            <h2>${{ product.price }}</h2>
            <div class="product-page__card-actions-buy">
              <BlockQuantity
                @decrement="decrementQuantity"
                @increment="incrementQuantity"
                :quantity-number="quantity"
                v-if="!isProductInCart"
              />
              <button
                class="product-page__succes"
                @click="addToCart"
                v-if="!isProductInCart"
              >
                Add to cart
              </button>

              <button
                v-else
                class="product-page__succes"
                @click="openCartModal"
              >
                Already is in your Cart
              </button>
            </div>
          </div>
          <div class="product-page__card-description">
            <h2>Description</h2>
            <p v-if="isTruncated">{{ truncatedDescription }}</p>
            <p v-else>{{ product.description }}</p>
            <button
              :class="[
                'product-page__open-text',
                { 'product-page__open-text--active': !isTruncated },
              ]"
              @click="toggleTruncate"
            >
              {{ toggleButton }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped lang="scss">
.product-page {
  position: relative;

  &__card {
    display: grid;
    gap: 20px;
  }
  &__card-title {
    text-align: left;
    font-size: 28px;
    line-height: 34px;
  }
  &__card-rating {
    width: 100%;
    display: flex;
    align-items: center;
  }
  &__image-box {
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 400px;
  }
  &__card-image {
    display: block;
    width: 200px;
  }
  &__card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  &__succes {
    width: 100%;
    padding: 10px 20px;
    border: 1px solid transparent;
    border-radius: 6px;
    background-color: #5ec343;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
  }
  &__card-actions {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  &__card-actions-buy {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  &__card-description {
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: left;
    p {
      font-family: "Open Sans", Helvetica, Arial, sans-serif;
    }
  }
  &__open-text {
    padding: 10px 20px;
    margin-top: 20px;
    border: 1px solid transparent;
    border-radius: 6px;
    background-color: #ffa801;
    color: #fff;
    cursor: pointer;
    &--active {
      background-color: transparent;
      border: 1px solid black;
      color: black;
    }
  }
}

@media screen and (min-width: 768px) {
  .product-page {
    &__card {
      padding: 30px;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    &__card-content {
      align-items: flex-start;
    }
    &__card-title {
      font-size: 36px;
      line-height: 40px;
    }
    &__card-actions {
      align-items: flex-start;
    }
    &__card-actions-buy {
      flex-direction: row;
    }
  }
}

@media screen and (min-width: 1024px) {
  .product-page{
    &__card-image {
      max-width: 600px;
      max-height: 600px;
      object-fit: contain;
    }
  }
}
</style>
