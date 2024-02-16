<script setup>
import SalesDetailsVue from "@/components/SalesDetails.vue";
import { ref } from "vue";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import { useSalesStore } from "../../stores/sales";
import SalesDetails from "../../components/SalesDetails.vue";
import FormatCurrency from "currency-formatter";
const formatter = ref({
  date: "DD-MM-YYYY",
  month: "MMMM",
});
const sales = useSalesStore();
console.log(sales.salesCollection);
</script>

<template>
  <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>
  <div class="md:flex md:items-start gap-5">
    <div class="md:w1/2 lg:w-1/3 bg-white flex justify-center p-5">
      <VueTailwindDatePicker
        v-model="sales.date"
        i18n="es-mx"
        as-single
        no-input
        :formatter="formatter"
      />
    </div>
    <div
      class="md:w1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32"
    >
      <p class="text-center text-lg" v-if="sales.isDateSelected">
        Ventas de la fecha: <span class="font-black">{{ sales.date }}</span>
      </p>
      <p v-else class="text-center text-lg">Selecciona una fecha</p>
      <div v-if="sales.salesCollection.length" class="space-y-5">
        <SalesDetails
          v-for="sale in sales.salesCollection"
          :key="sale.id"
          :sale="sale"
        />
        <p class="text-right text-2xl">
          Total del día:
          <span class="font-black">
            {{
              FormatCurrency.format(sales.totalSalesDay, { code: "CRC" })
            }}</span
          >
        </p>
      </div>
      <p v-else-if="sales.noSales" class="text-lg text-center">
        No se encontraron ventas en este día
      </p>
    </div>
  </div>
</template>
