<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header Section -->
    <header
      class="flex justify-between items-center w-full h-1/5 border-b border-gray-500 p-4">
      <nav class="flex w-full items-center relative">
        <!-- Logo -->
        <div class="w-10 h-10 ml-4 md:ml-24">
          <img src="../public/image/logo1.png" alt="Logo" />
        </div>

        <!-- Navigation links (hide on small screens) -->
        <ul
          class="hidden md:flex items-center justify-around w-1/2 lg:w-1/3 space-x-4 lg:space-x-8 ml-4 md:ml-24">
          <li>
            <NuxtLink to="/" class="text-lg font-bold text-green-900"
              >Product</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/contact" class="text-lg font-bold text-green-900"
              >Contact</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/promotion" class="text-lg font-bold text-green-900"
              >Promotion</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/bookinghistory" class="text-lg font-bold text-green-900"
              >Booking History</NuxtLink
            >
          </li>
        </ul>

        <!-- Search bar -->
        <div
          class="hidden md:flex items-center absolute right-1/4 lg:right-40 p-1 bg-gray-100 border border-gray-300 rounded-md">
          <input
            type="text"
            placeholder="Search....."
            class="p-1 outline-none" />
          <img src="../public/image/search.png" class="w-5 h-5 ml-2" />
        </div>

        <!-- Icons -->
        <div
          class="flex gap-3 md:gap-5 ml-auto md:absolute md:right-10 cursor-pointer mr-4 md:mr-0">
          <button class="flex w-10 h-10" @click="handleUserInfo">
            <img src="../public/image/user_logo.png" />
          </button>
        </div>
      </nav>
    </header>

    <!-- Main Section -->
    <main class="flex-1 bg-gray-100 overflow-y-auto">
      <slot />
    </main>

    <!-- Footer Section -->
    <footer class="bg-[#3A6351] border-t border-gray-300">
      <div class="container mx-auto px-4 py-6 flex justify-between items-start">
        <div class="w-1/2">
          <div class="flex items-center space-x-2">
            <img src="../public/image/logo2.png" alt="Logo" />
            <h2 class="text-2xl text-white font-bold">CUELINK.</h2>
          </div>
          <p class="flex justify-between items-end pt-8 text-white text-align-justify">
            We provide high-quality services with the goal of delivering an exceptional experience for our customers. 
            Our store offers a wide range of furniture products, along with attentive customer support. 
            Explore more about us and enjoy the best services we have to offer!
          </p>
        </div>

        <div class="flex space-x-6 text-sm font-semibold text-white">
          <a href="#" class="hover:text-yellow-600">Products</a>
          <a href="#" class="hover:text-yellow-600">Blog</a>
          <a href="#" class="hover:text-yellow-600">About</a>
          <a href="#" class="hover:text-yellow-600">Contacts</a>
        </div>
      </div>
      <div
        class="border-t border-gray-300 py-4 text-right text-sm text-gray-200 px-4">
        ©2024 Cuelink Inc. All rights reserved
      </div>
    </footer>
    <!-- Floating Button -->
    <div class="fixed bottom-5 right-10">
      <button
        @click="toggleMessage"
        class="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600">
        {{ isMessageOpen ? "Close Messages" : "Open Messages" }}
      </button>
    </div>

    <!-- Message Component -->
    <div v-if="isMessageOpen" class="fixed bottom-5 right-10 mb-14">
      <MessageBox v-model="cookie" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "nuxt/app";

const isMessageOpen = ref(false);
const cookie = Number(useCookie("customerID").value);
console.log(cookie);

const toggleMessage = () => {
  isMessageOpen.value = !isMessageOpen.value;
};

const handleUserInfo = () => {
  navigateTo("/userinfo");
};
</script>

<style scoped>
html,
body {
  margin: 0;
  height: 100%;
}
</style>
