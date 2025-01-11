<template>
    <div class="flex w-full min-h-[84vh] mt-[6vh] flex-col items-center">
      <h1 class="text-2xl font-bold mb-4">Promotions</h1>
      <div
        v-for="promotion in promotions"
        :key="promotion.id"
        class="border rounded-lg shadow p-4 mb-4 w-3/4 bg-white"
      >
        <h2 class="text-lg font-semibold text-blue-600">{{ promotion.name }}</h2>
        <p class="text-gray-700">{{ promotion.description }}</p>
        <div class="mt-2 text-sm text-gray-600">
          <p><strong>ID:</strong> {{ promotion.id }}</p>
          <p><strong>Start Date:</strong> {{ formatDate(promotion.start_date) }}</p>
          <p><strong>End Date:</strong> {{ formatDate(promotion.end_date) }}</p>
          <p><strong>Discount Rate:</strong> {{ promotion.discount_rate }}%</p>
          <p><strong>Max Usage:</strong> {{ promotion.max_usage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from "vue-router";
  import { ref, onMounted } from "vue";
  
  // Define promotions data
  const promotions = ref([]);
  
  // Helper function to format dates
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  // Fetch promotions data on component mount
  onMounted(async () => {
    try {
      const response = await $fetch("http://localhost:8080/v1/api/promotion/get-all-promotions");
      if (response.status === 200) {
        promotions.value = response.metadata;
      }
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  });
  
  // Define page metadata
  definePageMeta({
  layout: "main",
});
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  