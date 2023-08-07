<script setup lang="ts">
import { computed } from "@vue/runtime-core";


const emit = defineEmits(["increment", "decrement"]);
const props = defineProps({
  quantityNumber: {
    type: Number,
    required: true,
    default: 1,
  },
});

const isButtonDisabled = computed(() => props.quantityNumber <= 1);

</script>

<template>
  <div class="quantity">
    <button
      type="button"
      :disabled="isButtonDisabled"
      @click="emit('decrement')"
    >
      -
    </button>

    <span class="quantity__count">{{ quantityNumber }}</span>

    <button
      type="button"
      @click="emit('increment')"
    >
      +
    </button>
  </div>
</template>

<style scoped>
.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity__count {
  width: 25px;
}

button {
  width: 34px;
  height: 34px;
  border: 1px solid #838383;
  border-radius: 8px;
  font-size: 22px;
  color: black;
  cursor: pointer;
}
</style>
