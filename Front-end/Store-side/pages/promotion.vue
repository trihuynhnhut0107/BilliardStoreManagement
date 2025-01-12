<template>
    <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        style="z-index: 40;">
    </div>
    <!-- Edit Form -->
    <form v-show="showPopup" @submit.prevent class="fixed top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2
                bg-white rounded-lg h-fit w-fit px-10 py-3 flex justify-between flex-col gap-4 z-50"
        style="box-shadow: 0px 0px 3px #a4a4a4">
        <h1 class="font-bold text-xl">Promotion Details</h1>
        <div class="flex">
            <div class="flex flex-col gap-2 min-w-[350px] justify-center">
                <div class="flex items-center gap-2">
                    <label for="name" class="text-base font-semibold w-full text-[#3A6351]">Name: </label>
                    <input id="name" v-model="formData.name" type="text" required placeholder="Promotion name"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="description" class="text-base font-semibold w-full text-[#3A6351]">Description: </label>
                    <input id="description" v-model="formData.description" type="text" required
                        placeholder="Description" class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="discount" class="text-base font-semibold w-full text-[#3A6351]">Discount Rate (%):
                    </label>
                    <input id="discount" v-model="formData.discount_rate" required type="number"
                        placeholder="Discount rate" class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="start_date" class="text-base font-semibold w-full text-[#3A6351]">Start Date: </label>
                    <input id="start_date" v-model="formData.start_date" required type="datetime-local"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div class="flex items-center gap-2">
                    <label for="end_date" class="text-base font-semibold w-full text-[#3A6351]">End Date: </label>
                    <input id="end_date" v-model="formData.end_date" required type="datetime-local"
                        class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
                <div v-if="formData.end_date && formData.start_date && new Date(formData.end_date) < new Date(formData.start_date)"
                    class="text-red-500 text-sm">
                    End date must be after start date>
                </div>
                <div class="flex items-center gap-2">
                    <label for="max_usage" class="text-base font-semibold w-full text-[#3A6351]">Max Usage: </label>
                    <input id="max_usage" v-model="formData.max_usage" required type="number"
                        placeholder="Maximum usage" class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                </div>
            </div>
        </div>
        <div class="flex justify-end items-center gap-2 bg-white w-full">
            <button @click="handleShowPopUp"
                class="w-fit bg-[#3A6351] py-1 px-4 text-white text-sm font-medium rounded">
                Cancel</button>
            <button @click="createPromotion"
                class="w-fit text-[#3A6351] py-1 px-4 bg-white text-sm font-medium rounded border border-[#3A6351] box-border">Submit</button>
        </div>
    </form>
    <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center bg-white w-full py-2 px-10">
            <h1 class="font-bold text-xl">Promotion</h1>
            <div class="flex items-center w-max rounded-2xl border px-3 py-1">
                <input placeholder="Search" v-model="searchQuery"
                    class="outline-none border-none bg-transparent pr-20 text-xs" />
                <div class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </div>
            </div>
            <div class="flex gap-2 items-center">
                <button @click="handleShowPopUp"
                    class="w-fit bg-[#3A6351] py-[6px] px-4 text-white text-sm font-medium rounded">Create promotion
                </button>
            </div>
        </div>


        <Table v-model="filteredTables" @updateRow="updateRow" @delete-row="deleteRow" :can-change="false"
            :can-delete="false" :is-pagination="false">
        </Table>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';

definePageMeta({
    layout: 'home-layout'
});

const formData = ref({
    name: "NEWYEAR",
    description: "NEWYEAR DISCOUNT",
    discount_rate: "20",
    start_date: "",
    end_date: "",
    max_usage: "1"
});
const datalist = ref([]);
const searchQuery = ref("");

// Function to refetch data with pagination
const refetchData = async () => {
    const data = await $fetch(
        "http://localhost:8080/v1/api/promotion/get-all-promotions",
        {
            method: "GET",

        }
    );
    datalist.value = data.metadata;
};

// Handle search query
const filteredTables = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return datalist.value

    return datalist.value.filter(table =>
        table.id.toString().toLowerCase().includes(query) ||
        table.price.toString().toLowerCase().includes(query) ||
        table.stick_quantity.toString().toLowerCase().includes(query) ||
        table.ball_quantity.toString().toLowerCase().includes(query) ||
        table.table_type.toLowerCase().includes(query) ||
        table.status.toLowerCase().includes(query)
    )
})

// Handle show popup
const showPopup = ref(false);
const handleShowPopUp = () => {
    showPopup.value = !showPopup.value;
    if (!showPopup.value)
        menuID.value = '';
};

// Handle create promotion
const formatDateTime = (date) => {
    // 2025-01-16T17:29 to 23:59:59 12/31/2025
    const [hour, minute] = date.split('T')[1].split(':');
    const [year, month, day] = date.split('T')[0].split('-');
    return `${hour}:${minute}:00 ${month}/${day}/${year}`;
};

const createPromotion = async () => {
    console.log(JSON.stringify({
        name: formData.value.name,
        description: formData.value.description,
        discount_rate: formData.value.discount_rate,
        start_date: formatDateTime(formData.value.start_date),
        end_date: formatDateTime(formData.value.end_date),
        max_usage: formData.value.max_usage
    }));
    const data = await $fetch(
        "http://localhost:8080/v1/api/promotion/create-new-promotion",
        {
            method: "POST",
            body: JSON.stringify({
                name: formData.value.name,
                description: formData.value.description,
                discount_rate: formData.value.discount_rate,
                start_date: formatDateTime(formData.value.start_date),
                end_date: formatDateTime(formData.value.end_date),
                max_usage: formData.value.max_usage
            }),
            onResponse({ response }) {
                if (response._data.status !== 201) {
                    toast.error(response._data.message);
                    return;
                } else {
                    toast.success(response._data.message);
                    refetchData();
                    handleShowPopUp();
                }
            },
        }
    );
};

// Initial data fetch
refetchData();
</script>

<style scoped></style>