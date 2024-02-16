<script setup>
import { computed } from "vue";
import FormatCurrency from "currency-formatter";
import { RouterLink } from "vue-router";
import EditButton from "../components/EditButton.vue";
import DeleteButton from "../components/DeleteButton.vue";

const props = defineProps({
  product: {
    type: Object,
  },
});
const isProductNotAvailable = computed(() => props.product.availability === 0);
</script>

<template>
  <li
    :class="{ 'opacity-30': isProductNotAvailable }"
    class="flex items-center space-x-6 border border-gray-200 p-6 bg-white shadow"
  >
    <img :src="product.image" :alt="product.name" class="h-24 w-24" />
    <div class="space-y-2 flex-auto">
      <h3 class="text-gray-900">{{ product.name }}</h3>
      <p class="font-extrabold">
        {{ FormatCurrency.format(product.price, { code: "CRC" }) }}
      </p>
      <p>{{ product.availability }}</p>
    </div>
    <div class="flex items-center gap-3">
      <RouterLink :to="{ name: 'edit-product', params: { id: product.id } }">
        <EditButton />
      </RouterLink>
      <DeleteButton :product="product" />
    </div>
  </li>
</template>
