<template>
    <div class="flex gap-10 bg-[#D9D9D9] w-screen h-screen p-20">            
        <div class="bg-white text-nowrap rounded-md py-6 pl-10 pr-[150px] w-fit h-fit">
            <h1 class="text-[#3A6351] text-2xl mb-6">Manage</h1>
            <ul class="flex flex-col gap-6">
                <div class="flex gap-4">
                    <img src="../public/User.svg" alt="." class="w-4">
                    <NuxtLink class="text-[#3A6351] text-sm" to="/staff" >Staff Information</NuxtLink>
                </div>
                <div class="flex gap-4">
                    <img src="../public/Table.svg" alt="." class="w-4">
                    <NuxtLink class="text-[#3A6351] text-sm" to="/table" >Table</NuxtLink>
                </div>
                <div class="flex gap-4">
                    <img src="../public/Menu.svg" alt="." class="w-4">
                    <NuxtLink class="text-[#3A6351] text-sm" to="/menu" >Menu</NuxtLink>
                </div>
                <div class="flex gap-4">
                    <img src="../public/Bill.svg" alt="." class="w-4">
                    <NuxtLink class="text-[#3A6351] text-sm" to="/bill" >Bill</NuxtLink>
                </div>
                <div class="flex gap-4">
                    <img src="../public/Setting.svg" alt="." class="w-4">
                    <NuxtLink class="text-[#3A6351] text-sm" to="/setting" >Setting</NuxtLink>
                </div>
                <div class="flex gap-4">
                    <img src="../public/Logout.svg" alt="." class="w-4">
                    <NuxtLink class="text-[#3A6351] text-sm" to="/login" >Logout</NuxtLink>
                </div>
            </ul>
        </div>

        <div class="flex flex-col gap-6 flex-1">
            <div class="flex justify-between bg-white px-10 py-2">
                <h2 class="text-2xl font-bold text-nowrap">Table List</h2>
                <div class="flex items-center w-max rounded-2xl border px-3">
                    <input placeholder="Search" v-model="searchQuery" class="outline-none border-none bg-transparent pr-20 text-xs">
                    <img src="../public/Search.svg" class="w-3 cursor-pointer">
                </div>
                <div class="flex gap-4">
                    <button @click="addTable" class="cursor-pointer bg-[#3A6351] text-white rounded text-xs text-nowrap text-center px-2 font-bold">Add Table</button>
                    <img src="../public/Trash.svg" class="w-4 cursor-pointer">
                </div>
            </div>
                <!-- <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3A6351]"></div>
                </div> -->
                <table class="w-full border-collapse border-none bg-white">
                    <thead class="border-b border-[#ECF0F2] border-solid">
                        <tr class="text-center">
                            <th class="p-2">
                                <input type="checkbox" @change="selectAll" v-model="selectAllChecked" class="cursor-pointer rounded border-2 border-[#3A6351] checked:bg-[#3A6351] checked:border-[#3A6351] h-4 w-4">
                            </th>
                            <th class="p-2">ID</th>
                            <th class="p-2">Table Name</th>
                            <th class="p-2">Type</th>
                            <th class="p-2">Status</th>
                            <th class="p-2">Edit</th>
                            <th class="p-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(table, index) in filteredTables" :key="index" class="text-center  items-center">
                            <td class="p-2">
                                <input type="checkbox" v-model="table.selected" class="cursor-pointer rounded border-2 border-[#3A6351] checked:bg-[#3A6351] checked:border-[#3A6351] h-4 w-4">
                            </td>
                            <td class="p-2">{{ table.id }}</td>
                            <td class="p-2">{{ table.table_name }}</td>
                            <td class="p-2">{{ table.table_type }}</td>
                            <td class="p-2" :class="{
                                'text-[#00229D]': table.status === 'Repairing',
                                'text-[#FF0000]': table.status === 'Unavailable',
                                'text-[#0CB000]': table.status === 'Available',
                            }">
                                {{ table.status }}
                            </td>
                            <td class="p-2 pl-5">
                                <img @click="editTable(table.id)" src="../public/Edit.svg" class="cursor-pointer w-4">
                            </td>
                            <td class="p-2 flex">
                                <img @click="deleteTable(table.id)" src="../public/Trash.svg" class="cursor-pointer w-4  justify-center items-center">
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div v-if="addTableClicked" 
                    class="fixed top-[1/5] left-1/3 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300">
                    <div class="bg-white p-8 rounded shadow-md max-w-md transform transition-transform duration-300">                        
                        <form @submit.prevent class="flex flex-col gap-4">
                            <h3 class="text-2xl font-bold">Create new table</h3>
                            <hr>
                            <div class="flex align-middle gap-4">
                                <label class="font-bold">ID:</label>
                                <label class="order border-gray-300">5</label>
                            </div>
                            <div class="flex align-middle gap-4">
                                <label class="font-bold">Table name:</label>
                                <label class="order border-gray-300">Table 5</label>
                            </div>
                            <div class="flex align-middle gap-4">
                                <label for="type" class="font-bold">Type:</label>
                                <select id="type" v-model="type">
                                    <option value="Standard">Standard</option>
                                    <option value="Premium">Premium</option>
                                </select>
                            </div>
                            <div class="flex align-middle gap-4">
                                <label for="status" class="font-bold">Status:</label>
                                <select id="status" v-model="status">
                                    <option value="Available">Available</option>
                                    <option value="Repairing">Repairing</option>
                                    <option value="Unavailable">Unavailable</option>
                                </select>
                            </div>
                            <div class="flex align-middle justify-center gap-4">
                                <label for="feature" class="font-bold">Feature:</label>
                                <textarea placeholder="Feature descriptions"></textarea>
                            </div>
                            <hr>
                            <div class="flex justify-end">
                                <button type="button" @click="closePopup"
                                class="bg-white text-[#3A6351] font-bold py-2 px-4 rounded transition duration-300ease-in-out ml-4">Cancel</button>
                                <button type="button" @click="closePopup"
                                class="bg-[#3A6351] text-white font-bold py-2 px-4 rounded transition duration-300ease-in-out ml-4">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            <!-- <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {{ error }}
            </div> -->
        </div>
    </div>   
   </template>
     
   <script setup>
   import { ref, onMounted, computed } from 'vue'
   
   //Setup
   onBeforeMount(() => {
    getData()
   })


   // Load data when component mounts
   onMounted(() => {
       getData()
   })

   const addTableClicked = ref(false)

   const uppercaseFirst = (a) => {
    return a.charAt(0).toUpperCase() + a.slice(1)
   }

   const selectAllChecked = ref(false)
   const tables = ref([])
