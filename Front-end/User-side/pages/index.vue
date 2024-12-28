<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-full h-full flex flex-row justify-center items-center">
      <div
        class="flex flex-row justify-center items-center py-6 border-b-4 border-black w-1/3">
        <h1 class="text-4xl">Table</h1>
      </div>
    </div>
    <div class="w-full h-full py-6 px-12">
      <div class="w-full h-full grid grid-flow-row grid-cols-4 gap-2">
        <div v-for="item in allTableInfo.metadata" :key="item.id">
          <div
            class="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out">
            <img src="/Image/game-5394589_1920.jpg" alt="" class="w-fit" />
            <div class="w-full flex flex-row justify-between items-center">
              <div class="flex flex-col">
                <h1>Table number: {{ item.id }}</h1>
                <h1>Table type: {{ item.table_type }}</h1>
                <p>
                  Price:
                  {{ Intl.NumberFormat("de-DE").format(item.price) }} VND/hour
                </p>
              </div>
              <div
                class="flex flex-col space-y-4 justify-around items-center py-2">
                <div>
                  <p
                    :class="[
                      item.status === 'Available'
                        ? 'bg-green-500'
                        : 'bg-red-600',
                      'px-2 py-1 text-white rounded',
                    ]">
                    {{ item.status }}
                  </p>
                </div>
                <div>
                  <NuxtLink
                    :to="`/booking/${item.id}`"
                    class="px-6 py-1 bg-green-500 text-white rounded">
                    Book
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";

definePageMeta({
  layout: "main",
});
const isMessageOpen = ref(false);
const cookie = Number(useCookie("customerID").value);

const bookingDialogActive = ref(false);
const confirmPurchasingPost = ref(false);
const currentTable = ref(-1);

const currentTableID = ref(-1);
const isDialogOpen = ref(false);

const allTableInfo = ref([]);

if (!useCookie("customerID").value) {
  navigateTo("/landing");
}

const getAllTable = async () => {
  const data = await $fetch(
    "http://localhost:8080/v1/api/table-manage/get-all-tables",
    {
      onResponseError({ response }) {
        toast.error(response._data.message);
      },
    }
  );
  allTableInfo.value = data;
};

await getAllTable();

function toggleDialog(tableID: number) {
  currentTableID.value = tableID;
  isDialogOpen.value = true;
}

function showBookingDialog(postProductID: number) {
  currentTable.value = postProductID;
  bookingDialogActive.value = true;
}
</script>

<style scoped></style>
