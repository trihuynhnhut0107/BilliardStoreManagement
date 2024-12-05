<template>
  <div class="flex flex-col gap-6 flex-1">
    <!-- Search bar -->
    <div class="flex justify-between bg-white px-10 py-2">
      <h2 class="text-2xl font-bold text-nowrap">Table List</h2>
      <div class="flex items-center w-max rounded-2xl border px-3">
        <input
          placeholder="Search"
          v-model="searchQuery"
          class="outline-none border-none bg-transparent pr-20 text-xs" />
        <img src="../public/Search.svg" class="w-3 cursor-pointer" />
      </div>
      <div class="flex gap-4">
        <button
          @click="handleToggleCreatetable"
          class="cursor-pointer bg-[#3A6351] text-white rounded text-xs text-nowrap text-center px-2 font-bold">
          Add Table
        </button>
        <img
          @click="deleteSelectedTable"
          src="../public/Trash.svg"
          class="w-4 cursor-pointer" />
      </div>
    </div>
    <div class="relative bg-white">
      <div class="max-h-[300px] overflow-y-auto">
        <table class="w-full border-collapse border-none">
          <!-- table header -->
          <thead
            class="sticky top-0 bg-white border-b border-[#ECF0F2] border-solid">
            <tr>
              <th class="p-2 w-[50px]">
                <input
                  type="checkbox"
                  @change="selectAll"
                  v-model="selectAllChecked"
                  class="cursor-pointer rounded border-2 border-[#3A6351] checked:bg-[#3A6351] checked:border-[#3A6351] h-4 w-4" />
              </th>
              <th class="p-2 w-[80px]">ID</th>
              <th class="p-2 w-[150px]">Type</th>
              <th class="p-2 w-[100px]">Price</th>
              <th class="p-2 w-[100px]">Status</th>
              <th class="p-2 w-[80px]">Edit</th>
              <th class="p-2 w-[80px]">Delete</th>
            </tr>
          </thead>

          <!-- table row -->
          <tbody>
            <tr
              v-for="(table, index) in filteredTables"
              :key="index"
              class="hover:bg-gray-50 border-b border-[#ECF0F2] last:border-none">
              <td class="p-2 w-[50px] text-center align-middle">
                <input
                  type="checkbox"
                  v-model="table.selected"
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
              <td
                class="p-2 w-[100px] text-center align-middle"
                :class="{
                  'text-[#00229D]': table.status === 'Repairing',
                  'text-[#FF0000]': table.status === 'Unavailable',
                  'text-[#0CB000]': table.status === 'Available',
                }">
                {{ table.status }}
              </td>
              <td class="p-2 w-[80px] text-center align-middle">
                <img
                  @click="editTable(table.id)"
                  src="../public/Edit.svg"
                  class="cursor-pointer w-4 mx-auto" />
              </td>
              <td class="p-2 w-[80px] text-center align-middle">
                <img
                  @click="deleteTable(table.id)"
                  src="../public/Trash.svg"
                  class="cursor-pointer w-4 mx-auto" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Create table form -->
  <div>
    <Transition name="nested">
      <div
        v-if="addTableClicked"
        name="outer"
        class="absolute top-[10%] right-1/2">
        <hr />
        <form
          @submit.prevent
          class="w-full max-w-sm flex flex-col justify-center gap-2 rounded-lg shadow-[0px_0px_5px_green] bg-white p-4 px-11">
          <h2 class="text-center font-bold text-xl text-[#3A6351]">
            Create new table
          </h2>
          <hr />
          <label class="font-bold underline text-lg text-[#3A6351]"
            >TableID: {{ newTableId(tables) }}</label
          >
          <div class="flex justify-between gap-6 w-full max-w-sm">
            <div>
              <label for="stick_quantity" class="font-semibold"
                >Stick quantity</label
              >
              <div>
                <input
                  v-model="createTableData.stick_quantity"
                  id="stick_quantity"
                  type="text"
                  placeholder="Stick quantity"
                  class="w-full rounded-md indent-1 border border-gray-700 h-9" />
              </div>
            </div>
            <div>
              <label for="ball_quantity" class="font-semibold"
                >Ball quantity</label
              >
              <div>
                <input
                  v-model="createTableData.ball_quantity"
                  id="ball_quantity"
                  type="text"
                  placeholder="Ball quantity"
                  class="w-full rounded-md indent-1 border border-gray-700 h-9" />
              </div>
            </div>
          </div>
          <div>
            <label for="table_type" class="font-semibold">Table type</label>
            <div>
              <input
                v-model="createTableData.table_type"
                id="table_type"
                type="text"
                placeholder="Table type"
                class="w-full rounded-md indent-1 border border-gray-700 h-9" />
            </div>
          </div>
          <div>
            <label for="price" class="font-semibold">Price</label>
            <div>
              <input
                v-model="createTableData.price"
                id="price"
                type="text"
                placeholder="Price"
                class="w-full rounded-md indent-1 border border-gray-700 h-9" />
            </div>
          </div>
          <div>
            <label for="status" class="font-semibold block">Status</label>
            <select
              v-model="createTableData.status"
              name="status"
              id="status"
              class="p-1 font-semibold"
              :class="{
                'text-[#00229D]': createTableData.status === 'Repairing',
                'text-[#FF0000]': createTableData.status === 'Unavailable',
                'text-[#0CB000]': createTableData.status === 'Available',
              }">
              <option class="text-[#0CB000]" value="Available" selected>
                Available
              </option>
              <option class="text-[#FF0000]" value="Unavailable">
                Unavailable
              </option>
              <option class="text-[#00229D]" value="Repairing">
                Repairing
              </option>
            </select>
          </div>
          <div class="flex justify-end gap-4">
            <button
              @click="handleToggleCreatetable"
              class="max-w-64 text-[#3A6351] border border-[#3A6351] bg-white font-medium rounded-md text-center py-2 px-6">
              Cancel
            </button>
            <button
              @click="handleCreateTable(newTableId(tables))"
              class="max-w-64 bg-[#3A6351] text-white font-medium rounded-md text-center py-2 px-6">
              Create
            </button>
          </div>
        </form>
      </div>
    </Transition>
  </div>

  <!-- Edit table form -->
  <div>
    <Transition name="nested">
      <div
        v-if="editTableClicked"
        name="outer"
        class="absolute top-1/5 right-0">
        <hr />
        <form
          @submit.prevent
          class="w-full max-w-sm flex flex-col justify-center gap-2 rounded-lg shadow-[0px_0px_5px_green] bg-white p-4 px-11">
          <h2 class="text-center font-bold text-xl text-[#3A6351]">
            Edit table
          </h2>
          <hr />
          <label class="font-bold underline text-lg text-[#3A6351]"
            >Table ID: {{ currentEditTableId }}</label
          >
          <div class="flex justify-between gap-6 w-full max-w-sm">
            <div>
              <label for="stick_quantity" class="font-semibold"
                >Stick quantity</label
              >
              <div>
                <input
                  v-model="editTableData.stick_quantity"
                  id="stick_quantity"
                  type="text"
                  placeholder="Stick quantity"
                  class="w-full rounded-md indent-1 border border-gray-700 h-9" />
              </div>
            </div>
            <div>
              <label for="ball_quantity" class="font-semibold"
                >Ball quantity</label
              >
              <div>
                <input
                  v-model="editTableData.ball_quantity"
                  id="ball_quantity"
                  type="text"
                  placeholder="Ball quantity"
                  class="w-full rounded-md indent-1 border border-gray-700 h-9" />
              </div>
            </div>
          </div>
          <div>
            <label for="table_type" class="font-semibold">Table type</label>
            <div>
              <input
                v-model="editTableData.table_type"
                id="table_type"
                type="text"
                placeholder="Table type"
                class="w-full rounded-md indent-1 border border-gray-700 h-9" />
            </div>
          </div>
          <div>
            <label for="price" class="font-semibold">Price</label>
            <div>
              <input
                v-model="editTableData.price"
                id="price"
                type="text"
                placeholder="Price"
                class="w-full rounded-md indent-1 border border-gray-700 h-9" />
            </div>
          </div>
          <div>
            <label for="status" class="font-semibold block">Status</label>
            <select
              v-model="editTableData.status"
              name="status"
              id="status"
              class="p-1 font-semibold"
              :class="{
                'text-[#00229D]': editTableData.status === 'Repairing',
                'text-[#FF0000]': editTableData.status === 'Unavailable',
                'text-[#0CB000]': editTableData.status === 'Available',
              }">
              <option class="text-[#0CB000]" value="Available" selected>
                Available
              </option>
              <option class="text-[#FF0000]" value="Unavailable">
                Unavailable
              </option>
              <option class="text-[#00229D]" value="Repairing">
                Repairing
              </option>
            </select>
          </div>
          <div class="flex justify-end gap-4">
            <button
              @click="handleToggleEdittable"
              class="max-w-64 text-[#3A6351] border border-[#3A6351] bg-white font-medium rounded-md text-center py-2 px-6">
              Cancel
            </button>
            <button
              @click="handleEditTable"
              class="max-w-64 bg-[#3A6351] text-white font-medium rounded-md text-center py-2 px-6">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, computed, onMounted } from "vue";

