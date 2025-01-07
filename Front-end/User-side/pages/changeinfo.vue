<template>
  <div class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 pb-[4vh]">
    <div class="flex flex-col w-full max-w-4xl h-auto bg-white rounded-lg shadow-lg p-8 mx-4">
      <!-- Title -->
      <h2 class="text-2xl font-bold mb-8 text-center text-[#3A6351]">Change Information</h2>

      <!-- Form -->
      <form @submit.prevent="updateCustomer" class="flex flex-col ml-[4vw] mr-[2vw] w-[80vw] mr-[4vw]">
        <!-- Name Field -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="name">Name</label>
          <input
            id="name"
            type="text"
            v-model="form.name"
            placeholder="Enter your name"
            class="flex w-[40vw] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Phone Field -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="phone">Phone</label>
          <input
            id="phone"
            type="text"
            v-model="form.phone"
            placeholder="Enter your phone number"
            class="flex w-[40vw] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            @input="validateEmail"
            placeholder="Enter your email"
            class="flex w-[40vw] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
        </div>

        <!-- Buttons -->
      <div class="mt-8 flex justify-end space-x-4 mr-[30vw]">
        <!-- Cancel Button -->
        <button
          type="button"
          @click="cancelEdit"
          class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
        <!-- Update Button -->
        <button
          type="submit"
          class="bg-[#3A6351] hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          Update
        </button>
      </div>
      </form>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
  
// Router for navigation
const router = useRouter();
  
// Form state
const form = ref({
  name: "",
  phone: "",
  email: "",
});

const emailError = ref("");
  
const getCustomerID = () => {
  const customerID = Cookies.get("customerID");
  return customerID ? Number(customerID) : null; // Convert to Number, or return null if it doesn't exist
};
const customerID = getCustomerID();

const validateEmail = async () => {
  try {
    const response = await $fetch("http://localhost:8080/v1/api/customer-manage/get-all-customer");
    const customers = response.metadata;

    // Check if email exists and belongs to a different user
    const isDuplicate = customers.some(
      (customer) => customer.email === form.value.email && customer.id !== customerID
    );

    if (isDuplicate) {
      emailError.value = "This email is already in use. Please use another email.";
    } else {
      emailError.value = ""; // Clear the error if email is valid
    }
  } catch (error) {
    console.error("Error validating email:", error);
    emailError.value = "Unable to validate email. Please try again later.";
  }
};

// Fetch customer data
const fetchCustomerData = async () => {
  try {
    const response = await $fetch(`http://localhost:8080/v1/api/customer-manage/customer/${customerID}`);
    const data = response.metadata;

    form.value = {
      name: data.name,
      phone: data.phone_number,
      email: data.email,
    };
  } catch (error) {
    console.error("Error fetching customer data:", error);
  }
};

// Update customer info
const updateCustomer = async () => {
  if (emailError.value) {
    alert("Email already exists. Please try again");
    return;
  }
  try {
    const payload = {
      customer_id: Number(customerID),
      name: form.value.name,
      phone_number: form.value.phone,
      email: form.value.email,
    };

    await $fetch("http://localhost:8080/v1/api/customer-manage/update-customer", {
      method: "POST",
      body: payload,
    });
    alert("Information updated successfully!");
    await router.push("/");
  } catch (error) {
    console.error("Error updating customer info:", error);
    alert("Failed to update information. Please try again.");
  }
};
  // Cancel edit and close the modal
  const cancelEdit = () => {
    router.back(); 
  };

// Fetch data on component mount
fetchCustomerData();
</script>
  
<style scoped></style>
  