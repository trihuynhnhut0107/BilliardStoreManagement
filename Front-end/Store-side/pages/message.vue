<template>
  <div class="flex gap-10">
    <!-- chatbox -->
    <div
      class="flex-1 overflow-hidden relative"
      style="
        box-shadow: 0px 0px 128px rgba(0, 0, 0, 0.1);
        box-shadow: 0px 32px 64px -48px rgba(0, 0, 0, 0.5);
      ">
      <!-- chat header -->
      <div class="bg-[#8CA899] py-4 pl-5">
        <h3 class="font-semibold text-lg text-white">
          {{ selectedCustomerName || "Select a conversation" }}
        </h3>
      </div>
      <!-- chat body  -->
      <ul
        class="h-[500px] overflow-y-auto pt-7 px-5 pb-[70px]"
        ref="chatContainer">
        <li
          v-for="message in currentConversation"
          :key="message.id"
          :class="{
            'flex my-1 gap-2': message.senderType === 'customer',
            'flex my-1 justify-end': message.senderType === 'staff',
          }">
          <span
            v-if="message.senderType === 'customer'"
            class="w-8 h-8 bg-[#8CA899] text-white text-xl rounded-full text-center leading-8 self-center">
            {{ selectedCustomerName?.[0] || "U" }}
          </span>
          <p
            :class="{
              'py-3 px-4 text-base max-w-3/4': true,
              'text-black bg-white rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-lg':
                message.senderType === 'customer',
              'text-white bg-[#8CA899] rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-lg':
                message.senderType === 'staff',
            }">
            {{ message.messageText }}
          </p>
        </li>
      </ul>
      <!-- chat footer -->
      <div
        class="flex absolute bottom-0 bg-white w-full pt-1 px-5 border-t border-gray-300 gap-2 chat-input">
        <textarea
          @keydown.enter.prevent="sendMessage"
          class="border-none outline-none text-base resize-none py-4 pr-4 h-14 w-full overflow-hidden"
          placeholder="Enter a message.."
          required
          v-model="messageText"></textarea>
        <svg
          @click="sendMessage"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 cursor-pointer self-center invisible"
          fill="#8CA899"
          viewBox="0 0 16 16">
          <path
            d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
        </svg>
      </div>
    </div>

    <!-- conversation -->
    <div class="w-full max-w-72 bg-white pt-4 px-4 h-fit">
      <div
        class="flex items-center w-max rounded-2xl border border-[#a4a4a4] px-3 py-1">
        <input
          placeholder="Search"
          v-model="searchQuery"
          class="outline-none border-none bg-transparent pr-20 text-xs" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 16 16">
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </div>
      <hr class="mt-3 bg-black" />
      <div
        class="flex items-center gap-3 my-5 cursor-pointer hover:bg-gray-100 p-2 rounded"
        v-for="(table, index) in paginatedTables"
        :key="index"
        @click="selectConversation(table)">
        <div
          class="w-11 h-11 rounded-full bg-[#F2EDD7] flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="#000"
            viewBox="0 0 16 16">
            <path
              d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
        </div>
        <div class="flex-1 flex flex-col gap-1">
          <h3 class="font-semibold text-sm">{{ table.customerName }}</h3>
          <p class="text-xs line-clamp-1">{{ table.latestMessage }}</p>
        </div>
      </div>
      <!-- Pagination -->
      <div
        class="flex items-center mt-4 gap-2 w-full py-2 px-10 rounded bg-white">
        <button
          @click="currentPage > 1 && currentPage--"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          class="px-3 py-2 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-6 h-6"
            viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
        </button>
        <span class="mx-2">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="currentPage < totalPages && currentPage++"
          :class="{
            'opacity-50 cursor-not-allowed': currentPage === totalPages,
          }"
          class="px-3 py-2 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-6 h-6"
            viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home-layout",
});

const tables = ref([]);
const searchQuery = ref("");
const messageText = ref("");
const currentPage = ref(1);
const itemsPerPage = 4;
const currentConversation = ref([]);
const selectedConversationId = ref(null);
const selectedCustomerName = ref("");
const chatContainer = ref(null);
const staffID = ref("");

const filteredTables = computed(() => {
  return tables.value.filter((table) => {
    return table.latestMessage
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredTables.value.length / itemsPerPage);
});

const paginatedTables = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTables.value.slice(start, end);
});

const scrollToBottom = () => {
  if (chatContainer.value) {
    nextTick(() => {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    });
  }
};

const selectConversation = async (table) => {
  selectedConversationId.value = table.conversationID;
  selectedCustomerName.value = table.customerName;
  try {
    const conversationData = await $fetch(
      `http://localhost:8080/v1/api/message/get-conversation/${table.conversationID}`
    );
    currentConversation.value = conversationData.metadata;
    scrollToBottom();
  } catch (error) {
    console.error("Error loading conversation:", error);
  }
};

const sendMessage = async () => {
  if (!messageText.value.trim() || !selectedConversationId.value) return;

  try {
    const response = await $fetch(
      "http://localhost:8080/v1/api/message/send-message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderType: "staff",
          senderID: staffID.value,
          conversationID: selectedConversationId.value,
          messageText: messageText.value,
        }),
        onResponse({ response }) {
          if (response.status !== 201) {
            toast.error(response._data.message);
            return;
          }
        },
      }
    );

    if (response.ok) {
      // Add the new message to the conversation
      currentConversation.value.push({
        senderType: "staff",
        messageText: messageText.value,
      });
      messageText.value = "";
      scrollToBottom();
      // Refresh the conversation list to update latest messages
      getOpenConversation();
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const getOpenConversation = async () => {
  try {
    const conversationData = await $fetch(
      "http://localhost:8080/v1/api/message/get-open-conversations"
    );
    tables.value = conversationData.metadata.map((item) => ({
      conversationID: item.id,
      customerID: item.customerID,
      latestMessage: item.latestMessage.messageText,
      customerName: "Tony",
    }));

    const tableIDs = tables.value.map((table) => table.customerID);
    const customerNames = {};

    const customerRequests = tableIDs.map(async (customerID) => {
      try {
        const customerData = await $fetch(
          `http://localhost:8080/v1/api/customer-manage/customer/${customerID}`
        );
        customerNames[customerID] = customerData.metadata.name;
      } catch (e) {
        console.log("Error when get customerName: ", e);
      }
    });

    await Promise.all(customerRequests);

    tables.value = tables.value.map((table) => ({
      ...table,
      customerName: customerNames[table.customerID] || "Unknown",
    }));
  } catch (e) {
    console.log("Error when get all open conversation: ", e);
  }
};

getOpenConversation();

// Watch for search query changes to reset pagination
watch(searchQuery, () => {
  currentPage.value = 1;
});

onMounted(async () => {
  staffID.value = localStorage.getItem("staffID");
});
</script>

<style>
.chat-input textarea:valid ~ svg {
  visibility: visible;
}
</style>