definePageMeta({
  layout: "sidebar",
});

const tables = ref([]);
const searchQuery = ref("");

const { data, error, status } = useFetch(
  "http://localhost:8080/v1/api/table-manage/get-all-tables"
);
console.log(data.value);

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

// Function to refetch data
const refetchData = async () => {
  const { data: newData, error } = await useFetch(
    "http://localhost:8080/v1/api/table-manage/get-all-tables"
  );

  if (newData.value && newData.value.status === 201) {
    tables.value = newData.value.metadata.map((item) => ({
      id: item.id,
      table_type: uppercaseFirst(item.table_type),
      stick_quantity: item.stick_quantity,
      ball_quantity: item.ball_quantity,
      price: item.price,
      status: uppercaseFirst(item.status),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      selected: false,
    }));
  } else {
    console.error("Error fetching table data:", error.value);
  }
};

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

const selectAllChecked = ref(false);

const selectAll = () => {
  const isSelected = selectAllChecked.value;
  tables.value.forEach((table) => {
    table.selected = isSelected;
  });
};

const deleteSelectedTable = async () => {
  try {
    const selectedTables = tables.value.filter((table) => table.selected);

    if (selectedTables.length === 0) {
      alert("Please select at least one table to delete");
      return;
    }

    const confirmDelete = confirm(
      `Are you sure you want to delete ${selectedTables.length} selected table(s)?`
    );
    if (!confirmDelete) return;

    for (const table of selectedTables) {
      const { data, error } = await useFetch(
        "http://localhost:8080/v1/api/table-manage/delete-table",
        {
          method: "POST",
          body: JSON.stringify({
            table_id: table.id,
          }),
        }
      );

      if (data.value.status !== 201) {
        console.log(`Error deleting table ${table.id}:`, error);
      }
    }

    toast.success("Selected tables deleted successfully", {
      autoClose: 3000,
    });
    selectAllChecked.value = false;
    // Refetch data after deletion
    refetchData();
  } catch (err) {
    toast.error("Error deleting selected tables", {
      autoClose: 3000,
    });
    console.error("Error deleting selected tables:", err);
  }
};

