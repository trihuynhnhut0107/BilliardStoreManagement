<template>
    <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center bg-white w-full py-2 px-10 rounded"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <h1 class="font-bold text-xl">Add New Table</h1>
        </div>
        <form @submit.prevent class="bg-white rounded-lg h-fit w-full px-10 py-3 flex justify-between"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <div class="flex flex-col gap-2 min-w-[350px]">
                <div class="flex items-center gap-2">
                    <label for="tableType" class="text-base font-semibold w-full text-[#3A6351]">Table type: </label>
                    <input id="tableType" v-model="formData.table_type" required type="text" placeholder="Table type: "
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="stickQuantity" class="text-base font-semibold w-full text-[#3A6351]">Stick quantity:
                    </label>
                    <input id="stickQuantity" v-model.number="formData.stick_quantity" type="number" required
                        placeholder="Stick quantity" class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="ballQuantity" class="text-base font-semibold w-full text-[#3A6351]">Ball quantity:
                    </label>
                    <input id="ballQuantity" v-model.number="formData.ball_quantity" type="number" required
                        placeholder="Ball quantity" class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="price" class="text-base font-semibold w-full text-[#3A6351]">Price: </label>
                    <input id="price" v-model.number="formData.price" type="number" required placeholder="Price"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="status" class="text-base font-semibold w-full text-[#3A6351]">Status: </label>
                    <input readonly id="status" v-model="formData.status" type="text" required placeholder="Status"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
            </div>
            <img src="https://placehold.co/150x200" />
        </form>
        <div class="flex justify-end items-center gap-2 bg-white w-full py-2 px-10 rounded"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/tablemanagement" class="w-fit bg-[#3A6351] py-1 px-4 text-white text-sm font-medium rounded">
                Cancel</NuxtLink>
            <button v-on:click="createTable"
                class="w-fit text-[#3A6351] py-1 px-4 bg-white text-sm font-medium rounded border border-[#3A6351] box-border">Create</button>
        </div>
    </div>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'nuxt/app';

definePageMeta({
    layout: 'home-layout'
});

const router = useRouter();

const formData = ref({
    table_type: '',
    ball_quantity: '',
    stick_quantity: '',
    price: '',
    status: 'Available',
});

const toUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const validateForm = () => {
    if (!formData.value.table_type || !formData.value.status) {
        toast.error('Please fill in all fields', {
            autoClose: 3000,
        });
        return false;
    }

    if (formData.value.stick_quantity <= 0 || formData.value.ball_quantity <= 0 || formData.value.price <= 0) {
        toast.error('Quantities and price must be positive numbers', {
            autoClose: 3000,
        });
        return false;
    }

    return true;
}

const createTable = async () => {
    try {
        if (!validateForm()) return;

        const response = await $fetch('http://localhost:8080/v1/api/table-manage/create-new-table', {
            method: 'POST',
            body: JSON.stringify({
                table_type: toUpperCase(formData.value.table_type),
                stick_quantity: formData.value.stick_quantity,
                ball_quantity: formData.value.ball_quantity,
                price: formData.value.price,
                status: toUpperCase(formData.value.status),
            })
        });

        toast.success('Table created successfully', {
            autoClose: 3000,
        });
        router.push("/tablemanagement");

    } catch (err) {
        console.error('Create Table Failed:', err);
        toast.error(err.message || 'Failed to create table', {
            autoClose: 3000,
        });
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