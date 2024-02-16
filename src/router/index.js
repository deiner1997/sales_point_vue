import { createRouter, createWebHistory } from "vue-router";
import ShopView from "@/views/ShopView.vue";
import AdminLayout from "../views/Admin/AdminLayout.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "shop",
      component: ShopView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      children: [
        {
          path: "products",
          name: "products",
          component: () => import("../views/Admin/ProductsView.vue"),
        },
        {
          path: "products/new",
          name: "new-product",
          component: () => import("../views/Admin/NewProductView.vue"),
        },
        {
          path: "products/edit/:id",
          name: "edit-product",
          component: () => import("../views/Admin/EditProductView.vue"),
        },
        {
          path: "sales",
          name: "sales",
          component: () => import("../views/Admin/SalesView.vue"),
        },
      ],
    },
  ],
});

export default router;