const deleteTable = async (id) => {
  try {
    const confirmDelete = confirm(
      `Are you sure you want to delete table ${id}?`
    );
    if (!confirmDelete) return;

    const { data, error } = await useFetch(
      "http://localhost:8080/v1/api/table-manage/delete-table",
      {
        method: "POST",
        body: JSON.stringify({
          table_id: id,
        }),
      }
    );

    if (data.value.status !== 201) {
      console.log("Delete table error !");
      return;
    }

    toast.success(`Delete table ${id} successful`, {
      autoClose: 3000,
    });
    console.log("Delete table successful");
    // Refetch data after deletion
    refetchData();
  } catch (err) {
    toast.error("Error deleting table", {
      autoClose: 3000,
    });
    console.log(err);
  }
};

//Create table
const addTableClicked = ref(false);

const handleToggleCreatetable = () => {
  addTableClicked.value = !addTableClicked.value;
  createTableData.value = {
    table_type: "",
    stick_quantity: "",
    ball_quantity: "",
    price: "",
    status: "Available",
  };
};

const validateNumber = (number) => {
  let re = /^[0-9]{1,2}$/;
  return re.test(number);
};

const validatePrice = (price) => {
  let re = /^[0-9]{1,10}$/;
  return re.test(price);
};

const isValidCreateInput = () => {
  if (!createTableData.value.ball_quantity) {
    toast.error("Ball quantity is required");
    return false;
  }
  if (!createTableData.value.stick_quantity) {
    toast.error("Stick quantity is required");
    return false;
  }
  if (!createTableData.value.price) {
    toast.error("Price is required");
    return false;
  }
  if (!createTableData.value.status) {
    toast.error("Status is required");
    return false;
  }
  if (!createTableData.value.table_type) {
    toast.error("Table type is required");
    return false;
  }
  if (!validateNumber(createTableData.value.ball_quantity)) {
    toast.error("Please enter a valid ball quantity");
    return false;
  }
  if (!validateNumber(createTableData.value.stick_quantity)) {
    toast.error("Please enter a valid stick quantity");
    return false;
  }
  if (!validatePrice(createTableData.value.price)) {
    toast.error("Please enter a valid price");
    return false;
  }
  return true;
};

