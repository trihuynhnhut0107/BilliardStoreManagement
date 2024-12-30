<template>
  <tr class="edit-form-row bg-yellow-50 border-2 border-yellow-300">
    <!-- Editable Cells Row -->
    <td v-for="column in editableColumns" :key="column.key" class="p-2">
      <!-- Regular input for all columns -->
      <input v-model="editableRow[column.key]" type="text" :placeholder="column.label" :disabled="column.key === 'id'"
        class="w-full p-2 border border-gray-300 rounded text-center" />
    </td>
  </tr>

  <!-- Action Buttons Row -->
  <tr class="edit-form-row bg-yellow-50 border-2 border-yellow-300">
    <td colspan="100%" class="p-2 text-right">
      <button type="button" @click="submitEdit" class="py-[6px] px-4 bg-green-500 text-white rounded mx-2">
        Save
      </button>
      <button type="button" @click="cancelEdit" class="py-[6px] px-4 ml-2 border border-gray-300 rounded mx-2">
        Cancel
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["updateRow", "cancelEdit"]);

let editableRow = { ...props.row };

// Prepare editable columns based on the passed props
const editableColumns = computed(() => {
  return props.columns.map((column) => ({
    key: column.key,
    label: column.label,
    type: column.type || "text", // Default to text if no type specified
  }));
});

const submitEdit = () => {
  emit("updateRow", editableRow);
};

const cancelEdit = () => {
  emit("cancelEdit");
};
</script>

<style scoped>
.edit-form-row {
  transition: background-color 0.3s, border-color 0.3s;
}

.edit-form-row input {
  min-width: 100px;
}

.edit-form-row td {
  padding: 8px;
}

button {
  min-width: 80px;
}
</style>
