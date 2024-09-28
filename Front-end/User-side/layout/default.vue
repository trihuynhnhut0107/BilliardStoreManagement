<template>
  <div>
    <header class="bg-green-500 p-2 flex justify-between items-center">
      <nav class="flex w-full items-center">
        <div class="logo-icon w-10 h-10 absolute left-24 top-1">
          <img src="../public/image/eye.png" alt="Logo" />
        </div>
        <ul class="flex justify-around w-1/3 absolute left-1/4">
          <li> <NuxtLink to="/" class="text-xl font-bold text-green-900">Home</NuxtLink> </li>
          <li> <NuxtLink to="/" class="text-xl font-bold text-green-900">Products</NuxtLink> </li>
          <li> <NuxtLink to="/" class="text-xl font-bold text-green-900">To Contact</NuxtLink> </li>
        </ul>
        <div class="search-bar flex items-center absolute right-1/4 p-1 bg-gray-100 border border-gray-300 rounded-md">
          <input type="text" placeholder="Search....." class="p-1 outline-none" />
          <img src="../public/image/search.png" class="w-5 h-5 ml-2">
        </div>
        <div class="cart-user flex gap-5 absolute right-10 cursor-pointer">
          <i class="icon-cart">
            <img src="../public/image/seal-exclamation.png" class="w-5 h-5">  
          </i>
          <i class="icon-user">
            <img src="../public/image/circle-user.png" class="w-5 h-5"> 
          </i>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer class="bg-gray-900 text-white text-center py-4 fixed bottom-0 w-full">
      <p>&copy; End</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

