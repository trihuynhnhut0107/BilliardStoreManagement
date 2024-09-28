<template>
    <div>
      <!-- Navbar -->
      <header class="bg-green-400 p-6 flex justify-between items-center w-full">
        <nav class="flex w-full items-center">
          <div class="absolute w-10 h-10 left-24">
            <img src="../public/image/eye.png" alt="Logo" />
          </div>
          <ul class="flex justify-around w-1/3 absolute left-1/4 space-x-8">
            <li><NuxtLink to="/" class="text-xl font-bold text-green-900">Home</NuxtLink></li>
            <li><NuxtLink to="/" class="text-xl font-bold text-green-900">Products</NuxtLink></li>
            <li><NuxtLink to="/" class="text-xl font-bold text-green-900">To Contact</NuxtLink></li>
          </ul>
          <div class="flex items-center absolute right-1/4 p-1 bg-gray-100 border border-gray-300 rounded-md">
            <input type="text" placeholder="Search....." class="p-1 outline-none" />
            <img src="../public/image/search.png" class="w-5 h-5 ml-2">
          </div>
          <div class="flex gap-5 absolute right-10 cursor-pointer">
            <i class="icon-cart">
              <img src="../public/image/seal-exclamation.png" class="w-5 h-5">  
            </i>
            <i class="icon-user">
              <img src="../public/image/circle-user.png" class="w-5 h-5"> 
            </i>
          </div>
        </nav>
      </header>

      <!-- Home Container -->
      <div class="home-container">

        <!-- Hero Section -->
        <section class="relative w-full">
          <h1 class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/5 text-white text-2xl font-bold">Your Ultimate Billiards Table Booking Hub</h1>
          <img src="../public/image/img_1.jpg" class="w-full object-cover">
        </section>

        <!-- Features Section -->
        <section class="flex justify-around my-10 text-center">
          <div class="text-xl">
            <i class="text-4xl mb-2 block">🌐</i>
            <p class="font-bold text-green-800">Fast</p>
          </div>
          <div class="text-xl">
            <i class="text-4xl mb-2 block">✋</i>
            <p class="font-bold text-green-800">Convenient</p>
          </div>
          <div class="text-xl">
            <i class="text-4xl mb-2 block">🖱</i>
            <p class="font-bold text-green-800">Easy</p>
          </div>
        </section>

        <!-- Popular Collections -->
        <section class="text-center py-8">
          <h2 class="font-bold text-green-800 text-4xl mb-8">Popular Collections</h2>
          <div class="flex justify-center flex-wrap gap-10">
            <!-- Collection Card -->
            <div class="w-60 h-96 border border-gray-300 rounded-lg shadow-lg p-5">
              <img src="../public/image/billard-table.jpg" alt="Billiard Table 1" class="w-full h-32 object-cover mb-4">
              <h1 class="text-xl font-bold text-black mb-2">Imperior</h1>
              <p class="text-base text-black">Mô tả về bàn và các dịch vụ đi kèm</p>
              <div class="mt-4 flex justify-between items-center">
                <h2 class="text-green-800 font-bold text-2xl">$10</h2>
                <button class="bg-green-800 text-white p-2 rounded-md">
                  <img src="../public/image/plus-small.png" class="w-5 h-5">
                </button>
              </div>
            </div>

            <!-- Repeat the same for more cards -->
            <div class="w-60 h-96 border border-gray-300 rounded-lg shadow-lg p-5">
              <img src="../public/image/billard-table.jpg" alt="Billiard Table 2" class="w-full h-32 object-cover mb-4">
              <h1 class="text-xl font-bold text-black mb-2">Imperior</h1>
              <p class="text-base text-black">Mô tả về bàn và các dịch vụ đi kèm</p>
              <div class="mt-4 flex justify-between items-center">
                <h2 class="text-green-800 font-bold text-2xl">$10</h2>
                <button class="bg-green-800 text-white p-2 rounded-md">
                  <img src="../public/image/plus-small.png" class="w-5 h-5">
                </button>
              </div>
            </div>

            <div class="w-60 h-96 border border-gray-300 rounded-lg shadow-lg p-5">
              <img src="../public/image/billard-table.jpg" alt="Billiard Table 3" class="w-full h-32 object-cover mb-4">
              <h1 class="text-xl font-bold text-black mb-2">Imperior</h1>
              <p class="text-base text-black">Mô tả về bàn và các dịch vụ đi kèm</p>
              <div class="mt-4 flex justify-between items-center">
                <h2 class="text-green-800 font-bold text-2xl">$10</h2>
                <button class="bg-green-800 text-white p-2 rounded-md">
                  <img src="../public/image/plus-small.png" class="w-5 h-5">
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white text-center py-4 fixed bottom-0 w-full">
        <p>&copy; End</p>
      </footer>

    </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

