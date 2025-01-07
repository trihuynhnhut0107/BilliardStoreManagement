<template>
  <div class="w-screen overflow-auto flex flex-col">
    <header
      class="flex justify-between items-center w-full h-full border-b border-gray-500 p-4">
      <nav class="flex w-full items-center relative">
        <!-- Logo -->
        <div class="flex gap-4">
          <img src="../public/image/logo1.png" alt="Logo" />
          <h3 class="font-bold text-2xl">CUELINK</h3>

        </div>

        <!-- Navigation links (hide on small screens) -->
        <!-- <ul
          class="hidden md:flex items-center justify-around w-1/2 lg:w-1/3 space-x-4 lg:space-x-8 ml-4 md:ml-24">
          <li>
            <NuxtLink to="/" class="text-lg font-bold text-green-900"
              >Products</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/contact" class="text-lg font-bold text-green-900"
              >Contact</NuxtLink
            >
          </li>
        </ul> -->

        <!-- Search bar (visible only on medium and larger screens) -->
        <!-- <div
          class="hidden md:flex items-center absolute right-1/4 lg:right-40 p-1 bg-gray-100 border border-gray-300 rounded-md">
          <input
            type="text"
            placeholder="Search....."
            class="p-1 outline-none" />
          <img src="../public/image/search.png" class="w-5 h-5 ml-2" />
        </div> -->

        <!-- Icons (adjust position for small screens) -->
        <!-- <div
          class="flex gap-3 md:gap-5 ml-auto md:absolute md:right-10 cursor-pointer mr-4 md:mr-0">
          <button class="flex w-10 h-10" @click="handleUserInfo">
            <img src="../public/image/user_logo.png" />
          </button>
        </div> -->
      </nav>
    </header>
    <main class="w-full h-full">
      <slot />
    </main>
    <footer class="bg-[#3A6351] border-t border-gray-300">
      <div class="container mx-auto px-4 py-6 flex justify-between items-start">
        <div class="w-1/2">
          <div class="flex items-center space-x-2">
            <img src="../public/image/logo2.png" alt="Logo" />
            <h2 class="text-2xl text-white font-bold">Cuelink.</h2>
          </div>
          <p class="text-white mt-2 justify-between items-end text-align-justify">
            We provide high-quality services with the goal of delivering an exceptional experience for our customers. Our store offers a wide range of furniture products, along with attentive customer support. Explore more about us and enjoy the best services we have to offer!
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
  </div>
</template>

<script>
const handleUserInfo = () => {
  // Handle user information submission here
  router.push("/userinfo");
};
</script>
