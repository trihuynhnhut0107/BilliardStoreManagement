<template>
  <div class="bg-[#ECF0F2] h-screen max-h-full flex flex-col items-center pt-[20vh] gap-4">
    <div>
      <h1 class="text-4xl font-bold uppercase text-[#3A6351] text-center mt-10">
        app name
      </h1>
    </div>
    <form @submit.prevent
      class="w-fit flex flex-col items-center gap-6 rounded-lg shadow-[2px_2px_2px_#A4A4A4] p-4 px-11 bg-white">
      <h3 class="text-xl font-bold">Change Password</h3>
      <div class="space-y-4">
        <input v-model="formData.password" required type="password" placeholder="Enter new password"
          class="w-full h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
        <input v-model="formData.rePassword" type="password" required placeholder="Re-enter new password"
          class="w-full h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
      </div>
      <div class="flex justify-end gap-4 w-full">
        <button
          class="bg-white text-[#3A6351] font-semibold rounded-md border border-[#3A6351] w-fit max-w-24 py-2 px-4"
          v-on:click="handleBack">
          Cancel
        </button>
        <button
          class="bg-[#3A6351] text-white font-semibold rounded-md border border-[#3A6351] w-fit max-w-24 py-2 px-4"
          v-on:click="handleContinue">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "footnote",
});

const userEmail = "example@gmail.com";

const handleBack = () => {
  navigateTo("/forgetpassword");
};

const handleContinue = () => {
  //handle continue
  alert("Continue");
};

const formData = ref({
  password: "",
  rePassword: "",
});
</script>

<style scoped></style>
