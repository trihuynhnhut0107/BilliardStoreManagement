<template>
  <div v-if="conversations.length !== 0">
    <button
      v-for="conversation in conversations"
      :key="conversation.id"
      class="flex flex-row items-center gap-4 p-4 border-b w-full text-start"
      :class="{ 'bg-blue-100': selectedConversationID === conversation.id }"
      @click="selectConversation(conversation.id)">
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
        <h3 class="font-semibold text-sm">{{ conversation.customerName }}</h3>
        <div class="text-xs flex flex-row space-x-1">
          <p v-if="conversation.latestMessage.senderType === 'staff'">You:</p>
          <p>{{ conversation.latestMessage.messageText }}</p>
        </div>
      </div>
    </button>
  </div>
  <div v-else>
    <p class="text-center">No conversations available.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps({
  url: String,
  modelValue: Number, // Expect a prop to bind the selected conversation's ID
});

const emits = defineEmits(["update:modelValue"]);

const conversations = ref([]);
const selectedConversationID = ref(props.modelValue || null); // Local state to track selected conversation

// Function to fetch data
const fetchData = async () => {
  try {
    const data = await $fetch(props.url, {
      onResponse({ response }) {
        if (response.status !== 200) {
          toast.error(response._data.message);
        }
      },
    });
    conversations.value = data.metadata;

    // Check if conversationID is -1, and if so, set it to the first conversation's ID
    if (props.modelValue === -1 && conversations.value.length > 0) {
      selectedConversationID.value = conversations.value[0].id;
    }
  } catch (error) {
    toast.error("Failed to fetch conversations.");
  }
};

// Watch for changes in the `url` prop and refetch data
watch(
  () => props.url,
  () => {
    fetchData();
  }
);

// Watch for selectedConversationId and emit changes to parent
watch(selectedConversationID, (newId) => {
  emits("update:modelValue", newId);
  console.log("Selected conversation ID:", newId);
});

// Select conversation and update local state
const selectConversation = (id: number) => {
  selectedConversationID.value = id;
};

// Initial fetch
onMounted(() => {
  fetchData();
});
</script>

<style scoped></style>
