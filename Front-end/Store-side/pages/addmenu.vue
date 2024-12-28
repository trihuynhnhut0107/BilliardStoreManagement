<template>
    <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center bg-white w-full py-2 px-10 rounded"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <h1 class="font-bold text-xl">Add Menu</h1>
        </div>
        <form @submit.prevent class="bg-white rounded-lg h-fit w-full px-10 py-3 flex justify-between"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <div class="flex flex-col gap-2 min-w-[350px] justify-center">
                <div class="flex items-center gap-2">
                    <label for="name" class="text-base font-semibold w-full text-[#3A6351]">Name: </label>
                    <input id="name" v-model="formData.name" type="text" required placeholder="Name"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="quantity" class="text-base font-semibold w-full text-[#3A6351]">Quantity: </label>
                    <input id="quantity" v-model="formData.quantity" required type="number" placeholder="Quantity"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="price" class="text-base font-semibold w-full text-[#3A6351]">Price: </label>
                    <input id="price" v-model="formData.price" required type="number" placeholder="Price"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
            </div>
            <img src="https://placehold.co/150x200" />
        </form>
        <div class="flex justify-end items-center gap-2 bg-white w-full py-2 px-10 rounded"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/menumanagement" class="w-fit bg-[#3A6351] py-1 px-4 text-white text-sm font-medium rounded">
                Cancel</NuxtLink>
            <button v-on:click="createMenu"
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
    name: '',
    price: '',
    quantity: '',
});

const validateForm = () => {
    return formData.value.name &&
        Number(formData.value.price) > 0 &&
        Number(formData.value.quantity) >= 0
}

const createMenu = async () => {
    if (!validateForm()) {
        toast.error("Please fill all fields correctly")
        return
    }

    try {
        const { data, error } = await useFetch('http://localhost:8080/v1/api/menu-manage/create-new-menu-item', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.value.name,
                price: formData.value.price,
                quantity: formData.value.quantity,
            }),
        });
        navigateTo('/menumanagement')
    } catch (err) {
        toast.error("Create menu unsucessfully", {
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