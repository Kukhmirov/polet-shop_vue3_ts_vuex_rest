<script setup lang="ts">
import { reactive } from "vue";
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";

import BaseInput from "@/components/UI/BaseInput.vue";
import CartModal from "@/components/UI/modal/CartModal.vue";
import { INPUT_FIELDS } from "@/constants/constants";


const USER_INPUT_INIT: UserInput = {
  name: "",
  cardNumber: "",
  cvc: "",
  expiryDate: "",
  phone: "",
  comment: "",
  email: "",
  address: "",
};

const store = useStore();
const router = useRouter();

const cart = store.getters["useCartStore/getProductInCart"];

const inputFields = INPUT_FIELDS;
const userInput: UserInput = reactive({ ...USER_INPUT_INIT });
const formError: Record<string, string> = reactive({});

const handleChange = (evt: Event): void => {
  const field = (evt.target as HTMLInputElement).name;
  const value = (evt.target as HTMLInputElement).value;

  clearValidation(field);
  userInput[field as keyof UserInput] = value;
};

const clearValidation = (field: string | number): void => {
  if (field) {
    formError[field] = "";
    return;
  }

  Object.assign(formError, {});
};

const validateForm = (): boolean => {
  let isFormValid = true;
  const userInputDate = new Date(+('20' + userInput.expiryDate.split('/')[1]), +userInput.expiryDate.split('/')[0] - 1);
  const currentDate = new Date();

  const isNameInputValid = /^[a-zA-Z]+\s[a-zA-Z]+$/.test(userInput.name.trim());
  const isPhoneValid = /^((\+7|7|8)+([0-9]){10})$/.test(userInput.phone.trim());
  const isCardNumberValid = /^[0-9]{16}$/.test(userInput.cardNumber.trim());
  const isCardCvcValid = /^[0-9]{3}$/.test(userInput.cvc.trim());
  const isExpiryDateValid = /^(0?[1-9]|1[0-2])\/[0-9]{2}$/.test(userInput.expiryDate) && userInputDate > currentDate;

  if (!isNameInputValid || !isPhoneValid || !isCardNumberValid || !isCardCvcValid || !isExpiryDateValid) {
    formError.name = isNameInputValid
      ? ""
      : "Enter the first name, last name in Latin letters separated by a space";
    formError.phone = isPhoneValid
      ? ""
      : "Phone number format +7/7/8 XXX XXX XX XX";
    formError.cvc = isCardCvcValid ? "" : "Invalid cvc number";
    formError.cardNumber = isCardNumberValid ? "" : "Invalid card number";
    formError.expiryDate = isExpiryDateValid ? "" : "Invalid expiry date";
    isFormValid = false;
  }

  return isFormValid;
};

const submitForm = () => {
  console.log(11);
  
  if (!validateForm()) return;
  console.log(22);

  console.log("order:", {
    id: 1,
    customer: {
      name: userInput.name,
      cardNumber: userInput.cardNumber,
      cvc: userInput.cvc,
      expiryDate: userInput.expiryDate,
      phone: userInput.phone,
      email: userInput.email,
      comment: userInput.comment,
    },
    products: cart,
  });

  router.replace("/");
  store.dispatch("useCartStore/clearCart");

  Object.assign(userInput, USER_INPUT_INIT);
};

</script>

<template>
  <CartModal />
  <div class="checkout">
    <h1>Checkout</h1>

    <div v-if="!cart.length"
      >Cart is empty. Nothing to render</div
    >

    <div class="checkout__content" v-if="cart.length">
      <h2>Your personal data</h2>
      <div class="checkout__form">
        <form
          autocomplete="off"
          class="form"
          novalidate
          @submit.prevent="submitForm"
        >
          <ul class="checkout-form__input-list">
            <li v-for="input in inputFields" :key="input.label">
              <BaseInput
                :placeholder="input.placeholder"
                :label="input.label"
                :type="input.type"
                :name="input.name"
                :required="input.required"
                :error="formError[input?.name]"
                :value="userInput[input.name]"
                :handleChange="handleChange"
              />
            </li>
          </ul>

          <button
            type="submit"
            mode="success"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.checkout {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 934px;
  gap: 40px;
  &__content {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  &__form {
    max-width: 40%;
  }
}
</style>