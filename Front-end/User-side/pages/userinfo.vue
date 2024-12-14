<template>
  <DefaultLayout>
    <div class="flex min-h-screen bg-gray-200">
      <div class="flex h-[100vh] w-1/4">
        <div class="flex flex-col mt-[10vh] h-auto w-full ml-[4vw]">
          <h1 class="text-2xl font-bold mb-[2vh]">Account Page</h1>
          <div class="flex text-xl font-weight-500 mb-[10vh]">
            <h2>Welcome! </h2>
            <h2 class="flex ml-[2vw] text-[#3A6351] font-bold">{{ userInfo.metadata.name }}</h2>
          </div>
          <div class="flex flex-col h-[40vh] text-xl font-weight-700 items-start space-y-[6vh]">
            <button class="hover:text-yellow-600">Account information</button>
            <button class="hover:text-yellow-600">Change password</button>
            <button class="hover:text-yellow-600">Logout</button>
          </div>
        </div>
      </div>

      <div class="flex h-[40vh] w-3/4 bg-white mt-[10vh] mr-[5vw] border-2 border-gray-300 rounded-xl shadow-md">
        <div class="flex flex-col ml-[2vw] w-1/2">
          <h2 class="flex text-3xl text-yellow-400 mt-[4vh] mb-[4vh] font-bold">{{ userInfo.metadata.name }}</h2>
          <h3 class="mb-[4vh]">ID: {{ userInfo.metadata.id }}</h3>
          <h3 class="mb-[4vh]">Email: {{ userInfo.metadata.email }}</h3>
          <h3 class="mb-[4vh]">Phone number: {{ userInfo.metadata.phone_number }}</h3>
        </div>
        <div class="flex w-[20vw] h-[20vh] ml-[8vw] mt-[8vh]">
          <img src="../public/Image/img_1.jpg" alt="User Avatar">
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '~/layout/default.vue'
import { computed } from 'vue';

// Get the user ID from localStorage
const customerID = localStorage.getItem('customerID')

// Fetch the user info using `useFetch`
const { data: userInfo, error, isPending } = useFetch(`http://localhost:8080/v1/api/customer-manage/customer/${customerID}`)

// Since the API data is under `metadata`, we can use that to bind values
const userData = computed(() => userInfo ? userInfo.metadata : {})

</script>
