<template>
    <div class="flex gap-10">
        <!-- chatbox -->
        <div class="flex-1 overflow-hidden" style="box-shadow: 0px 0px 128px rgba(0, 0, 0, 0.1);
        box-shadow: 0px 32px 64px -48px rgba(0, 0, 0, 0.5);">
            <!-- chat header -->
            <div class="bg-[#8CA899] py-4 pl-5">
                <h3 class="font-semibold text-lg text-white">Tony</h3>
            </div>
            <!-- chat body  -->
            <ul class="h-96 overflow-y-auto pt-7 px-5 pb-[70px]">
                <li class="flex gap-2">
                    <span
                        class="w-8 h-8 bg-[#8CA899] text-white text-xl rounded-full text-center leading-8 self-center">
                        T
                    </span>
                    <p
                        class="py-3 px-4 text-black text-base bg-white rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-lg max-w-3/4">
                        Hello how can i help you</p>
                </li>
                <li class="flex my-5 mx-0 justify-end">
                    <p
                        class="py-3 px-4 text-white text-base bg-[#8CA899] rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-lg max-w-3/4">
                        Hi, I have a question about my order. Can u take a look about it.</p>
                </li>
            </ul>
            <!-- chat footer -->
            <div class="flex abouslte bottom-0 bg-white w-full pt-1 px-5 border-t border-gray-300 gap-2 chat-input">
                <textarea @keydown.enter="console.log(messageText)"
                    class="border-none outline-none text-base resize-none py-4 pr-4 h-14 w-full overflow-hidden"
                    placeholder="Enter a message.." required v-model="messageText"></textarea>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 cursor-pointer self-center invisible"
                    fill="#8CA899" viewBox="0 0 16 16">
                    <path
                        d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                </svg>
            </div>
        </div>

        <!-- conversation -->
        <div class="w-full max-w-72 bg-white pt-4 px-4 h-fit">
            <div class="flex items-center w-max rounded-2xl border border-[#a4a4a4] px-3 py-1">
                <input placeholder="Search" v-model="searchQuery"
                    class="outline-none border-none bg-transparent pr-20 text-xs" />
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </div>
            <hr class="mt-3 bg-black" />
            <div class="flex items-center gap-3 my-5" v-for="(table, index) in paginatedTables" :key="index">
                <div class="w-11 h-11 rounded-full bg-[#F2EDD7] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="#000" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                </div>
                <div class="flex-1 flex flex-col gap-1">
                    <h3 class="font-semibold text-sm">Tony</h3>
                    <p class="text-xs line-clamp-1">Hello how can i help you ? Im a staff management</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'home-layout'
});

const tables = ref([]);
const searchQuery = ref('');
const messageText = ref('');

const filteredTables = computed(() => {
    return tables.value.filter((table) => {
        return table.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
});

const getOpenConversation = async () => {
    try {
        const { data: conversationData, error } = await useFetch('http://localhost:8080/v1/api/message/get-open-conversations')

    } catch (e) {
        console.log(e)
    }
};

getOpenConversation()

</script>

<style>
.chat-input textarea:valid~svg {
    visibility: visible;
}
</style>