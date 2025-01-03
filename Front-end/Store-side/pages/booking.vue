<template>
  <div class="w-full h-full p-6">
    <BookingTable
      v-model="datalist"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :handlePageChange="handlePageChange"
      @updateRow="updateRow"
      @delete-row="deleteRow"
      @booking-checkout="bookingCheckout">
    </BookingTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue3-toastify";
definePageMeta({
  layout: "main",
});

const datalist = ref([]);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(6);
const totalPages = ref("");

// Function to fetch data
const getData = async () => {
  const data = await $fetch(
    "http://localhost:8080/v1/api/booking/get-all-booking-pagination",
    {
      query: {
        page_number: currentPage.value,
        page_size: itemsPerPage.value,
      },
      onResponseError({ response }) {
        toast.error(response._data.message);
      },
    }
  );
  datalist.value = data.metadata.bookings || [];
  totalPages.value = data.metadata.totalPages || 0;
};

// Fetch data initially
await getData();

// Handle page change
const handlePageChange = async (direction) => {
  if (direction === "next" && currentPage.value < totalPages.value) {
    currentPage.value++;
  }
  if (direction === "prev" && currentPage.value > 1) {
    currentPage.value--;
  }
  await getData();
};

// Row actions
const updateRow = (row) => {
  console.log("Updating row:", row);
};

const deleteRow = (row) => {
  console.log("Deleting row:", row);
};

const viewRow = (row) => {
  console.log("Viewing row:", row);
};

const staffID = ref(-1);

const bookingCheckout = async (id) => {
  const data = await $fetch(
    "http://localhost:8080/v1/api/bill-manage/create-bill",
    {
      method: "POST",
      body: JSON.stringify({
        booking_id: id,
        staff_id: staffID.value,
      }),
      onResponseError({ response }) {
        toast.error(response._data.message);
        return;
      },
    }
  );
  navigateTo(`/billdetail/${data.metadata.billID}`);
};
onMounted(() => {
  staffID.value = localStorage.getItem("staffID");
});
</script>

<style scoped></style>
