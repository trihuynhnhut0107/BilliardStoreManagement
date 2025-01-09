<template>
  <div class="flex flex-col gap-4 ">
        <div class="flex justify-between items-center bg-white w-full py-2 px-10 mb-4">
            <h1 class="font-bold text-xl">Booking</h1>
            <div class="flex items-center w-max rounded-2xl border px-3 py-1">
                <input placeholder="Search" v-model="searchQuery"
                    class="outline-none border-none bg-transparent pr-20 text-xs" />
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </div>
            <div class="flex gap-2 items-center">
                <!-- <NuxtLink to="/createbill"
                    class="w-fit bg-[#3A6351] py-[6px] px-4 text-white text-sm font-medium rounded">
                    Create
                    bill</NuxtLink> -->
                <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="#ff0000" viewBox="0 0 16 16">
                    <path
                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg> -->
            </div>
  </div>
    </div>
  <div class="w-full h-full">
    <BookingTable
      v-model="filteredTables"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :handlePageChange="handlePageChange"
      @updateRow="updateRow"
      @delete-row="deleteRow"
      @booking-checkout="bookingCheckout"
      >
    </BookingTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue3-toastify";

definePageMeta({
  layout: "home-layout",
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

// Handle row view
const viewRow = (row) => {
    navigateTo(`/billdetail/${row.id}`);
}

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

const filteredTables = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return datalist.value

    return datalist.value.filter(table =>
        table.id.toString().toLowerCase().includes(query) ||
        table.customer_name.toLowerCase().includes(query) ||
        table.table_id.toString().toLowerCase().includes(query) ||
        table.start_time.toString().toLowerCase().includes(query) ||
        table.end_time.toString().toLowerCase().includes(query)
    )
})
</script>

<style scoped></style>