const createTableData = ref({
  table_type: "",
  stick_quantity: "",
  ball_quantity: "",
  price: "",
  status: "Available",
});

const newTableId = (tables) => {
  if (!tables.length) return 0;
  return tables.at(-1).id + 1;
};

const handleCreateTable = async (id) => {
  let check = isValidCreateInput();
  if (!check) {
    return;
  }

  try {
    const { data, error } = await useFetch(
      "http://localhost:8080/v1/api/table-manage/create-new-table",
      {
        method: "POST",
        body: JSON.stringify(createTableData.value),
      }
    );

    if (data.value.status !== 201) {
      console.log("Create table error !");
      return;
    }

    toast.success(`Create table ${id} successful`, {
      autoClose: 3000,
    });
    console.log(`Create table ${id} successful`);
    // Refetch data after creation
    refetchData();
  } catch (err) {
    toast.error(`Create table ${id} error`, {
      autoClose: 3000,
    });
    console.log(err);
  } finally {
    handleToggleCreatetable();
  }
};

//Edit table
const editTableClicked = ref(false);
const currentEditTableId = ref(0);

const editTableData = ref({
  table_type: "",
  stick_quantity: "",
  ball_quantity: "",
  price: "",
  status: "Available",
});

const handleToggleEdittable = () => {
  editTableClicked.value = !editTableClicked.value;
  if (!editTableClicked.value) {
    // Reset form when closing
    editTableData.value = {
      table_type: "",
      stick_quantity: "",
      ball_quantity: "",
      price: "",
      status: "Available",
    };
  }
};

const editTable = async (id) => {
  // Find the table data
  const tableToEdit = tables.value.find((table) => table.id === id);
  if (!tableToEdit) {
    toast.error("Table not found");
    return;
  }

  // Set the current edit ID
  currentEditTableId.value = id;

  // Populate the form with current values
  editTableData.value = {
    table_type: tableToEdit.table_type,
    stick_quantity: tableToEdit.stick_quantity,
    ball_quantity: tableToEdit.ball_quantity,
    price: tableToEdit.price,
    status: tableToEdit.status,
  };

  // Show the edit form
  editTableClicked.value = true;
};

const isValidEditInput = () => {
  if (!editTableData.value.ball_quantity) {
    toast.error("Ball quantity is required");
    return false;
  }
  if (!editTableData.value.stick_quantity) {
    toast.error("Stick quantity is required");
    return false;
  }
  if (!editTableData.value.price) {
    toast.error("Price is required");
    return false;
  }
  if (!editTableData.value.status) {
    toast.error("Status is required");
    return false;
  }
  if (!editTableData.value.table_type) {
    toast.error("Table type is required");
    return false;
  }
  if (!validateNumber(editTableData.value.ball_quantity)) {
    toast.error("Please enter a valid ball quantity");
    return false;
  }
  if (!validateNumber(editTableData.value.stick_quantity)) {
    toast.error("Please enter a valid stick quantity");
    return false;
  }
  if (!validatePrice(editTableData.value.price)) {
    toast.error("Please enter a valid price");
    return false;
  }
  return true;
};

const handleEditTable = async () => {
  if (!isValidEditInput()) {
    return;
  }

  try {
    const { data, error } = await useFetch(
      "http://localhost:8080/v1/api/table-manage/update-table",
      {
        method: "POST",
        body: JSON.stringify({
          table_id: currentEditTableId.value,
          ...editTableData.value,
        }),
      }
    );

    if (data.value.status !== 201) {
      toast.error("Error updating table");
      return;
    }

    toast.success(`Table ${currentEditTableId.value} updated successfully`, {
      autoClose: 3000,
    });
    handleToggleEdittable(); // Close the form
    // Refetch data after update
    refetchData();
  } catch (err) {
    toast.error("Error updating table");
    console.error("Error updating table:", err);
  }
};
</script>

<style>
.outer,
.inner {
  background: #eee;
  padding: 30px;
  min-height: 100px;
}

.inner {
  background: #ccc;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-active .inner {
  transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0.001;
}

/* Custom scrollbar styles */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #3a6351;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #2a4a3c;
}
</style>
