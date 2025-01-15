<template>
    <div class="relative">
        <!-- Dark overlay -->
        <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            style="z-index: 40;">
        </div>
        <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center bg-white w-full py-2 px-10">
                <h1 class="font-bold text-xl">Menu</h1>
                <div class="flex items-center w-max rounded-2xl border px-3 py-1">
                    <input placeholder="Search" v-model="searchQuery"
                        class="outline-none border-none bg-transparent pr-20 text-xs" />
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </div>

                <!-- Edit Form -->
                <form v-show="showPopup" @submit.prevent class="fixed top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2
                bg-white rounded-lg h-fit w-fit px-10 py-3 flex justify-between flex-col gap-4 z-50"
                    style="box-shadow: 0px 0px 3px #a4a4a4">
                    <h1 class="font-bold text-xl">Menu {{ menuID }} Detail</h1>
                    <div class="flex">
                        <div class="flex flex-col gap-2 min-w-[350px] justify-center">
                            <div class="flex items-center gap-2">
                                <label for="name" class="text-base font-semibold w-full text-[#3A6351]">Name: </label>
                                <input id="name" v-model="formData.name" type="text" required placeholder="Name"
                                    class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                            </div>
                            <div class="flex items-center gap-2">
                                <label for="quantity" class="text-base font-semibold w-full text-[#3A6351]">Quantity:
                                </label>
                                <input id="quantity" v-model="formData.quantity" required type="number"
                                    placeholder="Quantity"
                                    class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                            </div>
                            <div class="flex items-center gap-2">
                                <label for="price" class="text-base font-semibold w-full text-[#3A6351]">Price: </label>
                                <input id="price" v-model="formData.price" required type="number" placeholder="Price"
                                    class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                            </div>
                        </div>
                        <!-- <img src="https://placehold.co/150x200" /> -->
                    </div>
                    <div class="flex justify-end items-center gap-2 bg-white w-full">
                        <button @click="handleShowPopUp"
                            class="w-fit bg-[#3A6351] py-1 px-4 text-white text-sm font-medium rounded">
                            Cancel</button>
                        <button @click="editMenu"
                            class="w-fit text-[#3A6351] py-1 px-4 bg-white text-sm font-medium rounded border border-[#3A6351] box-border">Submit</button>
                    </div>
                </form>
                <!-- <div class="flex items-center w-max rounded-2xl border px-3 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="#000" viewBox="0 0 16 16">
                    <path
                        d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                </svg>
                <p>Active</p>
            </div> -->
                <div class="flex gap-2 items-center">
                    <NuxtLink to="/addmenu"
                        class="w-fit bg-[#3A6351] py-[6px] px-4 text-white text-sm font-medium rounded">
                        Add
                        menu</NuxtLink>
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="#ff0000" viewBox="0 0 16 16">
                        <path
                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg> -->
                </div>
            </div>


            <!-- Menu List -->
            <div class="grid grid-cols-5 gap-x-4 gap-y-3">
                <div v-for="(table, index) in filteredTables" :key="index" @dblclick="toggleEdit(table.id)"
                    class="w-fit bg-white hover:bg-gray-50 py-2 px-4 flex flex-col gap-2 cursor-pointer">
                    <img src="../public/menu_image.png" alt="img">
                    <h3 class="font-semibold text-sm">{{ table.name }}</h3>
                    <p class="text-xs">Quantity: {{ table.quantity }}</p>
                    <p class="text-red-700 text-sm font-bold">Price: {{ table.price }} VND</p>
                </div>
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-center items-center mt-4 gap-2 w-full py-2 px-10 rounded bg-white">
                <button @click="handlePageChange('prev')"
                    :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }" class="px-3 py-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                    </svg>
                </button>
                <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
                <button @click="handlePageChange('next')"
                    :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }" class="px-3 py-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';

definePageMeta({
    layout: 'home-layout'
});

const datalist = ref([]);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPages = ref(0);


// Function to refetch data with pagination
const refetchData = async () => {
    const data = await $fetch(
        "http://localhost:8080/v1/api/menu-manage/get-menu-list-pagination",
        {
            method: "GET",
            query: {
                page_size: itemsPerPage.value,
                page_number: currentPage.value,
            },
        }
    );
    totalPages.value = data.metadata.totalPages;
    datalist.value = data.metadata.menuItems;
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

// Handle search query
const filteredTables = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return datalist.value

    return datalist.value.filter(table =>
        table.id.toString().toLowerCase().includes(query) ||
        table.name.toLowerCase().includes(query) ||
        table.price.toString().toLowerCase().includes(query) ||
        table.quantity.toString().toLowerCase().includes(query)
    );
});

// Update selected menu
const menuID = ref('');
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

    const data = await $fetch(`http://localhost:8080/v1/api/menu-manage/update-menu-item`, {
        method: 'POST',
        body: JSON.stringify(formData.value),
        onResponse: (response) => {
            if (!response.status === 200 && !response.status === 201) {
                toast.error('Edit menu unsuccessfully');
                navigateTo('/menumanagement');
            } else {
                toast.success('Edit menu successfully');
            }
        },
    });

    handleShowPopUp();
    refetchData();
};

const showPopup = ref(false);
const handleShowPopUp = () => {
    showPopup.value = !showPopup.value;
    if (!showPopup.value)
        menuID.value = '';
};

const toggleEdit = (id) => {
    menuID.value = id;
    const table = datalist.value.find(table => table.id === id);
    formData.value = {
        menu_id: table.id,
        name: table.name,
        quantity: table.quantity,
        price: table.price,
    };
    handleShowPopUp();
};

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
