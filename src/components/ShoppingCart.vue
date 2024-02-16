<script setup>
import { useCartStore } from "../stores/cart";
import { useCouponStore } from "../stores/cupons";

import ShoppingCartItem from "./ShoppingCartItem.vue";
import Amount from "./Amount.vue";
import FormatCurrency from "currency-formatter";
import Coupon from "./CouponForm.vue";

const cart = useCartStore();
const coupon = useCouponStore();
</script>
<template>
  <p v-if="cart.isEmpty" class="text-xl text-center text-gray-900">
    El carrito está vacio
  </p>
  <div v-else>
    <p class="text-4xl font-bold text-gray-900">Resumen de Venta</p>
    <ul role="list" class="mt-6 divide-y divide-gray-200">
      <ShoppingCartItem
        v-for="item in cart.items"
        :key="item.id"
        :item="item"
      />
    </ul>
    <dl
      class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500"
    >
      <Amount>
        <template #label>Subtotal:</template>
        {{ FormatCurrency.format(cart.subTotal, { code: "CRC" }) }}
      </Amount>
      <Amount>
        <template #label>Impuestos:</template>
        {{ FormatCurrency.format(cart.taxes, { code: "CRC" }) }}
      </Amount>
      <Amount v-if="coupon.isValidCoupon">
        <template #label>Descuento:</template>
        {{ FormatCurrency.format(coupon.discount, { code: "CRC" }) }}
      </Amount>
      <Amount>
        <template #label>Total a pagar:</template>
        {{ FormatCurrency.format(cart.total, { code: "CRC" }) }}
      </Amount>
    </dl>
    <Coupon />
    <button
      type="button"
      class="mt-10 w-full bg-orange-600 hover:bg-orange-700 text-white uppercase font-bold p-3"
      @click="cart.checkout"
    >
      Confirmar Compra
    </button>
  </div>
</template>
