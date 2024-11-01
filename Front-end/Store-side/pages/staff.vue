<template>
  <div class="bg-white text-nowrap rounded-md py-6 pl-10 pr-[150px] w-fit h-fit">
               <h1 class="text-[#3A6351] text-2xl mb-6">Manage</h1>
               <ul class="flex flex-col gap-6">
                   <div class="flex gap-4">
                       <img src="../public/User.svg" alt="." class="w-4">
                       <NuxtLink class="text-[#3A6351] text-sm" to="/staff" >Staff Information</NuxtLink>
                   </div>
                   <div class="flex gap-4">
                       <img src="../public/Table.svg" alt="." class="w-4">
                       <NuxtLink class="text-[#3A6351] text-sm" to="/table" >Table</NuxtLink>
                   </div>
                   <div class="flex gap-4">
                       <img src="../public/Menu.svg" alt="." class="w-4">
                       <NuxtLink class="text-[#3A6351] text-sm" to="/menu" >Menu</NuxtLink>
                   </div>
                   <div class="flex gap-4">
                       <img src="../public/Bill.svg" alt="." class="w-4">
                       <NuxtLink class="text-[#3A6351] text-sm" to="/bill" >Bill</NuxtLink>
                   </div>
                   <div class="flex gap-4">
                       <img src="../public/Setting.svg" alt="." class="w-4">
                       <NuxtLink class="text-[#3A6351] text-sm" to="/setting" >Setting</NuxtLink>
                   </div>
                   <div class="flex gap-4">
                       <img src="../public/Logout.svg" alt="." class="w-4">
                       <NuxtLink class="text-[#3A6351] text-sm" >Logout</NuxtLink>
                   </div>
               </ul>
           </div>
</template>

<script setup></script>

<style scoped></style>
