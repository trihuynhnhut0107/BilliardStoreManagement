<template>
    <div class="flex flex-col gap-4">
        <div class="flex items-center bg-white w-full py-2 px-10 rounded gap-6" style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/menumanagement" class="text-[#3A6351] font-medium text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
            </NuxtLink>
            <h1 class="font-bold text-xl">Menu {{ menuID }} Detail</h1>
        </div>
        <div class="bg-white rounded-lg h-fit w-full px-10 py-3 flex justify-between items-center"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <div class="flex flex-col gap-2 min-w-[350px]">
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
        </div>
        <div class="flex justify-end items-center gap-2 bg-white w-full py-2 px-10 rounded"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/menumanagement" class="w-fit bg-[#3A6351] py-1 px-4 text-white text-sm font-medium rounded">
                Cancel</NuxtLink>
            <button @click="editMenu"
                class="w-fit text-[#3A6351] py-1 px-4 bg-white text-sm font-medium rounded border border-[#3A6351] box-border">Submit</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify';

definePageMeta({
    layout: 'home-layout'
});

let menuID = ref('');

const route = useRoute();
menuID = route.query.id

const formData = ref({
    menu_id: menuID,
    name: '',
    quantity: '',
    price: '',
});

const editMenu = async () => {
    // Iterate over the keys and reset those with null or empty string
    Object.keys(formData.value).forEach(key => {
        if (formData.value[key] === '' || formData.value[key] === null) {
            formData.value[key] = undefined;
        }
    });

    try {
        const { data, error } = await useFetch(`http://localhost:8080/v1/api/menu-manage/update-menu-item`, {
            method: 'POST',
            body: JSON.stringify(formData.value),
        });
        toast.success('Edit menu successfully', {
            autoClose: 3000,
        });
        navigateTo('/menumanagement');
    } catch (err) {
        toast.error("Edit menu unsucessfully", {
            autoClose: 3000,
        })
        console.log(err)
    }
};

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