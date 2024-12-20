<template>
    <div class="flex">
        <!-- chatbox -->
        <div class="flex-1">
            <div>
                <h3 class="font-bold">Tony</h3>
            </div>
            <div class="h-96 py">
                <div>
                    <p>Hello how can i help you</p>
                </div>
                <div>
                    <p>Hi, I have a question about my order</p>
                </div>
            </div>
            <div></div>
        </div>

        <!-- conversation -->
        <div class="w-[300px] bg-white p-5">
            <div class="flex justify-between">
                <input type="text" placeholder="Search" v-model="searchQuery"
                    class="border border-slate-400 bg-transparent text-xs indent-2 p-1 w-full rounded-lg shadow outline-none searchbar" />
            </div>
            <div>
                <table>
                    <tbody>
                        <!-- <tr v-for="()"></tr> -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'home-layout'
});

const searchQuery = ref('');
const tables = ref([]);
const currentPage = ref(1);
const itemsPerPage = 6;

// Function to refetch data
const refetchData = async () => {
    const { data: newData, error } = await useFetch(
        "http://localhost:8080/v1/api/staff-manage/get-all-staff"
    );

    if (newData.value && newData.value.status === 201) {
        tables.value = newData.value.metadata.map((item) => ({
            id: item.id,
            name: item.name,
            phone_number: item.phone_number,
            role: item.role,
            selected: false,
        }));
    } else {
        console.error("Error fetching table data:", error.value);
    }
};
</script>

<style>
.searchbar:hover {
    border-color: cadetblue;
}
</style>