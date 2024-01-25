<script setup>
import Link from "./Link.vue";
import Logo from "./Logo.vue";
</script>
<template>
  <header
    class="px-10 py-5 flex justify-between bg-gray-900 absolute top-0 w-full z-10"
  >
    <Logo />
    <nav>
      <Link to="admin">Administrar</Link>
    </nav>
  </header>
</template>
