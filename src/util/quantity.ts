import { ref, Ref } from 'vue';

export const useQuantity = (): [Ref<number>, () => void, () => void] => {
  const quantity: Ref<number> = ref(1);

  const incrementQuantity = () => {
    quantity.value += 1;
  };

  const decrementQuantity = () => {
    quantity.value -= 1;
  };

  return [quantity, incrementQuantity, decrementQuantity];
};