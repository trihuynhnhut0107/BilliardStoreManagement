<template>
    <div class="flex justify-around p-[50px] h-screen w-full max-w-full bg-cover bg-no-repeat bg-img">
      <header class="flex flex-col items-left justify-center">
        <h1 class="text-[#3A6351] text-5xl font-bold uppercase ">app name</h1>
        <h3 class="capitalize w-[60%] text-3xl font-medium mt-2">book your perfect game anytime anywhere!</h3>
      </header>
      <form class="self-center w-fit p-[30px] px-[80px] flex flex-col items-center gap-[15px] rounded-lg bg-white">
        <div>
          <input type="text" placeholder="Email address or phone number" class="w-[250px] h-[40px] p-[10px] border border-[#A4A4A4] rounded-md">
        </div>
        <div class="password-input">
          <input :type="isPasswordVisible ? 'text' : 'password'"
                 placeholder="Password" class="w-[250px] h-[40px] p-[10px] border border-[#A4A4A4] rounded-md">
          <img src="../public/Icon/eye-close.png" @click.prevent={togglePassword}>
        </div>
        <div class="w-[250px] bg-[#3A6351] text-white rounded-md text-center p-[7px]">
          <input type="submit" value="Log in" class="w-full bg-transparent text-white cursor-pointer">
        </div>
        <RouterLink class="text-[#3A6351] font-medium" to="/forgotpassword">
          Forgot password?
        </RouterLink>
        <hr class="w-[250px] border border-[#A4A4A4] p-0">
        <button class="text-white bg-[#3A6351] w-[200px] p-[7px] rounded-md" onclick={togglePassword}>
          <RouterLink >Create new account</RouterLink>
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
    const isPasswordVisible = false

    function togglePassword(){
      // isPasswordVisible = !isPasswordVisible
      alert("Hi")
    }
  </script>

  <style>
  .bg-img {
    background-image: url(../public/Image/Login_page.png);
  }

  .password-input {
    display: flex;
    align-items: center;
    
  }

  .password-input img{
    width: 35px;
    cursor: pointer;

  }
</style>
  