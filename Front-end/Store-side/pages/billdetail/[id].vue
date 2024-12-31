<template>
    <div class="flex flex-col gap-4">
        <div class="flex items-center bg-white w-full py-2 px-10 rounded gap-6" style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/billmanagement" class="text-[#3A6351] font-medium text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
            </NuxtLink>
            <h1 class="font-bold text-xl">Bill {{ billID }} Detail</h1>
        </div>
        <div class="bg-white rounded-lg h-fit w-full px-10 py-3 flex flex-col justify-between"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <div>
                <div class="flex gap-2 text-[13px]">
                    <label class="w-full">Create date:</label>
                    <p class="w-full"> {{ createdDate }}</p>
                </div>
                <div class="flex gap-2 text-[13px] mt-1">
                    <label for="name" class="w-full ">Customer name:
                    </label>
                    <p class="w-full">{{ customerName
                        }}</p>
                </div>
                <hr>
                <!--  -->
                <div v-for="(bill, index) in billsDetail" :key="index" class="flex flex-col gap-2 text-[13px]">
                    <h3 class="font-semibold text-xl py-2">{{ bill.itemType }}</h3>
                    <div class="flex gap-2 text-[13px] mt-1">
                        <label class="w-full ">Item ID:</label>
                        <p class="w-full">{{ bill.item_id }}</p>
                    </div>
                    <div class="flex gap-2 text-[13px] mt-1">
                        <label class="w-full ">Date:</label>
                        <p class="w-full">{{ formatDate(bill.end_time) }}</p>
                    </div>
                    <div v-show="bill.itemType === 'BilliardTable'">
                        <div class="flex gap-2 text-[13px] mt-1">
                            <label class="w-full ">Start time:</label>
                            <p class="w-full">{{ formatTime(bill.start_time) }}</p>
                        </div>
                        <div class="flex gap-2 text-[13px] mt-1">
                            <label class="w-full ">End time:</label>
                            <p class="w-full">{{ formatTime(bill.end_time) }}</p>
                        </div>
                    </div>
                    <div class="flex gap-2 text-[13px] mt-1">
                        <label class="w-full ">Quantity:</label>
                        <p class="w-full">{{ bill.quantity }}</p>
                    </div>
                    <div class="flex justify-between gap-2 text-lg font-bold mt-1 text-red-500">
                        <label class="w-full ">Price:</label>
                        <p class="w-full">{{ bill.price }} VNĐ</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

definePageMeta({
    layout: 'home-layout'
});

const route = useRoute();

const billID = route.params.id;
const customerName = ref('');
const createdDate = ref('');
const billsDetail = ref([]);

const formatDate = (datetime) => {
    const [year, month, day] = datetime.split('T')[0].split('-');
    return `${month}/${day}/${year}`;
};

const formatTime = (datetime) => {
    const [hour, minute, second] = datetime.split('T')[1].split('.')[0].split(':');
    return `${hour}:${minute}:${second}`;
};

// Fetch Data
const getBillDetailByID = async () => {
    const data = await $fetch(`http://localhost:8080/v1/api/bill-manage/get-bill-detail/${billID}`, {
        method: 'GET',
    });
    customerName.value = data.metadata.customer_name;
    createdDate.value = data.metadata.created_at;
    billsDetail.value = data.metadata.bill_detail;
};

getBillDetailByID();
</script>

<style>
hr {
    width: 100%;
    height: 0.5px;
    border: 0;
    border-top: 1px solid #c2bebe;
    margin-top: 8px;
    margin-bottom: 8px;
}

label {
    max-width: 130px;
}
</style>