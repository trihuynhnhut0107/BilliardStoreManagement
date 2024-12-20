<template>
    <div class="flex flex-col gap-4">
        <div class="flex items-center bg-white w-full py-2 px-10 rounded gap-6" style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/tablemanagement" class="text-[#3A6351] font-medium text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
            </NuxtLink>
            <h1 class="font-bold text-xl">Table {{ tableID }} Detail</h1>
        </div>
        <div class="bg-white rounded-lg h-fit w-full px-10 py-3 flex justify-between items-center"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <div class="flex flex-col gap-2 min-w-[350px]">
                <div class="flex items-center gap-2">
                    <label for="table_type" class="text-base font-semibold w-full text-[#3A6351]">Table type: </label>
                    <input id="table_type" v-model="formData.table_type" required type="text" placeholder="Table type"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="stick_quantity" class="text-base font-semibold w-full text-[#3A6351]">Stick quantity:
                    </label>
                    <input id="stick_quantity" v-model="formData.stick_quantity" type="text" required
                        placeholder="Stick quantity" class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="ball_quantity" class="text-base font-semibold w-full text-[#3A6351]">Ball quantity:
                    </label>
                    <input id="ball_quantity" v-model="formData.ball_quantity" type="text" required
                        placeholder="Ball quantity" class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="price" class="text-base font-semibold w-full text-[#3A6351]">Price: </label>
                    <input id="price" v-model="formData.price" type="text" required placeholder="Price"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="status" class="text-base font-semibold w-full text-[#3A6351]">Status: </label>
                    <input id="status" v-model="formData.status" type="text" required placeholder="Status"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
            </div>
            <img src="https://placehold.co/150x200" />
        </div>
        <div class="flex justify-end items-center gap-2 bg-white w-full py-2 px-10 rounded"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/tablemanagement" class="w-fit bg-[#3A6351] py-1 px-4 text-white text-sm font-medium rounded">
                Cancel</NuxtLink>
            <button @click="editTable"
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

let tableID = ref('');

const route = useRoute();
tableID = route.query.id

const formData = ref({
    id: tableID,
    table_type: '',
    stick_quantity: '',
    ball_quantity: '',
    price: '',
    status: '',
})

const toUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const refetchData = async () => {
    const { data, error } = await useFetch(
        `http://localhost:8080/v1/api/table-manage/table/${tableID}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (data.value && data.value.status === 201) {
        formData.value.name = toUpperCase(data.value.metadata.name);
        formData.value.phone_number = data.value.metadata.phone_number;
        formData.value.role = toUpperCase(data.value.metadata.role);
    } else {
        console.error("Error fetching table data:", error.value);
    }
};

refetchData();

const editTable = async () => {
    const { data, error } = await useFetch(`http://localhost:8080/v1/api/table-manage/update-table`, {
        method: 'POST',
        body: JSON.stringify({
            table_id: tableID,
            name: formData.value.name,
            phone_number: formData.value.phone_number,
            role: formData.value.role,
        }),
    })

    if (data.value && data.value.status === 201) {
        toast.success('Edit table successfully');
        navigateTo('/tablemanagement');
    } else {
        console.error("Error fetching table data:", error.value);
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