<template>
    <div class="flex flex-col gap-4">
        <div class="flex items-center bg-white w-full py-2 px-10 rounded gap-6" style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/tablemanagement" class="text-[#3A6351] font-medium text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
            </NuxtLink>
            <h1 class="font-bold text-xl">Create Bill</h1>
        </div>
        <div class="bg-white rounded-lg h-fit w-full px-10 py-3 flex justify-between items-center"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <div>
                <div class="flex gap-4 text-[13px]">
                    <label class="w-full">Create date:</label>
                    <label class="w-full"> {{ dateTimeNow }}</label>
                </div>
                <div class="flex flex-col  leading-tight text-[13px] min-w-[350px]">
                    <h3 class="font-semibold text-xl py-2">Customer</h3>
                    <div class="flex items-center gap-2">
                        <label for="id" class="w-full">CustomerID:
                        </label>
                        <input id="id" v-model="customerData.id" required type="text" placeholder="CustomerID"
                            class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                    </div>
                    <div class="flex items-center gap-2">
                        <label for="name" class="w-full">Name:
                        </label>
                        <input id="name" v-model="customerData.name" type="text" required placeholder="Name"
                            class="w-full p-1 rounded-lg indent-2.5 bg-transparent" />
                    </div>
                    <div class="flex items-center gap-2">
                        <label for="phone_number" class="w-full">Phone number: </label>
                        <input id="phone_number" v-model="customerData.phone_number" type="text" required
                            placeholder="Phone number" class="w-full p-1 rounded-lg indent-2.5 bg-transparent" />
                    </div>
                    <div class="flex items-center gap-2">
                        <label for="email" class="w-full">Email: </label>
                        <input id="email" v-model="customerData.email" type="text" required placeholder="Email"
                            class="w-full p-1 rounded-lg indent-2.5 bg-transparent" />
                    </div>
                </div>
                <hr>
                <div class="flex flex-col leading-tight text-[13px] min-w-[350px]">
                    <h3 class="font-semibold text-xl py-2">Table</h3>
                    <div class="flex items-center gap-2">
                        <label for="id" class="w-full">TableID: </label>
                        <input id="id" v-model="tableData.id" type="number" required placeholder="TableID"
                            class="w-full p-1 rounded-lg indent-2.5 bg-transparent" />
                    </div>
                    <input v-model="tableData.date" required type="date"
                        class="w-full p-1 rounded-lg text-sm bg-transparent" />
                    <div class="flex items-center gap-2">
                        <label for="start_time" class="w-full">Start time:
                        </label>
                        <input id="start_time" v-model="tableData.start_time" required type="time"
                            class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                    </div>
                    <div class="flex items-center gap-2">
                        <label for="end_time" class="w-full">End time:
                        </label>
                        <input id="end_time" v-model="tableData.end_time" required type="time"
                            class="w-full p-1 rounded-lg indent-2.5 text-sm bg-transparent" />
                    </div>
                    <div class="flex items-center gap-2 py-1">
                        <label class="w-full">Duration:
                        </label>
                        <label class="w-full">{{ tableData.duration.hours }} hours {{ tableData.duration.minutes }}
                            minutes</label>
                    </div>
                </div>
                <hr>
                <div class="flex flex-col leading-tight text-[13px] min-w-[350px]">
                    <h3 class="font-semibold text-xl py-2">Menu</h3>
                    <div class="flex items-center gap-2">
                        <label for="id" class="w-full">Menu: </label>
                        <input id="id" v-model="menuData.id" type="number" required
                            class="w-full p-1 rounded-lg indent-2.5 bg-transparent" />
                    </div>
                    <div class="flex items-center gap-2">
                        <label for="quantity" class="w-full">Quantity: </label>
                        <input id="quantity" v-model="menuData.quantity" type="number" required
                            class="w-full p-1 rounded-lg indent-2.5 bg-transparent" />
                    </div>
                </div>

            </div>
        </div>
        <div class="flex justify-end items-center gap-2 bg-white w-full py-2 px-10 rounded"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/tablemanagement" class="w-fit bg-[#3A6351] py-1 px-4 text-white text-sm font-medium rounded">
                Cancel</NuxtLink>
            <button @click="createBill"
                class="w-fit text-[#3A6351] py-1 px-4 bg-white text-sm font-medium rounded border border-[#3A6351] box-border">Create</button>
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

const dateTimeNow = computed(() => {
    const date = new Date();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
});

const customerData = ref({
    id: '1',
    name: '',
    email: '',
    phone_number: ''
});

const tableData = ref({
    id: '1',
    date: '',
    start_time: '',
    end_time: '',
    duration: {
        hours: 0,
        minutes: 0,
    }
});

const menuData = ref({
    id: '1',
    quantity: 1,
});

const staffID = ref('');

const formatDateTime = (date, time) => {
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}:00 ${month}/${day}/${year}`;
};

const getBillDetails = () => {
    const details = [];

    // Add table details
    if (tableData.value.date && tableData.value.start_time && tableData.value.end_time) {
        details.push({
            itemType: "BilliardTable",
            itemId: parseInt(tableData.value.id),
            start_time: formatDateTime(tableData.value.date, tableData.value.start_time),
            end_time: formatDateTime(tableData.value.date, tableData.value.end_time)
        });
    }

    // Add menu details
    if (menuData.value.id && menuData.value.quantity) {
        details.push({
            itemType: "MenuItem",
            itemId: parseInt(menuData.value.id),
            quantity: parseInt(menuData.value.quantity)
        });
    }

    return details;
};

const getCustomerById = async () => {
    const data = await $fetch(`http://localhost:8080/v1/api/customer-manage/customer/${customerData.value.id}`, {
        method: 'GET',
        onResponse({ response }) {
            if (response.status !== 200 && response.status !== 201) {
                customerData.value.name = '';
                customerData.value.email = '';
                customerData.value.phone_number = '';
                toast.error(response._data.message);
            }
        }
    });

    if (data && data.metadata) {
        customerData.value.name = data.metadata.name;
        customerData.value.email = data.metadata.email;
        customerData.value.phone_number = data.metadata.phone_number;
    }


};

