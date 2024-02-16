<script setup>
import Link from "./Link.vue";
import Logo from "./Logo.vue";
import { useProductStore } from "../stores/products";
const products = useProductStore();
</script>
<template>
  <header
    class="px-10 py-5 flex flex-col lg:flex-row gap-5 lg:items-center justify-between bg-gray-900 absolute top-0 w-full z-10"
  >
    <Logo />
    <div class="flex gap-5 text-white">
      <h2 class="text-lg font-extrabold mt-1">Filtros:</h2>
      <div
        class="flex items-center gap-2"
        v-for="category in products.categories"
        :key="category.id"
      >
        <input
          type="radio"
          name="category"
          :value="category.id"
          class="h-4 w-3 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          :checked="products.selectCategory === category.id"
          @change="products.selectCategory = +$event.target.value"
        />
        <label class="text-gray-100">{{ category.name }}</label>
      </div>
    </div>
    <nav>
      <Link to="sales">Administrar</Link>
    </nav>
  </header>
</template>
