<template>
    <div class="w-full max-w-full h-[90vh] flex flex-col items-center justify-center gap-2 bg-[#F0F0F0]">
      <header>
        <h1 class="text-[42px] font-bold uppercase text-[#3A6351] text-center">app name</h1>
      </header>
      <form class="self-center w-fit flex flex-col items-center gap-5 rounded-lg shadow-[2px_2px_2px_#A4A4A4] p-4 px-11 bg-white">
        <h3 class="text-2xl font-bold">Reset your password</h3>
        <hr class="w-[123%] border-[#A4A4A4]" style="border-width: 0.1px;">
        <div class="flex w-auto]">
          <div class="flex flex-col gap-5">
            <h5 class="w-[240px] break-words leading-tight font-medium">
              How do you want to receive the code to reset your password?
            </h5>
            <div class="flex">
              <input class="m-[0.4rem] font-medium" 
                     type="radio" id="email" name="method" value="email" checked>
              <div>
                <label class="text-[13px] font-medium" for="email">Send code via email</label>
                <div class="text-[13px] font-medium" >{{ userEmail }}</div>
              </div>
            </div>
            <div>
              <input class="m-[0.4rem]" type="radio" id="password" name="method" value="password">
              <label class="text-[13px] font-medium" for="password">Enter Password to Log in</label>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <img class="w-8" src="../public/Icon/circle-user.png" alt="">
            <div>{{ userEmail }}</div>
          </div>
        </div>
        <div class="flex justify-between w-[215px]">
          <button class="bg-ưhite text-[#3A6351] font-semibold rounded-md border border-[#3A6351] w-[100px] p-2"><RouterLink to="/forgotpassword">Not you</RouterLink></button>
          <button class="bg-[#3A6351] text-white font-semibold rounded-md border border-[#3A6351] w-[100px] p-2">Continue</button>
        </div>
      </form>
    </div>
    <footer></footer>
  </template>
  
  <script setup>
    const userEmail = "example@gmail.com"
  </script>
  
  <style scoped>
  </style>
  