<template>
    <div>
        <div class="flex gap-10 bg-[#ECF0F2] w-screen h-screen p-20">
            <div class="bg-white text-nowrap rounded-md py-6 pl-10 pr-[150px] w-fit h-fit">
                <h1 class="text-[#3A6351] text-2xl mb-6">Manage</h1>
                <ul class="flex flex-col gap-6">
                    <div class="flex gap-4">
                        <img src="../public/User.svg" alt="." class="w-4">
                        <NuxtLink class="text-[#3A6351] text-sm" to="/staff">Staff Information</NuxtLink>
                    </div>
                    <div class="flex gap-4">
                        <img src="../public/Table.svg" alt="." class="w-4">
                        <NuxtLink class="text-[#3A6351] text-sm" to="/table">Table</NuxtLink>
                    </div>
                    <div class="flex gap-4">
                        <img src="../public/Menu.svg" alt="." class="w-4">
                        <NuxtLink class="text-[#3A6351] text-sm" to="/menu">Menu</NuxtLink>
                    </div>
                    <div class="flex gap-4">
                        <img src="../public/Bill.svg" alt="." class="w-4">
                        <NuxtLink class="text-[#3A6351] text-sm" to="/bill">Bill</NuxtLink>
                    </div>
                    <div class="flex gap-4">
                        <img src="../public/Setting.svg" alt="." class="w-4">
                        <NuxtLink class="text-[#3A6351] text-sm" to="/setting">Setting</NuxtLink>
                    </div>
                    <div class="flex gap-4">
                        <img src="../public/Logout.svg" alt="." class="w-4">
                        <NuxtLink class="text-[#3A6351] text-sm" to="/login">Logout</NuxtLink>
                    </div>
                </ul>
            </div>

            <div class="flex flex-col gap-6 flex-1">
                <slot />
            </div>
        </div>

        <div class="fixed bottom-0 left-0 right-0 bg-white max-h-52">
            <div class="px-8 pt-8">
                <div class="flex justify-between pb-8">
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center gap-2">
                            <img src="../public/Edit.svg" class="w-10">
                            <h3 class="text-2xl font-bold">Demo.</h3>
                        </div>
                        <div class="max-w-80 line-clamp-3">
                            <p class="text-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui consectetur expedita
                                cupiditate provident!
                            </p>
                        </div>
                    </div>
                    <div>
                        <ul class="flex gap-10 font-bold">
                            <NuxtLink to="/products">PRODUCTS</NuxtLink>
                            <NuxtLink to="/blog">BLOG</NuxtLink>
                            <NuxtLink to="/about">ABOUT</NuxtLink>
                            <NuxtLink to="/contacts">CONTACTS</NuxtLink>
                        </ul>
                    </div>
                </div>
                <hr>
                <div class="flex justify-end items-end pt-8">
                    <p class="text-sm">&#64;2024 Demo Inc. All rights reserved</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style></style>