<template>
  <div class="flex flex-col h-96 p-4 rounded bg-gray-100 overflow-auto border border-gray-300">
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

    <div class="flex">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Type a message"
        class="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none"
        @keydown.enter.prevent="sendMessage"
        />
      <button
        @click="sendMessage"
        class="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600">
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
import { ref, watch, onMounted, nextTick } from "vue";
import { useSocket } from "@/composables/useSocket";

const { socket } = useSocket();

interface Message {
  text: string;
  isOwn: boolean;
}

const messages = ref<Message[]>([]);
const newMessage = ref<string>("");

const conversationBox = ref<HTMLDivElement | null>(null);

const scrollToBottom = () => {
  if (conversationBox.value) {
    conversationBox.value.scrollTop = conversationBox.value.scrollHeight;
  }
};

const customerID = defineModel({ default: -1 });
console.log("Message box customerID:", customerID.value);

const conversationID = ref(-1);

const getConversationID = async () => {
  const data = await $fetch(
    `http://localhost:8080/v1/api/message/get-customer-current-conversation-id/${customerID.value}`
  );
  if (data.metadata.id !== -1) {
    conversationID.value = data.metadata.id;
    console.log("Conversation ID:", conversationID.value);
  }
};
getConversationID();

const getConversation = async () => {
  const data = await $fetch(
    `http://localhost:8080/v1/api/message/get-conversation/${conversationID.value}`
  );
  if (data) {
    const fetchedMessage = data.metadata.map((msg: any) => ({
      text: msg.messageText,
      isOwn: msg.senderType === "customer" ? true : false,
    }));
    messages.value = fetchedMessage;
    nextTick(scrollToBottom); // Ensure scroll position is updated after messages are loaded
  } else if (error.value) {
    console.error("Failed to fetch messages:", error.value);
  }
};

watch(conversationID, (newConversationID) => {
  if (newConversationID !== -1) {
    getConversation();
    socket.emit("joinConversation", { conversationID: conversationID.value });
    socket.on("newMessage", (message) => {
      const newMessage = {
        text: message.messageText,
        isOwn: message.senderType === "customer",
      };
      messages.value.push(newMessage);
      nextTick(scrollToBottom); // Scroll to the latest message after receiving a new message
    });
  }
});

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  const data = await $fetch(
    "http://localhost:8080/v1/api/message/send-message",
    {
      method: "POST",
      body: JSON.stringify({
        senderType: "customer",
        senderID: customerID.value,
        messageText: newMessage.value,
      }),
      onResponse({ request, response, options }) {
        if (response.status !== 201) {
          toast.error(response._data.message);
          return;
        }
      },
    }
  );
  if (data.metadata.conversationID) {
    console.log(data);
    conversationID.value = data.metadata.conversationID;
  }
  newMessage.value = "";
};

onMounted(() => {
  if (conversationID.value !== -1) {
    getConversation();
    socket.emit("joinConversation", { conversationID: conversationID.value });
    socket.on("newMessage", (message) => {
      const newMessage = {
        text: message.messageText,
        isOwn: message.senderType === "customer",
      };
      messages.value.push(newMessage);
      nextTick(scrollToBottom); // Scroll to the latest message when a new one is received
    });
  }
});
</script>

<style scoped></style>
