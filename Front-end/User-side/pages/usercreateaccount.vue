<template>
  <DefaultLayout>
    <div
      class="w-full max-w-full h-[90vh] flex flex-col items-center justify-center gap-2.5 bg-white">
      <header>
        <h1 class="text-[42px] font-bold uppercase text-[#3A6351] text-center">
          app name
        </h1>
      </header>
      <form
        @submit.prevent
        class="self-center w-fit flex flex-col items-center gap-5 rounded-lg shadow-[2px_2px_2px_#A4A4A4] p-4 px-11 bg-white">
        <h3 class="text-2xl font-bold">Create new account</h3>
        <input
            v-model="formData.username"
            required
            type="text"
            placeholder="Username"
            class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" 
          />
        <input
          v-model="formData.password"
          type="password"
          required
          placeholder="New password"
          autocomplete="on"
          class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" 
        />
        <input
          v-model="formData.email"
          type="email"
          required
          placeholder="Email address"
          class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" 
        />
        <input
          v-model="formData.name"
          type="text"
          required
          placeholder="Name"
          class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" 
        />
        <input
          v-model="formData.phone_number"
          type="text"
          required
          placeholder="Phone number"
          class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" 
        />
        
        <button
          v-on:click="handleSignUp"
          class="w-[150px] bg-[#3A6351] text-white rounded-md text-center py-2">
          Sign up
        </button>
        <NuxtLink class="text-[#3A6351] font-bold mt-3" to="/login">
          Already have an account?
        </NuxtLink>
      </form>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "~/layout/default.vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

const formData = ref({
  username: "",
  email: "",
  password: "",
  name: "",
  phone_number: ""
});

const isValidInput = () => {
  const { username, email, password, name, phone_number } = formData.value;

  // Validate username: At least 8 characters
  if (!username || username.trim().length < 8) {
    toast.error("Username must be at least 8 characters long.");
    return false;
  }

  // Validate password: At least 8 characters, no uppercase or special characters
  if (!password || password.trim().length < 8) {
    toast.error("Password must be at least 8 characters long");
    return false;
  }

  // Validate email: Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Invalid email address.");
    return false;
  }


  // Validate name: Not empty
  if (!name || name.trim().length === 0) {
    toast.error("Name is required.");
    return false;
  }

  // Validate phone number: Exactly 10 digits, starts with "0"
  const phoneRegex = /^0\d{9}$/;
  if (!phoneRegex.test(phone_number)) {
    toast.error("Phone number must be 10 digits long and start with '0'.");
    return false;
  }
  return true; // All validations passed
};


const handleSignUp = async () => {
  let check = isValidInput();
  if (!check) {
    return
  }
  try {
    const { data, error } = await useFetch(
      "http://localhost:8080/v1/api/access/customer-site/signup",
      {
        method: "POST",
        body: JSON.stringify(formData.value),
      }
    );
    if (error) {
      console.log(error);
    }
    if (data.value.status === 201) {
      const user = data.value.metadata.user;
      console.log("Registered User Successfully:", user);
      alert("Signup Successfully");
      navigateTo("/userlogin");
    }
  } catch (err) {
    toast.error("Email already exists", {
      autoClose: 3000,
    })
    console.log(err)
  }
};
</script>

<style></style>