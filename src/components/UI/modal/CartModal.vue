<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store/index";
import { useRouter } from 'vue-router';

import BlockQuantity from "@/components/UI/BlockQuantity.vue";

const store = useStore();
const router = useRouter();

const isModalOpen = computed(() => store.getters["useCartStore/getIsCartModalOpen"]);

const cart = computed(() => {
  return store.getters["useCartStore/getProductInCart"]
});
const closeModal = () => {
  store.dispatch("useCartStore/setIsCartModalOpen", false);
}

const openCheckoutForm = () => {
  closeModal();
  router.push(`/checkout`);
}

const goToProductPage = (id: number) => {
  router.push(`/product/${id}`);
};

const incrementQuantity = (id: number) => {
  store.dispatch("useCartStore/setIncrementQuantity", id)
};

const decrementQuantity = (id: number) => {
  
  store.dispatch("useCartStore/setDecrementQuantity", id)
};

const removeProductFromCart = (id: number) => {
  store.dispatch("useCartStore/removeProductFromCart", id);
};

</script>

<template>
  <div
    @click="closeModal"
    class="modal__backdrop"
    v-if="isModalOpen"
  />
  <dialog v-if="isModalOpen" class="modal" >
    <h2>
      Title
    </h2>
    <section>
      <div class="cart__mobile">
        <div class="cart__grid">
          <label class="cart__title">Photo</label>
          <label class="cart__title">Title</label>
          <label class="cart__title">Quantity</label>
          <label class="cart__title">Price</label>
          <label class="cart__title">Subtotal</label>
        </div>
      </div>
      <ul class="cart__list">
        <li
          v-for="product in cart"
          class="cart__grid"
          :key="product.id"
        >
          <img
            :src="product.image"
            class="cart__img"
            :alt="product.title"
            @click="goToProductPage(product.id)"
          />
          <p
            class="cart__item-title cart__item-text"
            @click="goToProductPage(product.id)"
          >
            {{ product.title }}
          </p>

          <div class="cart__mobile">
            <span>Quantity:</span>
            <BlockQuantity
              :quantity-number="product.quantity"
              @increment="incrementQuantity(product.id)"
              @decrement="decrementQuantity(product.id)"
            />
          </div>

          <div class="cart__mobile">
            <span>Price:</span>
            <p class="cart__item-text">${{ product.price }}</p>
          </div>

          <div class="cart__mobile">
            <span>Subtotal:</span>
            <p class="cart__item-text">
              ${{ (product.price * product.quantity).toFixed(2) }}
            </p>
          </div>

          <div class="cart__mobile-action">
            <font-awesome-icon
              class="cart__trash"
              :icon="['fas', 'trash']"
              @click="removeProductFromCart(product.id)"
            />
          </div>
        </li>
      </ul>
    </section>

    <section class="cart__actions">
      <button
        class="cart__close"
        @click="closeModal"
      >
        Postpone purchase
      </button>
      <button
        class="cart__succes"
        @click="openCheckoutForm"
      >
        Buy
      </button>
    </section>
  </dialog>
</template>

<style scoped lang="scss">
.modal {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  z-index: 3;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 20px;
  max-height: calc(100vh - 20px);
  width: 800px;
  overflow-y: auto;
  &__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    box-shadow: none;
    overflow: hidden;
    z-index: 2;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
}
.cart {
  display: grid;

  &__title {
    display: none;
  }
  &__grid {
    display: grid;
    gap: 15px;
    border-bottom: 1px solid lightgray;
  }
  &__mobile {
    display: flex;
    gap: 20px;
    align-items: center;
    span {
      font-weight: 600;
    }
  }
  &__mobile-action {
    justify-self: start;
    padding: 0 0 10px;
  }
  &__list {
    display: grid;
    gap: 20px;
    padding: 0;
    list-style: none;
  }
  &__img {
    width: 50px;
  }
  &__item-title {
    cursor: pointer;
    justify-self: start;
    text-align: left;
    &:hover {
      transition: color 0.1s linear;
      color: #ed8939;
    }
  }
  &__item-text {
    font-size: 14px;
  }
  &__totals-block {
    display: flex;
    gap: 20px;
    justify-content: flex-end;
    padding: 15px 0 0;
  }
  &__trash {
    cursor: pointer;
  }
  &__actions {
    display: flex;
    justify-content: end;
    gap: 20px;
  }
  &__succes {
    padding: 10px 20px;
    border: 1px solid transparent;
    background-color: #5ec343;
    font-weight: 600;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
  }
  &__close {
    font-family: "Open Sans";
    align-self: stretch;
    background: transparent;
    border: 1px solid #e2e2e2;
    color: #222222;
    border-radius: 6px;
    cursor: pointer;
  }
}

@media screen and (min-width: 768px) {
  .cart {
    display: block;
    &__grid {
      max-width: 900px;
      margin: auto;
      align-items: center;
      justify-items: center;
      grid-template-columns: 1fr 4fr 1fr 1fr 1fr 1fr;
      grid-gap: 15px;
      color: #222;
      padding: 15px 0;
      border-bottom: 1px solid lightgray;
    }
    &__title {
      display: block;
      font-weight: 600;
    }
    &__img {
      cursor: pointer;
      display: block;
      width: 100%;
      height: 40px;
      object-fit: contain;
    }
    &__img:hover {
      opacity: 0.7;
      transition: opacity 0.2s linear;
    }
    &__mobile {
      display: contents;
      span {
        display: none;
      }
    }
    &__mobile-action {
      justify-self: center;
      padding: 0;
    }
    &__totals-block {
      padding: 15px 20px 0 0;
    }
  }
}
</style>
