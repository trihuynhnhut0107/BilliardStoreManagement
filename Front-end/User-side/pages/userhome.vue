<template>
  <div class="flex flex-col min-h-screen">
    <!-- DON'T TOUCH ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT -->
    <!-- Navbar -->
    <header
      class="flex justify-between items-center w-full border-b border-gray-500 p-4">
      <nav class="flex w-full items-center relative">
        <!-- Logo -->
        <div class="w-10 h-10 ml-4 md:ml-24">
          <img src="../public/image/eye.png" alt="Logo" />
        </div>

        <!-- Navigation links (hide on small screens) -->
        <ul
          class="hidden md:flex items-center justify-around w-1/2 lg:w-1/3 space-x-4 lg:space-x-8 ml-4 md:ml-24">
          <li>
            <NuxtLink to="/userhome" class="text-lg font-bold text-green-900"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/" class="text-lg font-bold text-green-900"
              >Products</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/" class="text-lg font-bold text-green-900"
              >Contact</NuxtLink
            >
          </li>
        </ul>

        <!-- Search bar (visible only on medium and larger screens) -->
        <div
          class="hidden md:flex items-center absolute right-1/4 lg:right-40 p-1 bg-gray-100 border border-gray-300 rounded-md">
          <input
            type="text"
            placeholder="Search....."
            class="p-1 outline-none" />
          <img src="../public/image/search.png" class="w-5 h-5 ml-2" />
        </div>

        <!-- Icons (adjust position for small screens) -->
        <div
          class="flex gap-3 md:gap-5 ml-auto md:absolute md:right-10 cursor-pointer mr-4 md:mr-0">
          <button class="flex w-10 h-10" @click="handleUserInfo">
            <img src="../public/image/user_logo.png" />
          </button>
        </div>
      </nav>
    </header>
    <!-- DON'T TOUCH ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT -->

    <!-- Home Container -->
    <div class="flex-grow">
      <!-- Hero Section -->
      <section class="relative w-full">
        <h1
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/5 text-white text-2xl font-bold">
          Your Ultimate Billiards Table Booking Hub
        </h1>
        <img src="../public/image/img_1.jpg" class="w-full object-cover" />
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
        <h2 class="font-bold text-green-800 text-4xl mb-8">
          Popular Collections
        </h2>
        <div class="flex justify-center flex-wrap gap-10">
          <!-- Collection Card -->
          <div
            class="w-60 h-96 border border-gray-300 rounded-lg shadow-lg p-5 mb-10"
            v-for="(table, index) in tables"
            :key="index">
            <img
              :src="table.image"
              :alt="table.name"
              class="w-full h-32 object-cover mb-4" />
            <h1 class="text-xl font-bold text-black mb-2">{{ table.name }}</h1>
            <p class="text-base text-black">{{ table.description }}</p>
            <div class="mt-4 flex justify-between items-center">
              <h2 class="text-green-800 font-bold text-2xl">
                ${{ table.price }}
              </h2>
              <button
                @click="openModal(table)"
                class="bg-green-800 text-white p-2 rounded-md">
                <img src="../public/image/plus-small.png" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Booking Modal -->
      <BookingModal
        v-if="isModalOpen"
        :table="selectedTable"
        @close="closeModal"
      />


      <!-- Button to toggle the message component -->
      <div class="fixed bottom-14 right-10">
        <button
          @click="toggleMessage"
          class="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600">
          {{ isMessageOpen ? "Close Messages" : "Open Messages" }}
        </button>
      </div>

      <!-- Message Component -->
      <div v-if="isMessageOpen" class="fixed bottom-20 right-10 mb-14">
        <Message />
      </div>

      <!-- DON'T TOUCH ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT -->
      <!-- Footer -->
      <footer class="flex-shrink-0 bg-[#3A6351] border-t border-gray-300 bottom-0 w-full">
        <!-- Top section with logo, description, and navigation -->
        <div
          class="container mx-auto px-4 py-6 flex justify-between items-start">
          <!-- Left side: Logo and description -->
          <div class="w-1/2">
            <div class="flex items-center space-x-2">
              <!-- Logo box -->
              <div class="w-10 h-10 bg-gray-200"></div>
              <h2 class="text-2xl text-white font-bold">Demo.</h2>
            </div>
            <p class="text-white mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>

          <!-- Right side: Navigation links -->
          <div class="flex space-x-6 text-sm font-semibold text-white">
            <a href="#" class="hover:text-yellow-600">Products</a>
            <a href="#" class="hover:text-yellow-600">Blog</a>
            <a href="#" class="hover:text-yellow-600">About</a>
            <a href="#" class="hover:text-yellow-600">Contacts</a>
          </div>
        </div>

        <!-- Bottom section with copyright -->
        <div
          class="border-t border-gray-300 py-4 text-center text-sm text-gray-200">
          ©2024 Demo Inc. All rights reserved
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BookingModal from "./bookingmodal.vue";
import BilliardTable from "../public/Image/billard-table.jpg";
import Message from "./usermessage.vue";

const isModalOpen = ref(false);
const selectedTable = ref(null);
const isMessageOpen = ref(false);

// Function to toggle the message component
const toggleMessage = () => {
  isMessageOpen.value = !isMessageOpen.value;
};

// Fetch data using useFetch
const { data, error } = await useFetch(
  "http://localhost:8080/v1/api/table-manage/get-all-tables"
);

// Tables array populated from the API data
const tables = ref([]);

if (data.value && data.value.metadata) {
  tables.value = data.value.metadata.map((table) => ({
    id: table.id,
    name: `Imperior ${table.id}`, // Adjust table name if needed
    description: `Description for table ${table.id}`,
    price: table.price,
    table_type: table.table_type,
    image: BilliardTable, // Use a placeholder image or adjust based on data if available
  }));
}

// Opens the booking modal with the selected table
const openModal = (table) => {
  selectedTable.value = table;
  isModalOpen.value = true;
};

// Closes the modal
const closeModal = () => {
  isModalOpen.value = false;
};

const handleUserInfo = () => {
  // Handle user information submission here
  navigateTo("/userinfo");
};
</script>

<style scoped>
.home-container {
  position: relative;
  min-height: calc(
    100vh - 100px
  ); /* Adjust 100px to match the header and footer heights */
  padding-bottom: 100px;
}
</style>
