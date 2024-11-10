<template>
    <div>
        <div>
            <slot />
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