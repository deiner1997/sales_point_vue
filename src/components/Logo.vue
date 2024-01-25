<script setup>
import { name, salesPointType } from "../helpers/configApp";
</script>
<template>
  <div>
    <h1 class="text-3xl font-black text-white">
      {{ salesPointType }}
      <span class="text-orange-400">{{ name }}</span>
    </h1>
  </div>
</template>
