<template>
    <div class="flex flex-col gap-4">
        <div class="flex justify-between items-center bg-white w-full py-2 px-10 rounded"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <h1 class="font-bold text-xl">Add New Staff</h1>
        </div>
        <div class="bg-white rounded-lg h-fit w-full px-10 py-3 flex justify-between"
            style="box-shadow: 0px 0px 3px #a4a4a4">
            <div class="flex flex-col gap-2">
                <div>
                    <input type="text" id="name"
                        class="bg-transparent w-fit h-fit text-[#3A6351] font-semibold text-xl name" placeholder="Name">
                </div>

                <div>
                    <label for="id">ID: </label>
                    <input type="text" v-model="formData.id" />
                </div>

                <div>
                    <label for="startDate">Start date: </label>
                    <input type="text" v-model="formData.startDate" />
                </div>

                <div>
                    <label for="role">Role: </label>
                    <input type="text" v-model="formData.role" />
                </div>

                <div>
                    <label for="salary">Salary: </label>
                    <input type="text" v-model="formData.salary" />
                </div>

                <div>
                    <label for="workTime">Work time: </label>
                    <input type="text" v-model="formData.workTime" />
                </div>

                <div>
                    <label for="status">Status: </label>
                    <input type="text" v-model="formData.status" />
                </div>

                <div>
                    <label for="phoneNumber">Phone number: </label>
                    <input type="text" v-model="formData.phoneNumber" />
                </div>

                <div class="text-[#3A6351] font-medium">
                    <label for="accountableType">Accountable type: </label>
                    <input type="text" v-model="formData.accountableType" />
                </div>

                <div>
                    <label for="email">Email: </label>
                    <input type="email" v-model="formData.email" />
                </div>

                <div>
                    <label for="password">Password: </label>
                    <input type="password" v-model="formData.password" />
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

const formData = ({
    name: '',
    id: '',
    startDate: '',
    role: '',
    salary: '',
    workTime: '',
    status: '',
    phoneNumber: '',
    accountableType: '',
    email: '',
    password: '',
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
    text-indent: 10px;
}
</style>