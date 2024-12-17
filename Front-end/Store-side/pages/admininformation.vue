<template>
    <div class="bg-white rounded-lg h-fit w-full px-10 py-3 flex justify-between"
        style="box-shadow: 0px 0px 3px #a4a4a4">
        <div class="flex flex-col gap-2">
            <h3 class="text-[#3A6351] font-semibold text-2xl">{{ formData.name }}</h3>
            <p>ID: {{ formData.id }}</p>
            <p>Role: {{ formData.role }}</p>
            <p>Start date: {{ formData.salary }}</p>
            <p>Salary: {{ formData.salary }}</p>
            <p>Work time: {{ formData.workTime }}</p>
        </div>
        <img src="https://placehold.co/150x200" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
    layout: 'home-layout'
});

const formData = ref({
    name: 'Tony',
    id: '01',
    role: 'Manager',
    startDate: '30/10/2024',
    salary: '$3/H',
    workTime: '120H',
});
</script>

<style scoped></style>