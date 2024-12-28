<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl flex">
      <!-- Left-hand side: Image and Description -->
      <button
        @click="closeModal"
        class="flex right-4 top-4 text-gray-500 hover:text-gray-700 close">
        ✖
      </button>
      <div class="w-1/2 p-6">
        <img
          src="../public/Image/billard-table.jpg"
          alt="Table Image"
          class="w-full h-2XL rounded-lg mb-2" />
        <div class="text-left">
          <h3 class="text-xl font-bold">{{ props.table.name }}</h3>
          <div class="mt-4 text-gray-500">{{ props.table.type }}</div>
          <p class="mt-4 text-gray-600 text-sm">
            {{props.table.description}}
          </p>
        </div>
      </div>

      <!-- Right-hand side: Booking Options -->
      <div class="w-1/2 pl-6 border-l">
        <h2 class="text-2xl font-bold text-center mb-4">Booking Optional</h2>
        <hr class="border-t border-gray-300 my-2" />

        <!-- Date Display -->
        <input
          v-model="formData.date"
          type="date"
          class="mt-4 text-gray-500 mb-4 border border-gray-300 p-2 rounded w-full" />

        <!-- Start Time -->
        <div class="mb-4">
          <label class="block font-semibold text-gray-700">Start time:</label>
          <input
            v-model="formData.startTime"
            type="time"
            class="border border-gray-300 p-2 rounded w-full"
            @change="validateTimes"
            placeholder="HH:MM (24-hour format)" />
          <small class="text-gray-500"
            >Enter time (SA means [0-12:00], CH means [12:00-24:00])</small
          >
        </div>

        <!-- End Time -->
        <div class="mb-4">
          <label class="block font-semibold text-gray-700">End time:</label>
          <input
            v-model="formData.endTime"
            type="time"
            class="border border-gray-300 p-2 rounded w-full"
            @change="validateTimes"
            placeholder="HH:MM (24-hour format)" />
          <small class="text-gray-500"
            >Enter time (SA means [0-12:00], CH means [12:00-24:00])</small
          >
        </div>

        <p v-if="error" style="color: red">{{ error }}</p>

        <!-- Price and Booking Button -->
        <div class="mt-4 flex justify-between items-center">
          <h2 class="text-grey font-bold text-2xl">
            {{ props.table.price }}$ / 1 Hour
          </h2>
          <button
            @click="confirmBooking"
            class="bg-green-800 text-white p-2 rounded-md">
            Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

const error = ref("");
const price = ref(10);
const formData = ref({
  date: "",
  startTime: "",
  endTime: "",
});


const props = defineProps({
  table: {
    type: Object,
    default: () => ({
      name: "Default Table",
      price: 10,
      id: 1,
      type: "Standard",
    }),
  },
});


// Get the user ID from Cookie
const getCustomerID = () => {
  const customerID = Cookies.get("customerID");
  return customerID ? Number(customerID) : null; // Convert to Number, or return null if it doesn't exist
};
const tableId = props.table.id;


const emit = defineEmits();
const router = useRouter();

const closeModal = () => {
  emit("close");
};


const isValidInput = () => {
  const today = new Date(); // Get the current date
  today.setHours(0, 0, 0, 0); // Reset the time to midnight

  if (!formData.value.date) {
      toast.error("Date is required");
      return false;
  }
  if (new Date(formData.value.date) < today) {
    toast.error("Booking date must be today or in the future");
    return false;
  }
  if (!formData.value.startTime) {
      toast.error("Start time is required");
      return false;
  }
  if (!formData.value.endTime) {
      toast.error("End time is required");
      return false;
  }
  if (
    formData.value.startTime &&
    formData.value.endTime &&
    formData.value.startTime >= formData.value.endTime
  ) {
    toast.error("Start time must be earlier than end time");
      return false;
  }
  return true
}

const formatToCustomISO = (date) => {
  // Check if the date is valid before attempting to format
  const day = String(date.getDate()).padStart(2, "0"); // Get day of the month (01-31)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (01-12), note: months are 0-based
  const year = date.getFullYear(); // Get full year (YYYY)
  
  const hours = String(date.getHours()).padStart(2, "0"); // Get hours (00-23)
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Get minutes (00-59)
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Get seconds (00-59)

  // Return the formatted date in the format: DD/MM/YYYY HH:MM:SS
  return `${hours}:${minutes}:${seconds} ${month}/${day}/${year} `;
};

const calculatePrice = () => {
  if (formData.value.startTime && formData.value.endTime) {
    const startDateTime = new Date(`${formData.value.date}T${formData.value.startTime}`);
    const endDateTime = new Date(`${formData.value.date}T${formData.value.endTime}`);

    // Calculate duration in hours
    const durationInMilliseconds = endDateTime - startDateTime;
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

    // Calculate price
    price.value = Math.max(durationInHours * props.table.price, 0);
  } else {
    price.value = 0;
  }
};


const confirmBooking = async () => {
  const customerID = getCustomerID();

  // Check for missing data
  if (!customerID) {
    console.error("Customer ID is missing");
    return;
  }
  if (!tableId) {
    console.error("Table ID is missing");
    return;
  }
  let check = isValidInput();
  if (!check) {
    return
  }

  // Format time data
  const startDate = new Date(`${formData.value.date}T${formData.value.startTime}:00`);
  const endDate = new Date(`${formData.value.date}T${formData.value.endTime}:00`);

  const formattedStartTime = formatToCustomISO(startDate);
  const formattedEndTime = formatToCustomISO(endDate);

  calculatePrice();

  if (error.value) {
    return;
  }

  try {
    const { data, error: fetchError } = await useFetch(
      "http://localhost:8080/v1/api/booking/create-booking",
      {
        method: "POST",
        body: JSON.stringify(
          {
            table_id: tableId,
            customer_id: customerID,
            start_time: formattedStartTime,
            end_time: formattedEndTime,
          },
        ),
      }
    );
    
    if (data) { // Adjust according to actual response
      alert("Booking success. Navigating to checkout page...");

      router.push({
        path: '/checkout',
        query: {
          name: props.table.name,
          id: props.table.id,
          price: price.value,
          description: props.table.description || 'No description',
          sticks: sticks.value,
          type: props.table.type || 'Standard',
          start_time: formattedStartTime,
          end_time: formattedEndTime,
        },
      });

    }
    if (fetchError) {
      console.log(fetchError);
    }

  } catch (err) {
    console.error(err);
  }
};

</script>

<style scoped></style>
