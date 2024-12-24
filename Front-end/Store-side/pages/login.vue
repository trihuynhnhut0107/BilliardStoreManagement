<template>
    <div
        class="h-svh w-svw max-h-full flex justify-around p-[50px] bg-cover bg-no-repeat bg-[url('/public/login_page.png')]">
        <div class="md:flex m-auto flex-col items-left justify-center hidden">
            <h1 class="text-[#3A6351] text-5xl font-bold uppercase ">app name</h1>
            <h3 class="capitalize w-[60%] text-3xl font-medium mt-2">book your perfect game anytime anywhere!</h3>
        </div>
        <form @submit.prevent
            class="w-full max-w-sm h-fit flex flex-col gap-4 rounded-lg bg-white py-6 px-8 m-auto items-center">
            <input v-model="formData.username" type="text" placeholder="Username"
                class="w-full max-w-64 h-9 border border-[#A4A4A4] rounded-md indent-2.5">
            <input type="password" v-model="formData.password" placeholder="Password"
                class="w-full max-w-64 h-9 border border-[#A4A4A4] rounded-md indent-2.5">
            <button v-on:click="login" class="w-full max-w-64 bg-[#3A6351] text-white rounded-md text-center py-2">
                Login
            </button>
            <NuxtLink class="text-[#3A6351] font-medium text-center max-w-64" to="/forgetpassword">Forgot password?
            </NuxtLink>
            <hr class="w-full border-gray-600 max-w-64">
            <NuxtLink class="w-full max-w-64 bg-[#3A6351] text-white rounded-md text-center py-2" to="/createaccount">
                Create new account
            </NuxtLink>
        </form>
    </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router';

definePageMeta({
    layout: 'footer-layout'
})

const router = useRouter();

const formData = ref({
    username: '',
    password: ''
})



const isValidInput = () => {
    if (!formData.value.username) {
        toast.error("Username is required");
        return false;
    } if (!formData.value.password) {
        toast.error("Password is required");
        return false;
    }
    return true;
}

const login = async () => {
    let check = isValidInput();
    if (!check) {
        return
    }

    const { data, error } = await useFetch('http://localhost:8080/v1/api/access/store-site/login', {
        method: 'POST',
        body: JSON.stringify(formData.value)
    })
    try {
        if (data.value.status === 200) {
            toast.success('Login Successfully', {
                autoClose: 3000,
            })
            localStorage.setItem('staffID', data.value.metadata.staffID)
            navigateTo("/admininformation")
        }
    } catch (err) {
        toast.error('Login Fail', {
            autoClose: 3000,
        })
        console.log(err)
    }

}
</script>

<style></style>