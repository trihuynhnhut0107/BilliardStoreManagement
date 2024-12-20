<template>
    <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center bg-white w-full py-2 px-10 rounded"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <h1 class="font-bold text-xl">Add New Customer</h1>
        </div>
        <form @submit.prevent class="bg-white rounded-lg h-fit w-full px-10 py-3 flex justify-between"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <div class="flex flex-col gap-2 min-w-[350px]">
                <div class="flex items-center gap-2">
                    <label for="fullName" class="text-base font-semibold w-full text-[#3A6351]">Full name: </label>
                    <input id="fullName" v-model="formData.name" required type="text" placeholder="Full name"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="phoneNumber" class="text-base font-semibold w-full text-[#3A6351]">Phone number:
                    </label>
                    <input id="phoneNumber" v-model="formData.phone_number" type="text" required
                        placeholder="Phone number" class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="email" class="text-base font-semibold w-full text-[#3A6351]">Email: </label>
                    <input id="email" v-model="formData.email" type="text" required placeholder="Email"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="username" class="text-base font-semibold w-full text-[#3A6351]">Username: </label>
                    <input id="username" v-model="formData.username" required type="text" placeholder="Username"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="password" class="text-base font-semibold w-full text-[#3A6351]">Password: </label>
                    <input id="password" v-model="formData.password" required type="text" placeholder="Password"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
            </div>
            <img src="https://placehold.co/150x200" />
        </form>
        <div class="flex justify-end items-center gap-2 bg-white w-full py-2 px-10 rounded"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/staffmanagement" class="w-fit bg-[#3A6351] py-1 px-4 text-white text-sm font-medium rounded">
                Cancel</NuxtLink>
            <button v-on:click="createCustomer"
                class="w-fit text-[#3A6351] py-1 px-4 bg-white text-sm font-medium rounded border border-[#3A6351] box-border">Create</button>
        </div>
    </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

definePageMeta({
    layout: 'home-layout'
});

const formData = ref({
    username: '',
    email: '',
    password: '',
    name: '',
    phone_number: '',
});

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
    } if (!validateEmail(formData.value.email)) {
        toast.error("Please enter a valid email address");
        return false;
    } if (!validatePhone(formData.value.phone_number)) {
        toast.error("Please enter a valid phone number");
        return false;
    }
    return true
}

const toUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const createCustomer = async () => {
    let check = isValidInput();
    if (!check) {
        return
    }
    const { data, error } = await useFetch('http://localhost:8080/v1/api/access/customer-site/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: formData.value.username,
            email: formData.value.email,
            password: formData.value.password,
            name: formData.value.name,
            phone_number: formData.value.phone_number,
        }),
    })
    try {
        if (data.value.status === 201) {
            console.log('Registered Customer Successfully:')
            navigateTo("/customermanagement")
        }
    } catch (err) {
        toast.error("Email already exists", {
            autoClose: 3000,
        })
        console.log(err)
    }
}

</script>

<style scoped>
.name::placeholder {
    color: #3A6351;
}

.name {
    text-indent: 0px;
}

input {
    text-indent: 5px;
}
</style>