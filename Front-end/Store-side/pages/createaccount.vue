<template>
  <div class="bg-[#ECF0F2] h-screen max-h-full flex flex-col items-center pt-[10vh] gap-4">
    <div>
      <h1 class="text-4xl font-bold text-[#3A6351] text-center mt-10">Demo.</h1>
    </div>
    <form @submit.prevent
      class="self-center w-full max-w-sm flex flex-col items-center gap-3 rounded-lg shadow-[2px_2px_2px_#A4A4A4] bg-white p-4 px-11">
      <h3 class="text-2xl font-bold">Create new account</h3>
      <input v-model="formData.username" required type="text" placeholder="Username"
        class="w-full h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
      <input v-model="formData.name" required type="text" placeholder="Full name"
        class="w-full h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
      <input v-model="formData.email" type="email" required placeholder="Email address"
        class="w-full h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
      <input v-model="formData.phone_number" type="text" required placeholder="Phone number"
        class="w-full h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
      <input v-model="formData.password" type="password" required placeholder="New password" autocomplete="on"
        class="w-full h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
      <input v-model="confirmPassword" type="password" required placeholder="Confirm password" autocomplete="on"
        class="w-full h-9 p-0 border border-[#A4A4A4] rounded-md indent-2.5 text-sm bg-transparent" />
      <button v-on:click="signup" class="w-full bg-[#3A6351] text-white rounded-md text-center py-2">Sign up</button>
      <NuxtLink class="text-[#3A6351] font-bold mt-3" to="/login">
        Already have an account?
      </NuxtLink>
    </form>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

definePageMeta({
  layout: 'footer-layout'
})

const formData = ref({
  username: '',
  email: '',
  password: '',
  name: '',
  phone_number: '',
  role: 'Staff'
});

const confirmPassword = ref('')

const validateEmail = (email) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const validatePhone = (phone) => {
  var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  return re.test(phone);
}


const isValidInput = () => {
  if (!formData.value.email) {
    toast.error("Email is required");
    return false;
  }
  if (!formData.value.name) {
    toast.error("Name is required");
    return false;
  }
  if (!formData.value.password) {
    toast.error("Password is required");
    return false;
  } if (!formData.value.phone_number) {
    toast.error("Phone number is required");
    return false;
  } if (!formData.value.username) {
    toast.error("Username is required");
    return false;
  } if (!confirmPassword) {
    toast.error("Confirm password is required");
    return false;
  } if (formData.value.password != confirmPassword.value) {
    toast.error("Your password is not the same");
    return false;
  } if (!validateEmail(formData.value.email)) {
    toast.error("Please enter a valid email address");
    return false;
  } if (!validatePhone(formData.value.phone_number)) {
    toast.error("Please enter a valid phone number");
    return false;
  }
  return true
}

const signup = async () => {
  let check = isValidInput();
  if (!check) {
    return
  }
  const { data, error } = await useFetch('http://localhost:8080/v1/api/access/store-site/signup', {
    method: 'POST',
    body: JSON.stringify(formData.value),
  })
  try {
    if (data.value.status === 201) {
      console.log('Registered User Successfully:')
      navigateTo("/login")
    }
  } catch (err) {
    toast.error("Email already exists", {
      autoClose: 3000,
    })
    console.log(err)
  }
}

</script>

<style></style>