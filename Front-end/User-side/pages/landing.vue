<template>
  <div class="w-full h-full overflow-y-auto">
    <div class="relative w-full h-full overflow-clip">
      <img
        src="\Image\img_1.jpg"
        alt="landing pic"
        class="w-full h-auto object-cover" />
      <div
        class="absolute inset-0 flex flex-col items-start justify-center bg-black bg-opacity-30 text-white px-48">
        <h1 class="text-4xl font-bold mb-4 text-start">
          Your Ultimate Billiards Table Booking Hub
        </h1>
        <p class="mb-6 text-2xl">
          The perfect place to relax, have fun, and make lasting memories! Our
          inviting and stylish venue offers top-quality billiard tables,
          creating the ideal environment for players of all skill levels.
          Whether you're here for a friendly game, a night out with friends, or
          just to unwind, every moment at Enjoy Time is designed for your
          enjoyment
        </p>
        <NuxtLink
          to="/userlogin"
          class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
          Log in now!
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>

<style scoped></style>
