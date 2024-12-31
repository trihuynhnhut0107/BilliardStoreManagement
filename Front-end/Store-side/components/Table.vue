<template>
  <div class="w-full border-collapse border-none">
    <table class="w-full border-collapse">
      <!-- Table Header -->
      <thead class="bg-white border-b border-gray-300">
        <tr>
          <th v-for="column in columns" :key="column.key" class="p-2">
            {{ column.label }}
          </th>
          <th v-show="canChange" class="p-2">Actions</th>
        </tr>
      </thead>

      <!-- Table Rows -->
      <tbody>
        <template v-for="(item, index) in filteredDataList" :key="item.id">
          <!-- Display Row -->
          <tr class="hover:bg-gray-200 bg-white" :class="{
            'bg-blue-50 border-blue-300 w-[80px]': selectedRow?.id === item.id,
          }" @dblclick="viewRow(item)">
            <td v-for="(value, key) in Object.entries(item).filter(
              ([key]) => key !== 'createdAt' && key !== 'updatedAt'
            )" :key="key" class="p-2 text-center align-middle w-[80px]">
              {{
                isNaN(value[1])
                  ? toUpperCase(value[1])
                  : Intl.NumberFormat("de-DE").format(value[1])
              }}
            </td>
            <td v-show="canChange" class="p-2 w-[80px] text-center">
              <button @click="editRow(item)" class="py-[6px] px-4 bg-blue-500 text-white rounded">
                Edit
              </button>
              <button @click="deleteRow(item)" class="py-[6px] px-4 ml-2 bg-red-500 text-white rounded">
                Delete
              </button>
            </td>
          </tr>

          <!-- Edit Row -->
          <EditRow v-if="selectedRow?.id === item.id" :row="selectedRow" :columns="columns" @updateRow="updateRow"
            @cancelEdit="cancelEdit" />
        </template>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="flex justify-center items-center mt-4 gap-2 w-full py-2 px-10 rounded bg-white">
      <button @click="props.handlePageChange('prev')"
        :class="{ 'opacity-50 cursor-not-allowed': props.currentPage === 1 }" class="px-3 py-2 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
      </button>
      <span class="mx-2">Page {{ props.currentPage }} of {{ props.totalPages }}</span>
      <button @click="props.handlePageChange('next')"
        :class="{ 'opacity-50 cursor-not-allowed': props.currentPage === props.totalPages }" class="px-3 py-2 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const dataList = defineModel();

const selectedRow = ref(null);

const emit = defineEmits(["updateRow", "deleteRow", "viewRow"]);

const toUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Extract column keys from the first row of the dataList (excluding 'createdAt' and 'updatedAt')
const columns = computed(() => {
  if (!dataList.value.length) return [];
  return Object.keys(dataList.value[0])
    .filter((key) => key !== "createdAt" && key !== "updatedAt")
    .map((key) => ({
      key,
      label: key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));
});

// Compute filtered data list
const filteredDataList = computed(() => {
  if (!dataList.value.length) return [];
  const keysToMatch = Object.keys(dataList.value[0]);
  return dataList.value.filter((item) =>
    keysToMatch.every((key) => key in item)
  );
});

// Define props for pagination
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  handlePageChange: {
    type: Function,
    required: true,
  },
  canChange: {
    type: Boolean,
    default: true,
  }
});

const editRow = (row) => {
  selectedRow.value = { ...row };
};

const updateRow = async (updatedRow) => {
  emit("updateRow", updatedRow, (result) => {
    if (result) {
      cancelEdit();
    }
  });
};

const deleteRow = (row) => {
  emit("deleteRow", row);
};

const viewRow = (row) => {
  emit("viewRow", row);
};

const cancelEdit = () => {
  selectedRow.value = null;
};
</script>
