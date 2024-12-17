<template>
    <DefaultLayout>
      <div class="container mx-auto py-10">
        <h1 class="text-2xl font-bold mb-6">Checkout</h1>
  
        <div class="bg-gray-100 p-6 rounded-lg mb-10">
          <div class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Customer</h2>
            <p class="text-black">User name: {{ customer.name }}</p>
            <p class="text-black">Phone number: {{ customer.phone }}</p>
          </div>
  
          <div class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Table</h2>
            <p class="text-black">Item name: {{ table.name }}</p>
            <p class="text-black">Item ID: {{ table.id }}</p>
            <p class="text-black">Start time: {{ table.start_time }}</p>
            <p class="text-black">End time: {{ table.end_time }}</p>
            <p class="text-black">Type: {{ table.type }}</p>
            <p class="text-black">Descriptions: {{ table.description }}</p>
            <p class="text-black">Stick: {{ table.sticks }}</p>
            <div class="flex justify-between items-center text-xl">
              <p class="text-black">Price:</p>
              <p class="text-black">$ {{ table.price }}</p>
            </div>
          </div>
  
          <div class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Select payment method</h2>
            <div class="flex items-center">
              <input type="radio" id="cod" name="payment" value="cod" checked>
              <label for="cod" class="ml-2">COD - Pay at the store</label>
            </div>
            <div class="flex items-center mt-2">
              <input type="radio" id="card" name="payment" value="card">
              <label for="card" class="ml-2">Card</label>
            </div>
          </div>
  
          <div class="flex justify-between items-center text-xl">
            <p class="text-black">Price:</p>
            <p class="text-black">$ {{ table.price }}</p>
          </div>
        </div>
        <div class="flex justify-end mb-10">
          <button class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded" @click="handlePay">
            Pay
          </button>
        </div> 
      </div>
    </DefaultLayout>
  </template>
  
<script setup>
  import DefaultLayout from "~/layout/default.vue";
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const customerID = localStorage.getItem("customerID");

  // User info
  const userInfo = ref(null);

  const fetchUserInfo = async () => {
    try {
      const response = await $fetch(`http://localhost:8080/v1/api/customer-manage/customer/${customerID}`);
      userInfo.value = response.metadata; // Assign metadata
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Customer data
  const customer = computed(() => {
    return {
      name: userInfo.value?.name || "Loading...",
      phone: userInfo.value?.phone_number || "Loading...",
    };
  });

  // Table data
  const table = {
    name: route.query.name || "Default Table",
    id: route.query.id || 0,
    price: route.query.price || 0,
    description: route.query.description || "No description available",
    sticks: route.query.sticks || 2,
    type: route.query.type || "Nothing here yet",
    start_time: route.query.start_time,
    end_time: route.query.end_time,
  };

  const handlePay = () => {
    alert("Booking Successfully");
    navigateTo("/userhome");
  };

  onMounted(fetchUserInfo);
</script>


