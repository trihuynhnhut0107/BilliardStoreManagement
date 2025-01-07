<template>
    <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center bg-white w-full py-2 px-10">
            <h1 class="font-bold text-xl">Customer List</h1>
            <div class="flex items-center w-max rounded-2xl border px-3 py-1">
                <input placeholder="Search" v-model="searchQuery"
                    class="outline-none border-none bg-transparent pr-20 text-xs" />
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </div>
            <div class="flex gap-2 items-center">
                <NuxtLink to="/addcustomer"
                    class="w-fit bg-[#3A6351] py-[6px] px-4 text-white text-sm font-medium rounded">
                    Add
                    user</NuxtLink>
            </div>
        </div>

        <!-- Table -->
        <Table v-model="filteredTables" :currentPage="currentPage" :totalPages="totalPages" :can-delete="false"
            :handlePageChange="handlePageChange" @updateRow="updateRow">
        </Table>

    </div>
</template>

<script setup>

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';

const router = useRouter()

definePageMeta({
    layout: 'home-layout'
});

const datalist = ref([]);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(6);
const totalPages = ref('');

// Function to refetch data with pagination
const refetchData = async () => {
    const data = await $fetch(
        "http://localhost:8080/v1/api/customer-manage/get-all-customer-pagination",
        {
            method: "GET",
            query: {
                page_number: currentPage.value,
                page_size: itemsPerPage.value,
            },
        }
    );
    totalPages.value = data.metadata.totalPages;
    datalist.value = data.metadata.customers;
};

// Handle page changes
const handlePageChange = async (direction) => {
    if (direction === 'next' && currentPage.value < totalPages.value) {
        currentPage.value++;
    } else if (direction === 'prev' && currentPage.value > 1) {
        currentPage.value--;
    }
    await refetchData();
};

// Handle row updates
const updateRow = async (updatedRow, callback) => {
    console.log(updatedRow.phone_number);
    const response = await $fetch(
        `http://localhost:8080/v1/api/customer-manage/update-customer`,
        {
            method: "POST",
            body: {
                customer_id: updatedRow.id,
                name: updatedRow.name,
                phone_number: updatedRow.phone_number,
                email: updatedRow.email,
            },
            onResponse({ response }) {
                if (response.status !== 200 && response.status !== 201) {
                    toast.error(response._data.message);
                    callback(false);
                } else {
                    callback(true);
                    refetchData();
                    toast.success("Customer updated successfully");
                }
            },
        }
    );
};

// Handle search query
const filteredTables = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return datalist.value

    return datalist.value.filter(table =>
        table.id.toString().toLowerCase().includes(query) ||
        table.name.toLowerCase().includes(query) ||
        table.phone_number.toString().toLowerCase().includes(query) ||
        table.email.toLowerCase().includes(query) ||
        table.accountID.toString().toLowerCase().includes(query) ||
        table.points.toString().toLowerCase().includes(query) ||
        table.status.toLowerCase().includes(query)
    )
})

// Initial data fetch
refetchData();

watch([currentPage, itemsPerPage], async () => {
    await refetchData();
});

watch(filteredTables, async () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
    }
});
</script>

<style scoped></style>
