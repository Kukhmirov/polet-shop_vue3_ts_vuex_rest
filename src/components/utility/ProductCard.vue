<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import BlockQuantity from "@/components/UI/BlockQuantity.vue";
import { useQuantity } from "@/util/quantity";
import { useStore } from "@/store/index";


const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: [Object, Number],
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const store = useStore();
const router = useRouter();

const [quantity, incrementQuantity, decrementQuantity] = useQuantity();

const isProductInCart = computed(() => store.getters["useCartStore/productInCart"](props.id));

const product = computed(() => {
  return {
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image,
    quantity,
    rating: props.rating,
  };
});

const openCartModal = () => {
  store.dispatch("useCartStore/setIsCartModalOpen", true);
};

const goToPage = (id: number) => {
  router.push(`product/${id}`);
};

const addToCart = () => {
  store.dispatch("useCartStore/setProductToCart", product.value);
};
</script>

<template>
  <div class="card">
    <div class="card__container">
      <div class="card__image-container">
        <img
          :src="image"
          class="card__image"
          :alt="title"
          @click="goToPage(id)"
        />
      </div>
      <h4
        class="card__title"
        @click="goToPage(id)"
      >
        {{ title }}
      </h4>
      
      <div class="card__rating">
        <font-awesome-icon
          :icon="['fas', 'star']"
          style="color: #ffea00;"
        />
        <p class="card__rating-text">
          {{ typeof rating === 'number' ? rating : rating?.rate }}
        </p>
      </div>

      <h3 class="card__price">${{ price }}</h3>

      <div
        v-if="!isProductInCart"
        class="card__actions"
      >
        <BlockQuantity
          @decrement="decrementQuantity"
          @increment="incrementQuantity"
          :quantity-number="quantity"
        />
        <div 
          class="card__add"
          @click="addToCart"
        >
          Add to cart
          <font-awesome-icon :icon="['fas', 'cart-shopping']" style="margin-left: 15px;" />
        </div>
      </div>
      <button
        v-if="isProductInCart"
        class="card__succes"
        @click="openCartModal"
      >
        Already is in your Cart
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  padding: 16px;
  border: 1px solid #fbfbfb;
  box-shadow: 0px 5px 22px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  &__container {
    display: flex;
    gap: 12px;
    flex-direction: column;
    align-items: flex-start;
    min-height: 412px;
  }
  &__image-container {
    align-self: center;
    position: relative;
    width: 266px;
  }
  &__image {
    display: block;
    width: 100%;
    height: 235px;
    object-fit: contain;
    cursor: pointer;
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  }

  &__title {
    min-height: 43px;
    cursor: pointer;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  &__rating {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  &__rating-text {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
  }

  &__price {
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
  }
  &__actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__add {
    display: flex;
    align-items: center;
    min-width: 100%;
    cursor: pointer;
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
}
@media screen and (min-width: 768px) {
  .card:hover {
    box-shadow: 0px 21px 44px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
  }

  .card__title:hover {
    transition: color 0.1s linear;
    color: #ffa801;
  }

  .card__actions {
    gap: 47px;
  }
}
</style>