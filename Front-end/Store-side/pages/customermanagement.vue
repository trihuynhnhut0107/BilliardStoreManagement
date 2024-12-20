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
            <!-- <div class="flex items-center w-max rounded-2xl border px-3 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="#000" viewBox="0 0 16 16">
                    <path
                        d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                </svg>
                <p>Active</p>
            </div> -->
            <div class="flex gap-2 items-center">
                <NuxtLink to="/addcustomer" class="w-fit bg-[#3A6351] py-1 px-4 text-white text-sm font-medium rounded">
                    Add
                    user</NuxtLink>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="#ff0000" viewBox="0 0 16 16">
                    <path
                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
            </div>
        </div>

        <div>
            <table class="w-full border-collapse border-none">
                <!-- table header -->
                <thead class=" top-0 bg-white border-b border-[#ECF0F2] border-solid">
                    <tr>
                        <th class="p-2 w-[50px]">
                            <input type="checkbox" @change="selectAll" v-model="selectAllChecked"
                                class="cursor-pointser rounded border-2 border-[#3A6351] checked:bg-[#3A6351] checked:border-[#3A6351] h-4 w-4" />
                        </th>
                        <th class="p-2 w-[80px]">ID</th>
                        <th class="p-2 w-[150px]">Name</th>
                        <th class="p-2 w-[100px]">Phone number</th>
                        <th class="p-2 w-[100px]">Points</th>
                        <th class="p-2 w-[80px]">Edit</th>
                        <th class="p-2 w-[80px]">Delete</th>
                    </tr>
                </thead>

                <!-- table row -->
                <tbody>
                    <tr v-for="(table, index) in paginatedTables" :key="index"
                        class="hover:bg-gray-50 last:border-none bg-white">
                        <td class="p-2 py-4 w-[50px] text-center align-middle">
                            <input type="checkbox" v-model="table.selected"
                                class="cursor-pointser rounded border-2 border-[#3A6351] checked:bg-[#3A6351] checked:border-[#3A6351] h-4 w-4" />
                        </td>
                        <td class="p-2 w-[80px] text-center align-middle">
                            {{ table.id }}
                        </td>
                        <td class="p-2 w-[150px] text-center align-middle">
                            {{ table.name }}
                        </td>
                        <td class="p-2 w-[100px] text-center align-middle">
                            {{ table.phone_number }}
                        </td>
                        <td class="p-2 w-[100px] text-center align-middle">
                            {{ table.points }}
                        </td>
                        <td class="p-2 w-[80px] text-center align-middle">
                            <svg @click="editTable(table.id)" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6"
                                fill="#000" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                        </td>
                        <td class="p-2 w-[80px] text-center align-middle">
                            <svg @click="deleteTable(table.id)" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6"
                                fill="#ff0000" viewBox="0 0 16 16">
                                <path
                                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <!-- Pagination -->
        <div class="flex justify-center items-center mt-4 gap-2 w-full py-2 px-10 rounded bg-white">
            <button @click="currentPage > 1 && currentPage--"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }" class="px-3 py-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>
            </button>
            <!-- <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span> -->
            <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="currentPage < totalPages && currentPage++"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }" class="px-3 py-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

definePageMeta({
    layout: 'home-layout'
});

const tables = ref([]);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 6;


const toUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to refetch data
const refetchData = async () => {
    const { data: newData, error } = await useFetch(
        "http://localhost:8080/v1/api/customer-manage/get-all-customer"
    );

    if (newData.value && newData.value.status === 201) {
        tables.value = newData.value.metadata.map((item) => ({
            id: item.id,
            name: toUpperCase(item.name),
            phone_number: item.phone_number,
            points: item.points,
            selected: false,
        }));
    } else {
        console.error("Error fetching table data:", error.value);
    }
};

refetchData();

// Computed property to filter tables based on search query
const filteredTables = computed(() => {
    return tables.value.filter((table) => {
        return (
            table.id.toString().includes(searchQuery.value) ||
            table.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            table.phone_number.toString().includes(searchQuery.value) ||
            table.points.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });
});

// Computed property for pagination
const totalPages = computed(() => {
    return Math.ceil(filteredTables.value.length / itemsPerPage);
});

// Computed property to get current page items
const paginatedTables = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTables.value.slice(start, end);
});

const selectAllChecked = ref(false);

const selectAll = () => {
    const isSelected = selectAllChecked.value;
    tables.value.forEach((table) => {
        table.selected = isSelected;
    });
};

// Watch for search query changes to reset pagination
watch(searchQuery, () => {
    currentPage.value = 1;
});

// const deleteTable = async (id) => {
//       try {
//         const confirmDelete = confirm(
//           `Are you sure you want to delete table ${id}?`
//         );
//         if (!confirmDelete) return;

//         const { data, error } = await useFetch(
//           "http://localhost:8080/v1/api/table-manage/delete-table",
//           {
//             method: "POST",
//             body: JSON.stringify({
//               table_id: id,
//             }),
//           }
//         );

//         if (data.value.status !== 201) {
//           console.log("Delete table error !");
//           return;
//         }

//         toast.success(`Delete table ${id} successful`, {
//           autoClose: 3000,
//         });
//         console.log("Delete table successful");
//         // Refetch data after deletion
//         refetchData();
//       } catch (err) {
//         toast.error("Error deleting table", {
//           autoClose: 3000,
//         });
//         console.log(err);
//       }
//     alert("Delete table " + id);
// };

const editTable = (id) => {
    router.push(`/editcustomer?id=${id}`);
};
</script>

<style scoped></style>
