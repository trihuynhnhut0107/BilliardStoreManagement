<template>
  <div class="flex justify-around p-[50px] h-screen w-full max-w-full bg-cover bg-no-repeat bg-[url('/public/login_page.png')]">
    <header class="flex flex-col items-left justify-center">
      <h1 class="text-[#3A6351] text-5xl font-bold uppercase ">app name</h1>
      <h3 class="capitalize w-[60%] text-3xl font-medium mt-2">book your perfect game anytime anywhere!</h3>
    </header>
    <form @submit.prevent class="self-center w-fit p-[30px] px-[80px] flex flex-col items-center gap-[15px] rounded-lg bg-white">
      <input v-model="formData.username" type="text" placeholder="Username" class="w-[250px] h-[40px] p-[10px] border border-[#A4A4A4] rounded-md">
      <div class="flex items-center">
        <input type="password" v-model="formData.password"
               placeholder="Password" class="w-[250px] h-[40px] p-[10px] border border-[#A4A4A4] rounded-md">
        <!-- <img class="w-9 cursor-pointer" src="../public/Icon/eye-close.png" @click.prevent={togglePassword}> -->
      </div>
      <button v-on:click="login" class="w-[250px] bg-[#3A6351] text-white rounded-md text-center p-[7px]">Log in</button>
      <NuxtLink class="text-[#3A6351] font-medium" to="/forgetpassword">Forgot password?</NuxtLink>
      <hr class="w-[250px] border border-[#A4A4A4] p-0">
      <NuxtLink class="text-white bg-[#3A6351] text-center w-[200px] p-[7px] rounded-md" to="/createaccount" >Create new account</NuxtLink>
    </form>
  </div>
</template>   

<script setup>
  const formData = ref({
    username: '',
    password: ''
  })

  const login = async() => {
    try {
      const {data, error} = await useFetch('http://localhost:8080/v1/api/access/store-site/login',{
      method: 'POST',
      body: JSON.stringify(formData.value)
    })
    if (error){
      console.log(error)
    }
    if (data.value.status === 201) {
      console.log('Login Successfully:')
      navigateTo("/staff")
    }
    } catch (err){
      console.log(err)
    }

  }
</script>

<style>
</style>