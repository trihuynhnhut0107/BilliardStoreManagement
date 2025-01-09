<template>
  <div class="flex flex-col gap-4">
    <div
      class="flex items-center bg-white w-full py-2 px-10 rounded gap-6"
      style="box-shadow: 0px 0px 3px #a4a4a4">
      <NuxtLink to="/billmanagement" class="text-[#3A6351] font-medium text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
        </svg>
      </NuxtLink>
      <h1 class="font-bold text-xl">Bill {{ billID }} Detail</h1>
    </div>
    <div
      class="bg-white rounded-lg w-full px-10 py-3 flex flex-col justify-between"
      style="box-shadow: 0px 0px 3px #a4a4a4">
      <div class="w-full flex-col">
        <div class="flex gap-2 text-[13px]">
          <label class="w-full">Create date:</label>
          <p class="w-full">{{ createdDate }}</p>
        </div>
        <div class="flex gap-2 text-[13px] mt-1">
          <label for="name" class="w-full">Customer name: </label>
          <p class="w-full">{{ customerName }}</p>
        </div>
      </div>
      <div class="w-full flex-col">
        <div
          v-for="(bill, index) in billsDetail"
          :key="index"
          class="flex flex-col gap-2 text-[13px] overflow-hidden w-full">
          <h3 class="font-semibold text-xl py-2">{{ bill.itemType }}</h3>
          <div
            v-if="bill.itemType !== 'MenuItem'"
            class="flex gap-2 text-[13px] mt-1">
            <label class="w-full">Item ID:</label>
            <p class="w-full">{{ bill.id }}</p>
          </div>
          <div v-if="bill.itemType === 'BilliardTable'">
            <div class="flex gap-2 text-[13px] mt-1">
              <label class="w-full">Table Type:</label>
              <p class="w-full">{{ bill.billiardTable.table_type }}</p>
            </div>
            <div class="flex gap-2 text-[13px] mt-1">
              <label class="w-full">Start Time:</label>
              <p class="w-full">{{ bill.start_time }}</p>
            </div>
            <div class="flex gap-2 text-[13px] mt-1">
              <label class="w-full">End Time:</label>
              <p class="w-full">{{ bill.end_time }}</p>
            </div>
          </div>
          <div v-if="bill.itemType === 'MenuItem'">
            <div class="flex gap-2 text-[13px] mt-1">
              <label class="w-full">Menu Item:</label>
              <p class="w-full">{{ bill.menuItem.name }}</p>
            </div>
          </div>
          <div class="flex gap-2 text-[13px] mt-1">
            <label class="w-full">Quantity:</label>
            <p class="w-full">{{ bill.quantity }}</p>
          </div>
          <div
            class="flex gap-2 text-[13px] mt-1">
            <label class="w-full">Price:</label>
            <p class="w-full">{{ bill.price }} VNĐ</p>
          </div>
        </div>
      </div>
      <div class="overflow-y-auto max-h-[300px]">
        <!-- Total Price Section with full width -->
        <div
          class="flex gap-2 text-[13px] mt-1">
          <label class="w-full">Total Price:</label>
          <p class="w-full">{{ totalPrice }} VNĐ</p>
        </div>
        <div
          class="flex gap-2 text-[13px] mt-1">
          <label class="w-full">Total Discount:</label>
          <p class="w-full">{{ totalDiscount }} VNĐ</p>
        </div>
        <div
          class="flex gap-2 text-[13px] mt-1">
          <label class="w-full">Promotion name:</label>
          <p class="w-full">{{ promotion }}</p>
        </div>
        <div
          class="flex gap-2 text-[16px] mt-1 font-semibold">
          <label class="w-full">Checkout price:</label>
          <p class="w-full">{{ checkoutPrice }} VNĐ</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "home-layout",
});

const route = useRoute();
const billID = route.params.id;
const customerName = ref("");
const createdDate = ref("");
const billsDetail = ref([]);
const totalPrice = ref(0);
const totalDiscount = ref(0);
const promotion = ref("");
const checkoutPrice = ref(0);

const formatDate = (datetime) => {
  const [year, month, day] = datetime.split("T")[0].split("-");
  return `${month}/${day}/${year}`;
};

const formatTime = (datetime) => {
  const [hour, minute] = datetime.split("T")[1].split(":");
  return `${hour}:${minute}`;
};

const getBillDetailByID = async () => {
  const data = await $fetch(
    `http://localhost:8080/v1/api/bill-manage/get-bill-detail/${billID}`,
    {
      method: "GET",
    }
  );
  customerName.value = data.metadata.customer_name;
  createdDate.value = data.metadata.created_at;
  billsDetail.value = data.metadata.bill_detail;
  totalPrice.value = data.metadata.total_price;
  totalDiscount.value = data.metadata.total_discount;
  promotion.value = data.metadata.promotion;
  checkoutPrice.value = data.metadata.checkout_price;
};

getBillDetailByID();
</script>

<style>
label {
  max-width: 130px;
}
</style>
