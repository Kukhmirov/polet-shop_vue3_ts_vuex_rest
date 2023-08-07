<script setup lang="ts">
import { computed } from "vue";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
    productsData: ProductsModel[];
}

const props = defineProps<Props>()
const modules = [ Pagination, Autoplay ];

const randomItem = computed(() => {
    const productsData = props.productsData;
    const randomIndexes = new Set();
    const randomItems = [];

    while (randomIndexes.size < 3) {
        const randomIndex = Math.floor(Math.random() * productsData.length);
        const randomProduct = productsData[randomIndex];

        if (!randomIndexes.has(randomIndex)) {
            randomIndexes.add(randomIndex);
            randomItems.push(randomProduct);
        }
    }

    return randomItems;
});

const isMobile = computed(() => window.innerWidth < 600);

console.log(isMobile.value);
</script>

<template>
    <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="50"
        :pagination="{
            clickable: isMobile ? false : true
        }"
        :autoplay="{ delay: 4000 }"
    >
        <SwiperSlide v-for="product in randomItem" :key="product.id">
            <div class="swiper__slide">
                <img :src="product.image" alt="в">
                <div class="swiper__description">
                    <h4>Random offer</h4>
                    <h4 class="swiper__price">price:{{ product.price }} $</h4>
                </div>
            </div>
        </SwiperSlide>
    </Swiper>
</template>

<style scoped lang="scss">
.swiper {
    &__slide {
        display: flex;
        align-items:center;
        justify-content: space-around;
        position: relative;
        height: 300px;
        width: 740px;
        margin: 0 auto;
        img {
            height: 100%;
            max-width: 400px;
        }
        &__description {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        &__price {
            color: red;
        }
    }
}
@media (max-width: 620px) {
    .swiper {
        &__slide {
            flex-direction: column;
            height: 400px;
            width: 300px;
            img {
                width: 200px;
                height: 250px;
            }
        }
    }
}
</style>