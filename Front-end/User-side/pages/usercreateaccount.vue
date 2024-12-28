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
          class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
        <input
          v-model="formData.password"
          type="password"
          required
          placeholder="New password"
          autocomplete="on"
          class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
        <input
          v-model="formData.email"
          type="email"
          required
          placeholder="Email address"
          class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
        <input
          v-model="formData.name"
          type="text"
          required
          placeholder="Name"
          class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
        <input
          v-model="formData.phone_number"
          type="text"
          required
          placeholder="Phone number"
          class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />

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
import DefaultLayout from "~/layouts/default.vue";
import { useLogin } from "~/composables/useLogin";
const formData = ref({
  username: "",
  email: "",
  password: "",
  name: "",
  phone_number: "",
});

const handleSignUp = async () => {
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
      const result = useLogin(formData.value.username, formData.value.password);
      if (result.success) {
        Cookies.set("customerID", result.customerID, { expires: 1, path: "/" });
        navigateTo("/userhome");
      } else {
        alert("Login failed. Please try again.");
        window.location.reload();
      }
      // navigateTo("/userlogin");
    }
  } catch (err) {
    console.error(err);
    alert(
      "Your account may be appeared or existed blank in form. Error signing up. Please try again."
    );
    window.location.reload();
  }
};
</script>

<style></style>
