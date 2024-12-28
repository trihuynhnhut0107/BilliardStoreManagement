<template>
  <div class="w-full h-full p-6 overflow-y-auto max-h-[500px]">
    <table class="w-full border-collapse">
      <!-- Table Header -->
      <thead class="bg-gray-100 border-b border-gray-300">
        <tr>
          <th v-for="column in columns" :key="column.key" class="p-2">
            {{ column.label }}
          </th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>

      <!-- Table Rows -->
      <tbody>
        <template v-for="(item, index) in filteredDataList" :key="item.id">
          <!-- Display Row -->
          <tr
            class="hover:bg-green-400 bg-green-300 border-b border-gray-200"
            :class="{
              'bg-blue-50 border-blue-300': selectedRow?.id === item.id,
            }">
            <td
              v-for="(value, key) in Object.entries(item).filter(
                ([key]) => key !== 'createdAt' && key !== 'updatedAt'
              )"
              :key="key"
              class="p-2 text-center align-middle">
              {{
                isNaN(value[1])
                  ? value[1]
                  : Intl.NumberFormat("de-DE").format(value[1])
              }}
            </td>
            <td class="p-2 w-[80px] text-center">
              <button
                @click="editRow(item)"
                class="p-1 bg-blue-500 text-white rounded">
                Edit
              </button>
            </td>
          </tr>

          <!-- Edit Row -->
          <EditRow
            v-if="selectedRow?.id === item.id"
            :row="selectedRow"
            :columns="columns"
            @updateRow="updateRow"
            @cancelEdit="cancelEdit" />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const dataList = defineModel(); // Your data list for the table

const selectedRow = ref(null);

const emit = defineEmits(["updateRow"]);

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

const editRow = (row) => {
  selectedRow.value = { ...row };
};

const updateRow = async (updatedRow) => {
  emit("updateRow", updatedRow, (result) => {
    if (result) {
      cancelEdit();
      console.log(result);
    }
  });
};

const cancelEdit = () => {
  selectedRow.value = null;
};
</script>
