<template>
    <div class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl flex">
            <!-- Left-hand side: Image and Description -->
            <button v-on:click="closeModal" class="flex right-4 top-4 text-gray-500 hover:text-gray-700">✖</button>
            <div class="w-1/2 p-6">
                <img src="../public/Image/billard-table.jpg" alt="Table Image" class="w-full h-2XL rounded-lg mb-2" />
                <div class="text-left">
                    <h3 class="text-xl font-bold">{{props.table.name}}</h3>
                    <div class="mt-4 text-gray-500">Type: Standard</div>
                    <p class="mt-4 text-gray-600 text-sm">Mô tả về bàn hoặc các dịch vụ đi kèm</p>
                </div>
            </div>

            <!-- Right-hand side: Booking Options -->
            <div class="w-1/2 pl-6 border-l">
                <h2 class="text-2xl font-bold text-center mb-4">Booking Optional</h2>
                <hr class="border-t border-gray-300 my-2" />
                
                <!-- Date Display -->
                <input v-model="formData.date" type="date" class="mt-4 text-gray-500 mb-4 border border-gray-300 p-2 rounded w-full"/>
                
                <!-- Start Time -->
                <div class="mb-4">
                    <label class="block font-semibold text-gray-700">Start time:</label>
                    <input v-model="formData.startTime" type="time" class="border border-gray-300 p-2 rounded w-full" @change="validateTimes" placeholder="HH:MM (24-hour format)" />
                    <small class="text-gray-500">Enter time (SA means [0-12:00], CH means [12:00-24:00])</small>
                </div>

                <!-- End Time  -->
                <div class="mb-4">
                    <label class="block font-semibold text-gray-700">End time:</label>
                    <input v-model="formData.endTime" type="time" class="border border-gray-300 p-2 rounded w-full" @change="validateTimes" placeholder="HH:MM (24-hour format)" />
                    <small class="text-gray-500">Enter time (SA means [0-12:00], CH means [12:00-24:00])</small>
                </div>

                <p v-if="error" style="color: red;">{{ error }}</p>

                
                <!-- Billiard Sticks -->
                <div class="flex items-center mb-4">
                    <span class="font-semibold text-gray-700 mr-2">Billiard Sticks:</span>
                    <button v-on:click="decrementSticks" class="ml-2 border border-gray-300 p-1 rounded-lg">-</button>
                    <span class="ml-2 px-4"> {{ sticks }}</span>
                    <button v-on:click="incrementSticks" class="ml-2 border border-gray-300 p-1 rounded-lg">+</button>
                </div>
                
                <!-- Price and Booking Button -->
                <div class="mt-4 flex justify-between items-center">
                    <h2 class="text-grey font-bold text-2xl">{{ props.table.price }}$ / 1 Hour</h2>
                    <button v-on:click="confirmBooking" class="bg-green-800 text-white p-2 rounded-md">
                    Booking</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { defineProps } from 'vue'

    const error = ref('');
    const price = ref(10);
    const props = defineProps({
        table: {
            type: Object,
            default: () => ({ name: 'Default Table', price: 10, id: 1, type: 'Standard'}),
        }
    })
    
    const sticks = ref(2)
    const incrementSticks = () => { sticks.value += 1 }
    const decrementSticks = () => { if (sticks.value > 1) sticks.value -= 1 }

    const emit = defineEmits();
    const closeModal = () => {
        emit('close');
    }; 

    // Calculate price based on duration
    const calculatePrice = () => {
        if (timeData.start_time && timeData.end_time) {
            const durationInMilliseconds = timeData.end_time - timeData.start_time;
            const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
            price.value = Math.max(durationInHours * props.table.price, 0); // Ensure non-negative price
        }
    };
    
    
    const formData = ref({
        itemType: "BilliardTable",
        itemId: 1,
        date: (''),
        startTime: (''),
        endTime:('')
    });

    let timeData = {
        start_time: new Date(),
        end_time: new Date(),
    }

    const setTime = (timeData) => {
        if (formData.value.date && formData.value.startTime && formData.value.endTime) {
            timeData.start_time = new Date(`${formData.value.date}T${formData.value.startTime}:00`);
            timeData.end_time = new Date(`${formData.value.date}T${formData.value.endTime}:00`);
        } 
    }

    const formatToCustomISO = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    const formatToCheckout = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    const validateTimes = () => {
        if (formData.value.startTime && formData.value.endTime && formData.value.startTime >= formData.value.endTime) {
            error.value = 'Start time must be earlier than end time.';
        } else {
            error.value = '';
        }
    }

    const confirmBooking = async () => {
        validateTimes();
        setTime(timeData);
        calculatePrice(); 

        const formattedStartTime = formatToCustomISO(timeData.start_time);
        const formattedEndTime = formatToCustomISO(timeData.end_time);
        
        console.log(formattedStartTime);
        console.log(formattedEndTime);

        if (error.value) {
            return;
        }
        try {
            const { data, error } = await useFetch('http://localhost:8080/v1/api/bill-manage/create-bill', {
                method: 'POST',
                body: JSON.stringify([{
                    itemType: "BilliardTable",
                    itemId: 1,
                    start_time: formattedStartTime,
                    end_time: formattedEndTime,
                }])
            });
            if (error) {
                console.log(error);
            }
            if (data.value) {
                navigateTo(`/checkout?name=${props.table.name}&id=${props.table.id}&price=${price.value}
                    &description=${props.table.description}&sticks=${sticks.value}&type=${props.table.table_type}&start_time=${formatToCheckout(timeData.start_time)}&end_time=${formatToCheckout(timeData.end_time)}`);
            }
        } catch (err) {
            console.error(err);
        }

        
    };

</script>