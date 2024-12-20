<template>
  <div class="bg-[#ECF0F2] min-h-screen w-screen flex flex-col">
    <!-- Header -->
    <div
      class="fixed top-0 left-0 right-0 bg-white h-fit max-h-12  text-[#3A6351] px-20 py-2 flex justify-between items-center z-50">
      <div class="flex gap-4">
        <img src="../public/admin.png">
        <h3 class="font-bold text-2xl">Admin</h3>
      </div>
      <div>
        <svg @click="navigateTo('/admininformation')" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="#3A6351"
          viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
        </svg>
      </div>
    </div>

    <div class="flex flex-1 py-20 mx-20">
      <!-- Sidebar -->
      <div class=" bg-white rounded-lg h-fit" style="box-shadow: 2px 2px 4px #a4a4a4;">
        <div class="pl-10 pr-20 py-3">
          <h3 class="text-[#3A6351] font-semibold text-2xl mb-4">Manage</h3>
          <nav>
            <ul class="flex flex-col gap-5">
              <li class="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="#3A6351" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
                <NuxtLink to="/admininformation" class="text-[#3A6351] text-sm">Admin Information</NuxtLink>
              </li>
              <li class="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill='#3A6351' viewBox="0 0 16 16">
                  <path
                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg>
                <NuxtLink to="/staffmanagement" class="text-[#3A6351] text-sm">Staff
                  Management</NuxtLink>
              </li>
              <li class="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill='#3A6351' viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                <NuxtLink to="/customermanagement" class="text-[#3A6351] text-sm">Customer Management</NuxtLink>
              </li>
              <li class="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill='#3A6351' viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
                <NuxtLink to="/tablemanagement" class="text-[#3A6351] text-sm">Table Management</NuxtLink>
              </li>
              <li class="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill='#3A6351' viewBox="0 0 16 16">
                  <path
                    d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z" />
                  <path
                    d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5" />
                </svg>
                <NuxtLink to="/billmanagement" class="text-[#3A6351] text-sm">Bill Management</NuxtLink>
              </li>
              <li class="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill='#3A6351' viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M.11 3.187A.5.5 0 0 1 .5 3h13a.5.5 0 0 1 .488.608l-.22.991a3.001 3.001 0 0 1-1.3 5.854l-.132.59A2.5 2.5 0 0 1 9.896 13H4.104a2.5 2.5 0 0 1-2.44-1.958L.012 3.608a.5.5 0 0 1 .098-.42Zm12.574 6.288a2 2 0 0 0 .866-3.899z" />
                </svg>
                <NuxtLink to="/menumanagement" class="text-[#3A6351] text-sm">Menu Management</NuxtLink>
              </li>
              <li class="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill='#3A6351' viewBox="0 0 16 16">
                  <path
                    d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  <path
                    d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                </svg>
                <NuxtLink class="text-[#3A6351] text-sm" to="/message">Message</NuxtLink>
              </li>
              <li class="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill='#3A6351' viewBox="0 0 16 16">
                  <path
                    d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                </svg>
                <NuxtLink class="text-[#3A6351] text-sm" to="/analytics">Analytics</NuxtLink>
              </li>
              <li class="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill='#3A6351' viewBox="0 0 16 16">
                  <path
                    d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
                <NuxtLink class="text-[#3A6351] text-sm" to="/setting">Setting</NuxtLink>
              </li>
              <li class="flex gap-4 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill='#3A6351' viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                  <path fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg>
                <NuxtLink class="text-[#3A6351] text-sm" to="/login">Logout</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 ml-10 ">
        <slot></slot>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-[#3A6351] h-fit text-white">
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
// const appDescription = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui consectetur expedita cupiditate provident!')
</script>

<style></style>