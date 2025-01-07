<template>
    <Blank>
      <div class="w-full h-full flex flex-col items-center justify-center bg-white  p-10 ">
    <form
      @submit.prevent="handleSignUp"
      class="self-center w-fit flex flex-col items-center gap-5 rounded-lg shadow-[2px_2px_2px_#A4A4A4] p-4 px-11 bg-white">
      <h3 class="text-2xl font-bold">Create new account</h3>
      <input
        v-model="formData.username"
        required
        type="text"
        placeholder="Username"
        class="input-field" />
      <input
        v-model="formData.password"
        type="password"
        required
        placeholder="Password"
        autocomplete="on"
        class="input-field" />
      <input
        v-model="formData.email"
        type="email"
        required
        placeholder="Email address"
        class="input-field" />
      <input
        v-model="formData.name"
        type="text"
        required
        placeholder="Name"
        class="input-field" />
      <input
        v-model="formData.phone_number"
        type="text"
        required
        placeholder="Phone number"
        class="input-field" />

      <button
        type="submit"
        class="w-[150px] bg-[#3A6351] text-white rounded-md text-center py-2">
        Sign up
      </button>
      <NuxtLink class="text-[#3A6351] font-bold mt-3" to="/userLogin">
        Already have an account?
      </NuxtLink>
    </form>
  </div>
    </Blank>

    
</template>

<script setup>
import { useLogin } from "~/composables/useLogin";
import Cookies from "js-cookie";
import { navigateTo } from "nuxt/app";
import { toast } from "vue3-toastify";
import Blank from "~/layouts/blank.vue";

definePageMeta({
  layout: "default",
});

const formData = ref({
  username: "",
  email: "",
  password: "",
  name: "",
  phone_number: "",
});

const loginFormData = ref({
  username: formData.username,
  password: formData.password
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
  const data = await $fetch(
    "http://localhost:8080/v1/api/access/customer-site/signup",
    {
      method: "POST",
      body: JSON.stringify(formData.value),
      onResponse({ response }) {
        if (response.status !== 201) {
          toast.error(response._data.message);
          return;
        } else {
          toast.success(response._data.message);
        }
      },
    }
  );

  // If signup is successful, user are already logged in
  if (data?.status === 201) {
    toast.success("Signup successful!");

    const result = await useLogin({
      username: formData.value.username,
      password: formData.value.password,
    });

    if (result.success) {
      Cookies.set("customerID", result.customerID, { expires: 1, path: "/" });
      navigateTo("/");
    } else {
      toast.error("Login failed. Please try again.");
    }

    // Reset form data
    Object.keys(formData.value).forEach((key) => (formData.value[key] = ""));
  }
};
</script>

<style>
.input-field {
  width: 330px;
  height: 36px;
  padding: 0;
  border: 1px solid #a4a4a4;
  border-radius: 8px;
  text-indent: 10px;
  font-size: 14px;
  background-color: transparent;
}
</style>
