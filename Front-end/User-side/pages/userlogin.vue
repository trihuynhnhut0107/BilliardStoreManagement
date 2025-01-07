<template>
  <div
    class="flex justify-around p-[50px] h-screen w-full max-w-full bg-cover bg-no-repeat bg-[url('/Image/login_page.png')]">
    <header class="flex flex-col items-left justify-center">
      <h1 class="text-[#3A6351] text-5xl font-bold uppercase ">CUELINK</h1>
      <h3 class="capitalize w-[60%] text-3xl font-medium mt-2">book your perfect game anytime anywhere!</h3>
    </header>
    <form
      @submit.prevent
      class="self-center w-fit p-[30px] px-[80px] flex flex-col items-center gap-[15px] rounded-lg bg-white">
      <input
        v-model="formData.username"
        type="text"
        placeholder="Username"
        class="w-[250px] h-[40px] p-[10px] border border-[#A4A4A4] rounded-md" />
      <div class="flex items-center">
        <input
          type="password"
          v-model="formData.password"
          placeholder="Password"
          class="w-[250px] h-[40px] p-[10px] border border-[#A4A4A4] rounded-md" />
        <!-- <img class="w-9 cursor-pointer" src="/Icon/eye-close.png" @click.prevent={togglePassword}> -->
      </div>

      <button
        v-on:click="handleLogin"
        class="w-[250px] bg-[#3A6351] text-white rounded-md text-center p-[7px]">
        Log in
      </button>
      <NuxtLink class="text-[#3A6351] font-medium" to="/userforgotpassword"
        >Forgot password?</NuxtLink
      >
      <hr class="w-[250px] border border-[#A4A4A4] p-0" />
      <NuxtLink
        class="text-white bg-[#3A6351] text-center w-[200px] p-[7px] rounded-md"
        to="/usercreateaccount"
        >Create new account</NuxtLink
      >
    </form>
  </div>
</template>

<script setup>
import { useLogin } from "~/composables/useLogin";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

definePageMeta({
  layout: "default",
});

const formData = ref({
  username: "",
  password: "",
});

const isLoading = ref(false);
const errorMessage = ref("");
const router = useRouter();

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = ""; // Reset error message

  const result = await useLogin(formData.value);

  isLoading.value = false;

  if (!result.success) {
    // Display the error message from the response
    errorMessage.value = result.message || "Login failed.";
    alert(errorMessage.value);
    window.location.reload();
  } else {
    console.log("Login successful, Customer ID:", result.customerID);

    // Store the customer ID in a global state or local storage if needed
    Cookies.set("customerID", result.customerID, { expires: 1, path: "/" });

    // Navigate to the user home page
    navigateTo("/");
  }
};
</script>
