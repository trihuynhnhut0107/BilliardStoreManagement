<template>
  <div class="h-full w-full flex flex-col items-center justify-center">
    <Table
      v-model="tables"
      :comboBoxColumn="comboBoxColumns"
      class="flex items-center justify-center" />
    <div
      class="flex justify-center items-center mt-4 gap-2 w-full py-2 px-10 rounded bg-white">
      <button
        @click="currentPage > 1 && currentPage--"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        class="px-3 py-2 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="w-6 h-6"
          viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
      </button>
      <!-- <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span> -->
      <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="currentPage < totalPages && currentPage++"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        class="px-3 py-2 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="w-6 h-6"
          viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

import { toast } from "vue3-toastify";

const tables = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(0);

const optionColumn = "status";
const comboBoxColumns = ref({
  status: ["Available", "Busy"], // Options for the 'status' column
});

const getData = async () => {
  const data = await $fetch(
    "http://localhost:8080/v1/api/table-manage/get-all-tables-pagination",
    {
      method: "GET",
      query: {
        page_number: currentPage.value,
        page_size: itemsPerPage.value,
      },
      onResponse({ response }) {
        if (response.status !== 200) {
          toast.error(response._data.message);
        }
      },
    }
  );
  tables.value = data.metadata.tables;
  totalPages.value = data.metadata.totalPages;
  console.log(data);
};
await getData();

watch([currentPage, itemsPerPage], async () => {
  await getData();
});
</script>

<style scoped></style>
