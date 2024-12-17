<template>
  <div class="bg-[#ECF0F2] h-screen max-h-full flex flex-col items-center pt-[20vh] gap-4">
    <div>
      <h1 class="text-4xl font-bold uppercase text-[#3A6351] text-center">app name</h1>
    </div>
    <form @submit.prevent
      class="self-center w-fit flex flex-col items-center gap-3 rounded-lg shadow-[2px_2px_2px_#A4A4A4] p-4 px-11 bg-white">
      <h3 class="text-xl font-bold">Find your account</h3>
      <hr class="w-full min-w-[127%]">
      <p class="max-w-80 w-full line-clamp-2">
        Please enter your email address to search for your account
      </p>
      <input type="text" placeholder="Email address" v-model="email"
        class="w-full h-9 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
      <div class="flex justify-between gap-2">
        <NuxtLink
          class="bg-white text-[#3A6351] rounded-md font-semibold text-center flex justify-center items-center w-full text-base whitespace-nowrap px-6 py-1.5 min-h-[34px] border border-[#3A6351]"
          to="/login">
          Cancel
        </NuxtLink>
        <button
          class="bg-[#3A6351] text-white rounded-md font-semibold text-center flex justify-center items-center w-full text-base whitespace-nowrap px-6 py-1.5 min-h-[34px]"
          v-on:click="handleSearch">
          Check
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'footer-layout'
})

const email = ref('')

// const findEmail = async () => {
//   const { data, error } = await useFetch(, {
//     method: 'POST'
//   })
// }

// function to handle search
const handleSearch = () => {
  navigateTo("/forgetpasswordsearch")
}


</script>

<style></style>