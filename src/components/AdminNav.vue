<script setup>
import Link from "./Link.vue";
import { RouterLink } from "vue-router";
import { name, salesPointType } from "../helpers/configApp";
</script>
<template>
  <header
    class="px-10 py-5 flex justify-between bg-gray-900 absolute top-0 w-full z-10"
  >
    <div>
      <h1 class="text-3xl font-black text-white">
        {{ salesPointType }}
        <span class="text-orange-400">{{ name }}</span>
      </h1>
    </div>
    <nav>
      <RouterLink
        :to="{ name: 'products' }"
        class="rounded text-white p-12 font-bold"
        >Productos</RouterLink
      >
      <RouterLink
        :to="{ name: 'sales' }"
        class="rounded text-white p-12 font-bold"
        >Ventas</RouterLink
      >
      <Link to="shop">Ir a Tienda</Link>
    </nav>
  </header>
</template>
