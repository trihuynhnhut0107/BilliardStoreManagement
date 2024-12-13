<template>
    <div class="flex flex-col gap-4">
        <div class="flex items-center bg-white w-full py-2 px-10 rounded gap-6" style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/staffmanagement" class="text-[#3A6351] font-medium text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
            </NuxtLink>
            <h1 class="font-bold text-xl">Staff Detail</h1>
        </div>
        <div class="bg-white rounded-lg h-fit w-full px-10 py-3 flex justify-between"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <div class="flex flex-col gap-2">
                <div>
                    <input type="text" id="name"
                        class="bg-transparent w-fit h-fit text-[#3A6351] font-semibold text-xl name" placeholder="Name">
                </div>

                <div class="flex gap-2">
                    <label>ID:</label>
                    <label>{{ staffId }}</label>
                </div>

                <div class="flex gap-2">
                    <label for="name">Name: </label>
                    <input type="text" id="name" v-model="formData.name" />
                </div>

                <div class="flex gap-2">
                    <label for="phoneNumber">Phone number: </label>
                    <input type="text" id="phoneNumber" v-model="formData.phoneNumber" />
                </div>

                <div class="flex gap-2">
                    <label for="role">Role: </label>
                    <select id="role" v-model="formData.role">
                        <option value="manager">Admin</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>

                <div class="flex gap-2">
                    <label for="startDate">Start date: </label>
                    <input type="password" id="startDate" v-model="formData.startDate" />
                </div>
            </div>
            <img src="https://placehold.co/150x200" />
        </div>
        <div class="flex justify-end items-center gap-2 bg-white w-full py-2 px-10 rounded"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <NuxtLink to="/staffmanagement" class="w-fit bg-[#3A6351] py-1 px-4 text-white text-sm font-medium rounded">
                Cancel</NuxtLink>
            <button
                class="w-fit text-[#3A6351] py-1 px-4 bg-white text-sm font-medium rounded border border-[#3A6351] box-border">Create</button>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'home-layout'
});


import { useRoute } from 'vue-router'

const route = useRoute()
const staffId = route.query.id
const formData = ({
    id: staffId,
    name: '',
    phoneNumber: '',
    role: '',
    startDate: '',
})
</script>

<style scoped>
.name::placeholder {
    color: #3A6351;
}

.name {
    text-indent: 0px;
}

input {
    text-indent: 5px;
}
</style>