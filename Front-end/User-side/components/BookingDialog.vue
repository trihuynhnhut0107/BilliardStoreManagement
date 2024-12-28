<template>
  <div
    v-if="dialogIsOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
    <!-- Dialog Box -->
    <div
      class="bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-6 relative z-20">
      <!-- Close Button -->
      <button
        @click="closeDialog"
        class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none">
        ✕
      </button>
      <!-- Dialog Content -->
      <h2 class="text-xl font-semibold mb-4">Booking</h2>
      <div class="flex flex-col">
        <label for="date" placeholder="dd/mm/yyyy">Choose date:</label>
        <input type="date" class="w-fit" v-model="bookingInfo.date" />
      </div>
      <div class="flex flex-col h-full">
        <label for="start-time">Choose time:</label>
        <input type="time" class="w-fit" v-model="bookingInfo.startTime" />
      </div>
      <div class="flex flex-col h-full">
        <label for="end-time">Choose time:</label>
        <input type="time" class="w-fit" v-model="bookingInfo.endTime" />
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-4 p-4">
        <button
          @click="closeDialog"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded">
          Cancel
        </button>
        <button
          @click="confirmAction"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
// Props to control the dialog state
const currentTableID = defineModel("currentTable");
const dialogIsOpen = defineModel("isOpen");

const currentCustomerID = Number(useCookie("customerID").value);

// Initialize booking info with current table ID

// Watch for changes in currentTableID and update bookingInfo.tableID

// Close the dialog
const closeDialog = () => {
  dialogIsOpen.value = false;
};
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
const confirmAction = async () => {
  const data = await $fetch(
    "http://localhost:8080/v1/api/booking/create-booking",
    {
      method: "POST",
      body: JSON.stringify({
        table_id: currentTableID.value,
        customer_id: currentCustomerID,
        start_time: `${bookingInfo.value.startTime}:00 ${formatDate(
          bookingInfo.value.date
        )}`,
        end_time: `${bookingInfo.value.endTime}:00 ${formatDate(
          bookingInfo.value.date
        )}`,
      }),
      onResponseError({ response }) {
        toast.error(response._data.message);
        return;
      },
      onResponse({ response }) {
        console.log(response._data.message);
        toast.success(response._data.message);
      },
    }
  );
  closeDialog();
};
</script>

<style scoped>
/* Optional: Add transitions for a smooth appearance */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Ensure the input field is on top */
.flatpickr-input {
  position: relative;
  z-index: 50; /* Ensures it's on top */
}
</style>
