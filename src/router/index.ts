import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CatalogPage from '@/pages/CatalogPage.vue';
import ProductPage from "@/pages/ProductPage.vue";
import CheckoutPage from "@/pages/CheckoutPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: CatalogPage
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
