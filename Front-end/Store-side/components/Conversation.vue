<template>
  <div
    class="flex flex-col relative overflow-hidden"
    style="
      box-shadow: 0px 0px 128px rgba(0, 0, 0, 0.1);
      box-shadow: 0px 32px 64px -48px rgba(0, 0, 0, 0.5);
    ">
    <!-- Conversation Box -->
    <div
      ref="conversationBox"
      class="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-md mb-4">
      <div v-for="(msg, index) in messages" :key="index" class="mb-2">
        <div :class="msg.isOwn ? 'text-right' : 'text-left'">
          <p
            :class="
              msg.isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            "
            class="inline-block px-4 py-2 rounded-lg max-w-xs">
            {{ msg.text }}
          </p>
        </div>
      </div>
    </div>

    <!-- Input Field -->
    <div class="flex">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Type a message"
        @keydown.enter.prevent="sendMessage"
        class="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none" />
      <button
        @click="sendMessage"
        class="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600">
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick, watch } from "vue";
import { toast } from "vue3-toastify";
import { useSocket } from "@/composables/useSocket";

const { socket } = useSocket();

const props = defineProps<{
  conversationID: number;
  staffID: number;
}>();

interface Message {
  text: string;
  isOwn: boolean;
}

const messages = ref<Message[]>([]);
const newMessage = ref<string>("");

const currentStaffID = ref();

const conversationBox = ref<HTMLDivElement | null>(null);

const scrollToBottom = () => {
  if (conversationBox.value) {
    conversationBox.value.scrollTop = conversationBox.value.scrollHeight;
  }
};

// Fetch messages for the current conversation
const fetchConversation = async () => {
  try {
    console.log("Fetching conversation with ID:", props.conversationID);
    const data = await $fetch(
      `http://localhost:8080/v1/api/message/get-conversation/${props.conversationID}`,
      {
        onResponse({ response }) {
          if (response.status !== 200) {
            toast.error(response._data.message);
          }
        },
      }
    );

    const fetchedMessages = data.metadata.map((msg: any) => ({
      text: msg.messageText,
      isOwn: msg.senderType === "staff",
    }));

    // Clear existing messages and add the new ones
    messages.value = fetchedMessages;
    nextTick(scrollToBottom); // Ensure the DOM updates before scrolling
    console.log("Messages", messages.value);
  } catch (error) {
    toast.error("Failed to fetch conversation.");
  }
};

// Send a new message
const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  try {
    await $fetch("http://localhost:8080/v1/api/message/send-message", {
      method: "POST",
      body: JSON.stringify({
        conversationID: props.conversationID,
        senderType: "staff",
        senderID: props.staffID,
        messageText: newMessage.value,
      }),
      onResponse({ response }) {
        if (response.status !== 201) {
          toast.error(response._data.message);
        }
      },
    });
    // Add the sent message to the UI
    // The message will be added through the socket event listener
    nextTick(scrollToBottom);
    messages.value = [
      ...messages.value,
      { text: newMessage.value, isOwn: true },
    ];
    // Clear message input after sending
    newMessage.value = "";
  } catch (error) {
    toast.error("Failed to send message.");
  }
};

// Watch for changes in conversationID prop and refetch messages
watch(
  () => props.conversationID,
  async (newConversationID, oldConversationID) => {
    // Leave the old conversation room
    if (oldConversationID) {
      socket.emit("leaveConversation", { conversationID: oldConversationID });
    }

    // Clear messages and fetch the new conversation
    messages.value = [];
    await fetchConversation();

    // Join the new conversation room
    socket.emit("joinConversation", { conversationID: newConversationID });

    // Listen for new messages specific to this conversation
    socket.off("newMessage"); // Remove any previous listener to avoid duplicates
    socket.on("newMessage", (message) => {
      console.log("New message received:", message);

      const newMessage = {
        text: message.messageText,
        isOwn: message.senderID === currentStaffID.value,
      };
      nextTick(scrollToBottom); // Scroll to the latest message
    });
  }
);

onMounted(() => {
  // Join the conversation in the socket connection
  socket.emit("joinConversation", { conversationID: props.conversationID });

  // Listen for new messages in the conversation via socket
  socket.on("newMessage", (message) => {
    const newMessage = {
      text: message.messageText,
      isOwn: message.senderType === "staff",
    };
    // Add the new message to the conversation
    messages.value = [...messages.value, newMessage];
    nextTick(scrollToBottom); // Scroll to the latest message
  });

  // Initial fetch when component is mounted
  fetchConversation();
});
onUnmounted(() => {
  socket.off("newMessage"); // Ensure no lingering listeners
});
</script>

<style scoped></style>
