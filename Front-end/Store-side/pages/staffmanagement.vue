<template>
    <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center bg-white w-full py-2 px-10">
            <h1 class="line-clamp-1 font-bold text-xl">Staff List</h1>
            <div class="flex items-center w-fit shrink rounded-2xl border px-3 py-1">
                <input placeholder="Search" v-model="searchQuery"
                    class="outline-none border-none bg-transparent pr-20 text-xs" />
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </div>
            <div class="flex gap-2 items-center">
                <NuxtLink to="/addstaff"
                    class="line-clamp-1 w-fit bg-[#3A6351] py-[6px] px-4 text-white text-sm font-medium rounded">Add
                    staff</NuxtLink>
        
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
const totalPages = ref(0);

// Function to refetch data with pagination
const refetchData = async () => {
    const data = await $fetch(
        "http://localhost:8080/v1/api/staff-manage/get-all-staff-pagination",
        {
            method: "GET",
            query: {
                page_size: itemsPerPage.value,
                page_number: currentPage.value,
            },
        }
    );
    totalPages.value = data.metadata.totalPages;
    datalist.value = data.metadata.staffs;
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
    console.log("Updated Row:", updatedRow);

    // Ensure all required fields are present and not empty
    const staffName = updatedRow.staff_name?.trim() || updatedRow.name?.trim();
    const staffRole = updatedRow.role?.trim() || updatedRow.email?.trim();
    const staffPhone = updatedRow.phone_number?.trim() || updatedRow.phone?.trim();

    if (!staffName || !staffRole || !staffPhone) {
        toast.error("Missing required fields. Please fill in all fields.");
        callback(false);
        return;
    }

    const payload = {
        staff_id: updatedRow.id,
        name: staffName,
        role: staffRole,
        phone_number: staffPhone,
    };

    try {
        const response = await $fetch(
            `http://localhost:8080/v1/api/staff-manage/update-staff`,
            {
                method: "POST",
                body: payload,
            }
        );
        
        if (response.status === 200 || response.status === 201) {
            callback(true);
            refetchData();
            toast.success("Staff updated successfully");
        } else {
            toast.error(response._data.message || "An error occurred.");
            callback(false);
        }
    } catch (error) {
        console.error("Error updating staff:", error);
        toast.error("Failed to update staff. Please try again.");
        callback(false);
    }
};



// Handle search query
const filteredTables = computed(() => {
    const query = (searchQuery.value || "").toLowerCase().trim();

    if (!query) return datalist.value || [];

    return (datalist.value || []).filter(table => {
        return (
            (table.id?.toString().toLowerCase() || "").includes(query) ||
            (table.name?.toLowerCase() || "").includes(query) ||
            (table.phone_number?.toString().toLowerCase() || "").includes(query) ||
            (table.role?.toLowerCase() || "").includes(query) ||
            (table.accountID?.toString().toLowerCase() || "").includes(query) ||
            (table.status?.toLowerCase() || "").includes(query)
        );
    });
});


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
