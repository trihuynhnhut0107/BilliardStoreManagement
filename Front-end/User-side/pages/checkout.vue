<template>
    <DefaultLayout>
      <div class="container mx-auto py-10   ">
        <h1 class="text-2xl font-bold mb-6">Checkout</h1>
  
        <div class="bg-gray-100 p-6 rounded-lg mb-20">
          <div class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Customer</h2>
            <p class="text-gray-600">User name: {{ customer.name }}</p>
            <p class="text-gray-600">Phone number: {{ customer.phone }}</p>
          </div>
  
          <div class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Table</h2>
            <p class="text-gray-600">Item name: {{ table.name }}</p>
            <p class="text-gray-600">Item ID: {{ table.id }}</p>
            <p class="text-gray-600">Item detail: {{ table.detail }}</p>
            <p class="text-gray-600">Descriptions:</p>
            <ul class="text-gray-600 list-disc ml-4">
              <li>Value: {{ table.value }}</li>
              <li>Stick: {{ table.stick }}</li>
            </ul>
            <p class="text-gray-600">Total price: ${{ table.totalPrice }}</p>
          </div>
  
          <div class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Select payment method</h2>
            <div class="flex items-center">
              <input type="radio" id="cod" name="payment" value="cod" checked>
              <label for="cod" class="ml-2">COD - Pay at the store</label>
            </div>
            <div class="flex items-center mt-2">
              <input type="radio" id="card" name="payment" value="card">
              <label for="card" class="ml-2">Card</label>
            </div>
          </div>
  
          <div>
            <p class="text-gray-600">Total price: ${{ table.totalPrice }}</p>
            <button class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">Pay</button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  </template>
  
  <script setup>
  import DefaultLayout from '~/layout/default.vue'
  
  // Assuming you have these data in your component context
  const customer = {
    name: 'John Doe',
    phone: '123-456-7890',
  }
  
  const table = {
    name: 'Table 01',
    id: '01',
    detail: 'Standart',
    value: '01',
    stick: '02',
    totalPrice: 5.20,
  }
  </script>