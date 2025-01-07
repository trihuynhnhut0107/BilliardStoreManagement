<template>
  <div class="flex flex-col h-full w-full py-6 px-2">
    <div class="w-full px-6 py-2">
      <NuxtLink
        to="/"
        class="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600">
        Cancel</NuxtLink
      >
    </div>
    <div class="w-full h-full flex flex-col sm:flex-row p-4">
      <!-- Left Panel: Booking Form -->
      <div class="w-full sm:w-1/2 flex flex-row p-4 border-r border-gray-300">
        <div class="flex flex-col w-1/2 px-4 space-y-4">
          <h2 class="text-2xl font-semibold mb-6">
            Table {{ currentTableID }} Booking
          </h2>
          <h3 class="text-lg font-semibold mb-4">Table Information</h3>
          <div>
            <img src="/Image/img_1.jpg" alt="" class="h-fit w-fit" />
          </div>
          <div class="flex flex-col mb-4">
            <label for="table-number" class="text-sm font-medium mb-2"
              >Table Number: {{ tableInfo.id }}</label
            >
          </div>
          <div class="flex flex-col mb-4">
            <label for="table-type" class="text-sm font-medium mb-2"
              >Table Type: {{ tableInfo.table_type }}</label
            >
          </div>
          <div class="flex flex-col mb-4">
            <label for="price" class="text-sm font-medium mb-2"
              >Price:
              {{ Intl.NumberFormat("de-DE").format(tableInfo.price) }} VNĐ /
              hour</label
            >
          </div>
        </div>
        <!-- Date Picker -->
        <div class="flex flex-col w-1/2">
          <div class="flex flex-col mb-4">
            <label for="date" class="text-sm font-medium mb-2"
              >Choose Date:</label
            >
            <input
              type="date"
              id="date"
              class="w-full max-w-xs border border-gray-300 rounded p-2"
              v-model="bookingInfo.date" />
          </div>
          <!-- Start Time Picker -->
          <div class="flex flex-col mb-4">
            <label for="start-time" class="text-sm font-medium mb-2"
              >Choose Start Time:</label
            >
            <input
              type="time"
              id="start-time"
              class="w-full max-w-xs border border-gray-300 rounded p-2"
              v-model="bookingInfo.startTime" />
          </div>
          <!-- End Time Picker -->
          <div class="flex flex-col mb-4">
            <label for="end-time" class="text-sm font-medium mb-2"
              >Choose End Time:</label
            >
            <input
              type="time"
              id="end-time"
              class="w-full max-w-xs border border-gray-300 rounded p-2"
              v-model="bookingInfo.endTime" />
          </div>
          <div v-if="bookingInfo.startTime && bookingInfo.endTime" class="mb-4">
            <div
              v-if="
                !validateBookingTimes(
                  bookingInfo.startTime,
                  bookingInfo.endTime
                )
              ">
              <p class="text-sm text-red-600">
                End time must be after start time
              </p>
            </div>
            <p v-else class="text-sm">
              Total Price:
              {{
                calculateTotalPrice(
                  bookingInfo.date,
                  bookingInfo.startTime,
                  bookingInfo.endTime
                )
              }}
              VNĐ
            </p>
          </div>
          <div class="mb-4">
            <button
              :disabled="
                !validateBookingTimes(
                  bookingInfo.startTime,
                  bookingInfo.endTime
                )
              "
              class="bg-[#3A6351] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#3A6351]"
              :class="`${
                !validateBookingTimes(
                  bookingInfo.startTime,
                  bookingInfo.endTime
                )
                  ? 'cursor-not-allowed'
                  : ''
              }`"
              @click="confirmSubmit">
              Booking
            </button>
          </div>
        </div>
      </div>
      <!-- Right Panel: Booking List -->
      <div class="w-full sm:w-1/2 flex flex-col p-4">
        <!-- Booking List -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Current booked timeslots</h3>
          <div class="flex flex-col mb-4">
            <label for="input-date" class="text-sm font-medium mb-2"
              >Choose a Date:</label
            >
            <input
              type="date"
              id="input-date"
              class="w-full max-w-xs border border-gray-300 rounded p-2"
              v-model="chosenDate" />
          </div>
          <div
            v-for="(booking, index) in bookingList"
            :key="index"
            class="border border-gray-300 rounded mb-4 p-4 bg-white shadow">
            <p class="text-sm">
              Start Time: {{ formatTime(booking.start_time) }}
            </p>
            <p class="text-sm">End Time: {{ formatTime(booking.end_time) }}</p>
          </div>
          <div v-if="bookingList.length === 0">No booking available</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
import { ref, watch } from "vue";

definePageMeta({
  layout: "blank",
});

const currentDate = new Date().toISOString().split("T")[0];

const currentTableID = useRoute().params.tableID;
const chosenDate = ref<string>(currentDate);
const bookingList = ref([]);
const tableInfo = ref({});
const currentCustomerID = Number(useCookie("customerID").value);

const bookingInfo = ref({
  // This will reflect the parent component's table ID
  date: "",
  startTime: "",
  endTime: "",
});

function formatDate(date: string) {
  if (!date) return "";

  // Split the date string (YYYY-MM-DD)
  const [year, month, day] = date.split("-");

  // Format to MM/DD/YYYY
  return `${month}/${day}/${year}`;
}
const confirmSubmit = async () => {
  const data = await $fetch(
    "http://localhost:8080/v1/api/booking/create-booking",
    {
      method: "POST",
      body: JSON.stringify({
        table_id: currentTableID,
        customer_id: currentCustomerID,
        start_time: `${bookingInfo.value.startTime}:00 ${formatDate(
          bookingInfo.value.date
        )}`,
        end_time: `${bookingInfo.value.endTime}:00 ${formatDate(
          bookingInfo.value.date
        )}`,
      }),
      onResponse({ response }) {
        if (response._data.status !== 201) {
          toast.error(response._data.message);
          return;
        } else toast.success(response._data.message);
      },
    }
  );
  getBookingList();
};

// Format Time for Display
const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const validateBookingTimes = (startTime: string, endTime: string) => {
  if (startTime >= endTime) {
    return false;
  }
  return true;
};

const calculateTotalPrice = (
  date: string,
  startTime: string,
  endTime: string
) => {
  if (!date || !startTime || !endTime) return 0;

  const roundUpToNearestQuarter = (minutes) => {
    return Math.ceil(minutes / 15) * 15;
  };

  const startDateTime = new Date(`${date}T${startTime}`);
  const endDateTime = new Date(`${date}T${endTime}`);

  // Calculate the time difference in minutes
  const timeDifferenceInMinutes =
    (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);

  // Round up to the nearest 15-minute increment
  const roundedMinutes = roundUpToNearestQuarter(timeDifferenceInMinutes);

  // Convert rounded minutes to hours
  const hoursDifference = roundedMinutes / 60;

  // Return the calculated price
  return Math.max(hoursDifference * tableInfo.value.price, 0);
};

// Fetch Table Info
const getTableInfo = async () => {
  const data = await $fetch(
    `http://localhost:8080/v1/api/table-manage/table/${currentTableID}`,
    {
      method: "GET",
      onResponseError({ response }) {
        toast.error(response._data.message);
      },
    }
  );
  tableInfo.value = data.metadata;
};
getTableInfo();

// Fetch Booking List
const getBookingList = async () => {
  const data = await $fetch(
    `http://localhost:8080/v1/api/booking/table/${currentTableID}`,
    {
      method: "GET",
      query: {
        date: convertDateFormat(chosenDate.value),
      },
      onResponseError({ response }) {
        toast.error(response._data.message);
      },
    }
  );
  bookingList.value = data.metadata.filter((booking) => {
    return booking.status === "booked";
  });
};
const filterBookingList = () => {};

// Convert Date Format
function convertDateFormat(yyyyMMdd: string) {
  if (!yyyyMMdd) return "";
  const [year, month, day] = yyyyMMdd.split("-");
  return `${month}/${day}/${year}`;
}

// Watch for Chosen Date Changes
watch(chosenDate, async () => {
  await getBookingList();
});
await getBookingList();
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>
