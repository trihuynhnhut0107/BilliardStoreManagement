<template>
    <div class="w-screen max-w-full h-[90vh] flex flex-col items-center justify-center gap-2 bg-[#A4A4A4]">
      <header>
        <h1 class="text-[42px] font-bold uppercase text-[#3A6351] text-center">app name</h1>
      </header>
      <form class="self-center w-fit flex flex-col items-center gap-5 rounded-lg shadow-[2px_2px_2px_#A4A4A4] p-4 px-11 bg-white">
        <h3 class="text-2xl font-bold">Find your account</h3>
        <hr class="w-[127%] border-[#A4A4A4]" style="border-width: 0.1px;" />
        <p class="w-[330px] break-words">
          Please enter your email address or mobile number to search for your account
        </p>
        <input
          type="text"
          placeholder="Email address or phone number"
          class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent"
        />
        <div class="flex justify-between w-[202px]">
          <button class="border border-[#3A6351] rounded-md py-1 w-[95px] font-semibold text-[#3A6351]">
            <NuxtLink to="/login">Cancel</NuxtLink>
          </button>
          <button class="bg-[#3A6351] text-white rounded-md py-1 w-[95px] font-semibold">
            <RouterLink to="/forgetpasswordsearch">Search</RouterLink>
          </button>
        </div>
      </form>
      <footer></footer>
    </div>
  </template>
  
  <script setup></script>