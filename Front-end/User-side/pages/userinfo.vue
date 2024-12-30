<template>
  <div class="flex min-h-screen bg-gray-200">
    <!-- Sidebar -->
    <div class="flex h-[100vh] w-1/4">
      <div class="flex flex-col mt-[10vh] h-auto w-full ml-[4vw]">
        <h1 class="text-2xl font-bold mb-[2vh]">Account Page</h1>
        <div class="flex text-xl font-weight-500 mb-[10vh]">
          <h2>Welcome!</h2>
          <h2 class="flex ml-[2vw] text-[#3A6351] font-bold">
            {{ userData.name || "Loading..." }}
          </h2>
        </div>
        <div class="flex flex-col h-[40vh] text-xl font-weight-700 items-start space-y-[6vh]">
          <button
            @click="toggleChangeInfo"
            class="hover:text-yellow-600 change_info">
            {{
              isChangeInfoOpen
                ? "Close Change Info"
                : "Change information"
            }}
          </button>
          <button @click="logout" class="hover:text-yellow-600">
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- User Information -->
    <div
      v-if="!isChangeInfoOpen"
      class="flex h-[40vh] w-3/4 bg-white mt-[10vh] mr-[5vw] border-2 border-gray-300 rounded-xl shadow-md">
      <div class="flex flex-col ml-[2vw] w-1/2">
        <h2 class="flex text-3xl text-yellow-400 mt-[4vh] mb-[4vh] font-bold">
          {{ userData.name || "Loading..." }}
        </h2>
        <h3 class="mb-[4vh]">ID: {{ userData.id || "N/A" }}</h3>
        <h3 class="mb-[4vh]">Email: {{ userData.email || "N/A" }}</h3>
        <h3 class="mb-[4vh]">
          Phone number: {{ userData.phone_number || "N/A" }}
        </h3>
      </div>
      <div class="flex w-[20vw] h-[20vh] ml-[8vw] mt-[8vh]">
        <img src="../public/Image/img_1.jpg" alt="User Avatar" />
      </div>
    </div>

    <!-- ChangeInfo Component -->
    <!-- Uncomment if needed -->
    <div
      v-if="isChangeInfoOpen"
      class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <ChangeInfo @close="toggleChangeInfo" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import ChangeInfo from "./changeinfo.vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";

definePageMeta({
  layout: "main",
});
const router = useRouter();

// State for toggling the ChangeInfo component
const isChangeInfoOpen = ref(false);

// Toggle ChangeInfo display
const toggleChangeInfo = () => {
  isChangeInfoOpen.value = !isChangeInfoOpen.value;
};

// Function to get customer ID from cookies
const getCustomerID = () => {
  const customerID = Cookies.get("customerID");
  return customerID ? Number(customerID) : null; // Convert to number or return null
};

const customerID = getCustomerID();

const userInfo = ref(null); // Store the user data

// Fetch user information
const getAllInfo = async () => {
  if (!customerID) {
    toast.error("Customer ID not found. Please log in again.");
    router.push("/userlogin");
    return;
  }

  try {
    const data = await $fetch(
      `http://localhost:8080/v1/api/customer-manage/customer/${customerID}`,
      {
        onResponseError({ response }) {
          toast.error(response._data?.message || "An error occurred.");
        },
      }
    );
    userInfo.value = data;
  } catch (error) {
    toast.error("Failed to fetch user information. Please try again.");
    console.error(error);
  }
};

await getAllInfo(); 

// Computed property to extract `metadata` for easy binding
const userData = computed(() => userInfo.value?.metadata || {});

// Logout function
const logout = () => {
  // Remove the customer ID cookie
  document.cookie = "customerID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Show alert and redirect to the login page
  toast.success("You have been logged out.");
  router.push("/userlogin").then(() => {
    window.location.reload();
  });
};
</script>
