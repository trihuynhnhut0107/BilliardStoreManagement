<template>
    <div class="bg-white rounded-lg h-fit w-full px-10 py-3 flex justify-between"
        style="box-shadow: 0px 0px 3px #a4a4a4">
        <div class="flex flex-col gap-2">
            <h3 class="text-[#3A6351] font-semibold text-2xl mb-2">{{ formData.name }}</h3>
            <p>ID: {{ formData.id }}</p>
            <p>Phone number: {{ formData.phoneNumber }}</p>
            <p>Role: {{ formData.role }}</p>
            <p>Start date: {{ formData.startDate }}</p>
        </div>
        <img src="https://placehold.co/150x200" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

definePageMeta({
    layout: 'home-layout'
});

const formData = ref({
    id: '',
    name: '',
    phoneNumber: '',
    role: '',
    startDate: '',
});

const staffID = ref('');

const uppercaseFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const getStaffData = async (staffID) => {
    const { data, error } = await useFetch(`http://localhost:8080/v1/api/staff-manage/staff/${staffID}`, {
        method: 'GET',
    });
    try {

        if (data.value.status !== 201 || !data.value) {
            toast.error('Failed to get staff data', { duration: 3000 });
        }

        const response = data.value.metadata;
        formData.value = {
            id: response.id,
            name: response.name,
            phoneNumber: response.phone_number,
            role: uppercaseFirst(response.role),
            startDate: new Date(response.createdAt).toLocaleDateString()
        };
    } catch (error) {

    }
};

onMounted(async () => {
    staffID.value = localStorage.getItem('staffID');
    await getStaffData(staffID.value);
    getStaffData(staffID.value);
});

</script>

<style scoped></style>