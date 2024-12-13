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
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="#fff" viewBox="0 0 16 16">
                <path
                  d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1z" />
                <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              </svg>
              <h3 class="text-2xl font-bold">Demo.</h3>
            </div>
            <div class="max-w-80 line-clamp-3">
              <p class="text-sm">
                {{ appDescription }}
              </p>
            </div>
          </div>
          <div>
            <ul class="flex gap-10 font-bold">
              <NuxtLink to="/products">PRODUCTS</NuxtLink>
              <NuxtLink to="/blog">BLOG</NuxtLink>
              <NuxtLink to="/about">ABOUT</NuxtLink>
              <NuxtLink to="/contacts">CONTACTS</NuxtLink>
            </ul>
          </div>
        </div>
        <hr />
        <div class="flex justify-end items-end pt-8">
          <p class="text-sm">&#64;2024 Demo Inc. All rights reserved</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const appDescription = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui consectetur expedita cupiditate provident!')
</script>

<style></style>
