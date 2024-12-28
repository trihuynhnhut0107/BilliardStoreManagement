<template>
  <div class="w-screen h-screen">
    <Table v-model="data.metadata" />
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";

const tables = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = ref(0);

// const getData = async () => {
//   const data = await $fetch(
//     "http://localhost:8080/v1/api/table-manage/get-all-tables-pagination",
//     {
//       method: "GET",
//       query: {
//         page_number: currentPage.value,
//         page_size: itemsPerPage.value,
//       },
//       onResponse({ response }) {
//         if (response.status !== 200) {
//           toast.error(response._data.message);
//         }
//       },
//     }
//   );
//   tables.value = data.metadata.tables;
//   totalPages.value = data.metadata.totalPages;
//   console.log(data.metadata);
// };
// await getData();

const data = await $fetch(
  "http://localhost:8080/v1/api/staff-manage/get-all-staff"
);
console.log(data);
</script>

<style scoped></style>
