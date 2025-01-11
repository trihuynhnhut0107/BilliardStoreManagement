<template>
    <div class="flex w-full min-h-[84vh] mt-[6vh] flex-col items-center">
      <h1 class="text-2xl font-bold mb-4">Booking History</h1>
      <div
        v-if="bookings.length > 0"
        v-for="booking in bookings"
        :key="booking.id"
        class="border rounded-lg shadow p-4 mb-4 w-3/4 bg-white"
      >
        <p><strong>Booking ID:</strong> {{ booking.id }}</p>
        <p><strong>Table ID:</strong> {{ booking.table_id }}</p>
        <p><strong>Start Time:</strong> {{ booking.start_time }}</p>
        <p><strong>End Time:</strong> {{ booking.end_time }}</p>
        <p><strong>Status:</strong> <span :class="statusClass(booking.status)">{{ booking.status }}</span></p>
        <p v-if="booking.promotion_code"><strong>Promotion Code:</strong> {{ booking.promotion_code }}</p>
        <div class="mt-4">
          <p class="font-semibold">QR Code:</p>
          <canvas ref="qrcanvas" :id="'qr-' + booking.id"></canvas>
        </div>
      </div>
      <p v-else class="text-gray-500">No booking history available.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import Cookies from "js-cookie";
  import { ref, onMounted, nextTick } from "vue";
  import QRCode from "qrcode";
  
  // Function to get customer ID from cookies
  const getCustomerID = () => {
    const customerID = Cookies.get("customerID");
    return customerID ? Number(customerID) : null; // Convert to number or return null
  };
  
  // Reactive variable for storing booking data
  const bookings = ref([]);
  const customerID = getCustomerID();
  
  // Function to get booking status classes for styling
  const statusClass = (status: string) => {
    return status === "booked" ? "text-green-500" : "text-red-500";
  };
  
  // Generate QR codes
  const generateQRCode = async (booking) => {
    const qrCanvas = document.getElementById(`qr-${booking.id}`);
    const qrData = JSON.stringify({
      bookingID: booking.id,
      tableID: booking.table_id,
      startTime: booking.start_time,
      endTime: booking.end_time,
      status: booking.status,
      promotionCode: booking.promotion_code,
    });
    if (qrCanvas) {
      await QRCode.toCanvas(qrCanvas, qrData, {
        width: 150,
        margin: 2,
      });
    }
  };
  
  // Fetch booking history and generate QR codes when the page is mounted
  onMounted(async () => {
    if (customerID) {
      try {
        const response = await $fetch(`http://localhost:8080/v1/api/booking/get-booking-by-customer-id/${customerID}`);
        if (response.status === 200) {
          bookings.value = response.metadata;
          await nextTick(); // Ensure DOM updates before generating QR codes
          bookings.value.forEach(generateQRCode);
        }
      } catch (error) {
        console.error("Error fetching booking history:", error);
      }
    } else {
      console.error("Customer ID not found in cookies.");
    }
  });
  
  // Define page metadata
  definePageMeta({
    layout: "main",
  });
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  .text-green-500 {
    color: #16a34a; /* Tailwind Green */
  }
  .text-red-500 {
    color: #dc2626; /* Tailwind Red */
  }
  </style>
  