watch(() => customerData.value.id, async (newID) => {
    if (newID) {
        await getCustomerById();
    } else {
        customerData.value.name = '';
        customerData.value.email = '';
        customerData.value.phone_number = '';
    }
}, { immediate: true });

watch(() => {
    return {
        start_time: tableData.value.start_time,
        end_time: tableData.value.end_time
    };
}, ({ start_time, end_time }) => {
    if (start_time && end_time) {
        if (start_time > end_time) {
            alert('Start time must be before end time');
            tableData.value.start_time = '';
            tableData.value.end_time = '';
        }
    }
}, { immediate: true });

onMounted(async () => {
    staffID.value = localStorage.getItem('staffID');
    console.log(staffID.value);
});

const createBill = async () => {
    const billDetails = getBillDetails();

    if (billDetails.length === 0) {
        toast.error('Please fill in all required fields', {
            autoClose: 3000,
        });
        return;
    }

    console.log(JSON.stringify({
        customer_id: customerData.value.id,
        staff_id: staffID.value,
        bill_details: billDetails
    }));

    const data = await $fetch('http://localhost:8080/v1/api/bill-manage/create-bill', {
        method: 'POST',
        body: JSON.stringify({
            customer_id: customerData.value.id,
            staff_id: staffID.value,
            bill_details: billDetails
        }),
        onResponse({ response }) {
            if (response.status !== 200 && response.status !== 201) {
                toast.error(response._data.message);
            } else {
                toast.success('Bill created successfully');
                navigateTo("/billmanagement");
            }
        }
    });
}
</script>

<style>
hr {
    display: block;
    height: 0.5px;
    border: 0;
    border-top: 1px solid #c2bebe;
    margin: 8px 0;
    padding: 0;
    width: 270%;
}
</style>