<template>
  <div class="h-svh w-svw max-h-full flex flex-col items-center gap-2 bg-[#F0F0F0]">
    <div>
      <h1 class="text-4xl font-bold uppercase text-[#3A6351] text-center mt-10">app name</h1>
    </div>
    <form @submit.prevent
      class="self-center w-fit flex flex-col items-center gap-3 rounded-lg shadow-[2px_2px_2px_#A4A4A4] p-4 px-11 bg-white">
      <h3 class="text-xl font-bold">Reset your password</h3>
      <hr class="w-full min-w-[127%]">
      <div class="flex w-full">
        <div class="flex flex-col gap-3">
          <h5 class="font-medium max-w-72 w-full line-clamp-2 text-base">
            How do you want to receive the code to reset your password?
          </h5>
          <div class="flex items-center gap-2">
            <input type="radio" id="email" name="method" value="email" checked>
            <div>
              <label class="text-sm" for="email">Send code via email</label>
              <div class="text-xs">{{ userEmail }}</div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <input type="radio" id="password" name="method" value="password">
            <label class="text-sm" for="password">Enter Password to Log in</label>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center gap-1">
          <img class="w-5" src="../public/userWhite.svg" alt="">
          <label class="text-sm">{{ userEmail }}</label>
        </div>
      </div>
      <div class="flex justify-between w-[215px]">
        <button class="bg-white text-[#3A6351] font-semibold rounded-md border border-[#3A6351] w-[100px] p-2"
          v-on:click="handleBack">Not you</button>
        <button class="bg-[#3A6351] text-white font-semibold rounded-md border border-[#3A6351] w-[100px] p-2"
          v-on:click="handleContinue">Continue</button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'footnote'
})

const userEmail = "example@gmail.com"

const handleBack = () => {
  navigateTo("/forgetpassword")
}

const handleContinue = () => {
  //handle continue
  alert("Continue")
}

</script>

<style scoped></style>