<script setup lang="ts">
import { PropType } from "vue";


defineProps({
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  error: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    required: true,
  },
  value: {},
  handleChange: {
    type: Function as PropType<(evt: Event) => void>,
    required: true,
  },
});
</script>

<template>
  <div class="base-input">
    <label
      class="base-input__label"
      for="input"
    >
      {{ label }}
      <span
        v-if="required"
        class="base-input__label-required"
      >
        *
      </span>
    </label>
    <input
      id="input"
      :placeholder="placeholder"
      :type="type"
      :class="['base-input__input', error ? 'base-input__input_error' : '']"
      :name="name"
      :value="value"
      @input="handleChange"
      :required="required"
    />
    <span class="base-input__error" v-if="error">{{ error }}</span>
  </div>
</template>

<style scoped lang="scss">
.base-input {
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 90px;

  &__label {
    align-self: flex-start;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    color: #333333;
  }
  &__label-required {
    color: #ef2525;
  }
  &__input {
    font-size: 16px;
    line-height: 20px;
    color: #222222;
    padding: 10px 20px;
    border-radius: 10px;
    border: 1px solid lightgray;
    outline: 2px solid transparent;
    &::placeholder {
      font-size: 14px;
      color: lightgray;
    }
  }
  &__input_error {
    transition: outline 0.3s ease-in;
    outline: 2px solid #ef2525;
  }
  &__error {
    align-self: flex-start;
    font-size: 14px;
    color: #ef2525;
  }
}
</style>