//    const loading = ref(false)
//    const error = ref(null)
   const searchQuery = ref('')

   const filteredTables = computed(() => {
       if (!searchQuery.value) return tables.value
       const query = searchQuery.value.toLowerCase()
       return tables.value.filter(table => 
           table.table_name.toLowerCase().includes(query) ||
           table.table_type.toLowerCase().includes(query) ||
           table.status.toLowerCase().includes(query)
       )
   })

   const getData = async() => {
       try {
           const {data, error} = await useFetch('http://localhost:8080/v1/api/table-manage/get-all-tables', {
               method: 'GET',
           })
           if (data.value.status !== 201) {
            console.log(error.value)
           }
           tables.value = data.value.metadata.map(item => ({
               id: item.id,
               table_name: `Table ${item.id}`,
               table_type: uppercaseFirst(item.table_type),
               stick_quantity: item.stick_quantity,
               ball_quantity: item.ball_quantity,
               price: item.price,
               status: uppercaseFirst(item.status),
               createdAt: item.createdAt,
               updatedAt: item.updatedAt,
               selected: false
           }))
       } catch (err) {
           console.error('Error fetching table data:', err)
   }}

   const selectAll = () => {
       const isSelected = selectAllChecked.value
       tables.value.forEach(table => {
           table.selected = isSelected
       })
   }
   
   const editTable = async(id) => {
       // Implement edit functionality
       console.log('Edit table:', id)
   }
   
   const deleteTable = async(id) => {
       // Implement delete functionality
        const {data, error} = await useFetch('http://localhost:8080/v1/api/table-manage/delete-table',{
            method: 'POST',
            body: JSON.stringify({
                table_id: id
            }),    
        })
        console.log(error)
        console.log(data.value )
       try {
        if (data.value){
            // console.log(data.value)
            // console.log(error.value)
        }
        //rerender list
        await getData();
       } catch(err){
        console.log(err)
       }
    }

   const addTable = () => {
    addTableClicked.value = true
   }

   const closePopup = () => {
    addTableClicked.value = false
   }
   
   const createTableData = ref([])
   const createTable = async() => {
    try {
        const {data, error} = await useFetch('http://localhost:8080/v1/api/table-manage/create-new-table', {
            method: 'POST',
            body: JSON.stringify(

            )
        })
    } catch (err){
        console.log(err)
    }
   }


   </script>
   
   <style>
   </style>