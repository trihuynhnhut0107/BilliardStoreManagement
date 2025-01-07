<template>
  <div>
    <div>
      <slot></slot>
    </div>

    <div class="fixed bottom-0 left-0 right-0 bg-[#3A6351] h-fit max-h-[25vh] text-white">
      <div class="px-20 pt-8">
        <div class="flex justify-between pb-8">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <img src="../public/logo2.png" />
              <h3 class="text-2xl font-bold">CUELINK.</h3>
            </div>
            <div class="max-w-80 line-clamp-3">
              <p class="text-sm">
                {{ appDescription }}
              </p>
            </div>
          </div>
          <div>
            <ul class="flex gap-10 font-bold">
              <NuxtLink>PRODUCTS</NuxtLink>
              <NuxtLink>BLOG</NuxtLink>
              <NuxtLink>ABOUT</NuxtLink>
              <NuxtLink>CONTACTS</NuxtLink>
            </ul>
          </div>
        </div>
        <hr />
        <div class="flex justify-end items-end pt-8">
          <p class="text-sm">&#64;2024 Cuelink Inc. All rights reserved</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const appDescription = ref('We provide high-quality services with the goal of delivering an exceptional experience for our customers. Our store offers a wide range of furniture products, along with attentive customer support. Explore more about us and enjoy the best services we have to offer!')
</script>

<style></style>
