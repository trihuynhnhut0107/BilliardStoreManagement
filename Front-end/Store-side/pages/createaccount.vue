<template>
  <div class="w-full max-w-full h-[90vh] flex flex-col items-center justify-center gap-2.5 bg-white">
    <header>
      <h1 class="text-[42px] font-bold uppercase text-[#3A6351] text-center">app name</h1>
    </header>
    <form class="self-center w-fit flex flex-col items-center gap-5 rounded-lg shadow-[2px_2px_2px_#A4A4A4] p-4 px-11 bg-white">
      <h3 class="text-2xl font-bold">Create new account</h3>
      <div class="w-[330px] flex justify-between">
        <input type="text" placeholder="First name" class="w-[160px] h-9 p-0 p border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
        <input type="text" placeholder="Last name" class="w-[160px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
      </div>
      <input type="text" placeholder="Email address or phone number" class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
      <input type="password" placeholder="New password" class="w-[330px] h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
      <button class="w-[150px] bg-[#3A6351] text-white rounded-md text-center py-2">Sign up</button>
      <RouterLink class="text-[#3A6351] font-bold mt-3" to="/login">
        Already have an account?
      </RouterLink>
    </form>
  </div>
</template>

<script setup></script>

<style>

</style>
