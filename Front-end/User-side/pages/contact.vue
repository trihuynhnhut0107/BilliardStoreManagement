<template>
  <div class="flex w-full min-h-[84vh] mt-[6vh]">
    <!-- Left-hand side -->
    <div class="flex flex-col h-full w-1/4 ml-[4vw]">
      <h1 class="font-bold text-4xl text-[#3A6351]">Cuelink</h1>
      <div
        class="flex flex-col space-y-[4vh] text-[#3A6351] mt-[4vh] text-2xl font-weight-400">
        <h2>
          Address: Đường Hàn Thuyên, khu phố 6, Thủ Đức, Hồ Chí Minh, Việt
          Nam.
        </h2>
        <h2>Email: cuelink@gmail.com</h2>
        <h2>Hotline:0123456789</h2>
      </div>
    </div>
    <!-- Right-hand side -->
    <div class="flex flex-col h-full w-3/4 ml-[4vw]">
      <div class="flex w-[60vw] h-[70vh] mb-[10vh]">
        <img :src="Map" alt="Map" />
      </div>
    </div>
  </div>
</template>

<script setup>
import DefaultLayout from "~/layouts/default.vue";
import { useRouter } from "vue-router";
import Map from "../public/Image/map.png";

definePageMeta({
  layout: "main",
});


</script>
