import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";
import { useCouponStore } from "./cupons";
import { collection, addDoc, runTransaction, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { getCurrentDate } from "../helpers/configApp";
export const useCartStore = defineStore("cart", () => {
  const coupon = useCouponStore();
  const db = useFirestore();
  const items = ref([]);
  const subTotal = ref(0);
  const taxes = ref(0);
  const total = ref(0);
  const MAX_PRODUCTS = 5;
  const taxPercentage = 0.13;
  function addItem(item) {
    const index = isItemInCart(item.id);
    if (index >= 0) {
      if (isProductAvailable(item, index)) {
        alert("Haz alcanzado el límite de productos.");
        return;
      }
      //
      items.value[index].quantity++;
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id });
    }
  }
  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }
  const isEmpty = computed(() => items.value.length === 0);
  const checkProductAvailability = computed(() => {
    return (product) =>
      product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS;
  });
  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  }
  watchEffect(() => {
    subTotal.value = items.value.reduce(
      (total, item) => Number(total + item.quantity * item.price),
      0
    );
    taxes.value = Number((subTotal.value * taxPercentage).toFixed(2));
    total.value = Number(subTotal.value - coupon.discount);
  });

  const isItemInCart = (id) => items.value.findIndex((i) => i.id === id);
  const isProductAvailable = (item, index) => {
    return (
      items.value[index].quantity >= item.availability ||
      items.value[index].quantity >= MAX_PRODUCTS
    );
  };
  async function checkout() {
    try {
      await addDoc(collection(db, "sales"), {
        items: items.value.map((item) => {
          const { availability, category, ...data } = item;
          return data;
        }),
        subtotal: subTotal.value,
        taxes: taxes.value,
        discount: coupon.discount,
        total: total.value,
        date: getCurrentDate(),
      });
      items.value.forEach(async (item) => {
        const productRef = doc(db, "products", item.id);
        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(productRef);
          const availability =
            currentProduct.data().availability - item.quantity;
          transaction.update(productRef, { availability });
        });
      });
      $reset();
      coupon.$reset();
    } catch (error) {
      console.log(error);
    }
  }
  function $reset() {
    items.value = [];
    subTotal.value = 0;
    taxes.value = 0;
    total.value = 0;
  }
  return {
    addItem,
    items,
    isEmpty,
    checkProductAvailability,
    updateQuantity,
    subTotal,
    taxes,
    total,
    removeItem,
    checkout,
  };
});
