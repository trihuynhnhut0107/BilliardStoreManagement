<template>
  <div class="flex flex-col gap-6 flex-1">
    <div class="flex justify-between bg-white px-10 py-2">
      <h2 class="text-2xl font-bold text-nowrap">Table List</h2>
      <div class="flex items-center w-max rounded-2xl border px-3">
        <!-- Search Input -->
        <input v-model="searchQuery" placeholder="Search" class="outline-none border-none bg-transparent pr-20 text-xs"
          @keydown="filterTables" />
        <img src="/Search.svg" class="w-3 cursor-pointer" />
      </div>
      <div class="flex gap-4">
        <button @click="handleToggleCreatetable"
          class="cursor-pointer bg-[#3A6351] text-white rounded text-xs text-nowrap text-center px-2 font-bold">
          Add Table
        </button>
        <img @click="deleteSelectedTable" src="/Trash.svg" class="w-4 cursor-pointer" />
      </div>
    </div>
    <div class="relative bg-white">
      <div class="max-h-[300px] overflow-y-auto">
        <table class="w-full border-collapse border-none">
          <thead class="sticky top-0 bg-white border-b border-[#ECF0F2] border-solid">
            <tr>
              <th class="p-2 w-[50px]"></th>
              <th class="p-2 w-[80px]">ID</th>
              <th class="p-2 w-[150px]">Type</th>
              <th class="p-2 w-[100px]">Price</th>
              <th class="p-2 w-[100px]">Status</th>
              <th class="p-2 w-[80px]">Edit</th>
              <th class="p-2 w-[80px]">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(table, index) in filteredTables" :key="index"
              class="hover:bg-gray-50 border-b border-[#ECF0F2] last:border-none">
              <td class="p-2 w-[50px] text-center align-middle">
                <input type="checkbox" v-model="table.selected"
                  class="cursor-pointer rounded border-2 border-[#3A6351] checked:bg-[#3A6351] checked:border-[#3A6351] h-4 w-4" />
              </td>
              <td class="p-2 w-[80px] text-center align-middle">
                {{ table.id }}
              </td>
              <td class="p-2 w-[150px] text-center align-middle">
                {{ table.table_type }}
              </td>
              <td class="p-2 w-[100px] text-center align-middle">
                {{ table.price }}
              </td>
              <td class="p-2 w-[100px] text-center align-middle" :class="{
                'text-[#00229D]': table.status === 'Repairing',
                'text-[#FF0000]': table.status === 'Unavailable',
                'text-[#0CB000]': table.status === 'Available',
              }">
                {{ table.status }}
              </td>
              <td class="p-2 w-[80px] text-center align-middle">
                <img @click="editTable(table.id)" src="/Edit.svg" class="cursor-pointer w-4 mx-auto" />
              </td>
              <td class="p-2 w-[80px] text-center align-middle">
                <img @click="deleteTable(table.id)" src="/Trash.svg" class="cursor-pointer w-4 mx-auto" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const tables = ref([]);
const searchQuery = ref("");

// Fetch data from API
const { data, error, status } = useFetch(
  "http://localhost:8080/v1/api/table-manage/get-all-tables"
);

onMounted(() => {
  if (data.value && data.value.status === 201) {
    tables.value = data.value.metadata.map((item) => ({
      id: item.id,
      table_name: `Table ${item.id}`,
      table_type: uppercaseFirst(item.table_type),
      stick_quantity: item.stick_quantity,
      ball_quantity: item.ball_quantity,
      price: item.price,
      status: uppercaseFirst(String(item.status)),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      selected: false,
    }));
    console.log(tables.value);
  } else {
    console.error("Error fetching table data:", error.value);
  }
});

// Helper function to uppercase first letter
const uppercaseFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Computed property to filter tables based on search query
const filteredTables = computed(() => {
  return tables.value.filter((table) => {
    return (
      table.id.toString().includes(searchQuery.value) ||
      table.table_type
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      table.price.toString().includes(searchQuery.value) ||
      table.status.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});
</script>

<style scoped></style>
