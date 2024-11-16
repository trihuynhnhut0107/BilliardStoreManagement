<template>
  <div class="flex flex-col h-80 w-full max-w-md p-4 bg-gray-100 rounded-lg shadow-md">
    <div class="flex-1 overflow-y-auto p-2 bg-white rounded-md shadow-sm mb-2">
      <div v-for="(msg, index) in messages" :key="index" class="mb-1">
        <div :class="msg.isOwn ? 'text-right' : 'text-left'">
          <p
            :class="msg.isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'"
            class="inline-block px-3 py-1 rounded-lg max-w-xs text-sm">
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
        class="flex-1 p-2 rounded-l-md border border-gray-300 focus:outline-none text-sm" />
      <button
        @click="sendMessage"
        class="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600 text-sm">
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { socket } = useSocket();

interface Message {
  text: string;
  isOwn: boolean;
}
const messages = ref<Message[]>([]);
const newMessage = ref<string>("");

const { data, error } = await useFetch(
  "http://localhost:8080/v1/api/message/get-conversation/3"
);
console.log(data.value);

if (data.value) {
  const fetchedMessage = data.value.metadata.map((msg: any) => ({
    text: msg.messageText,
    isOwn: msg.senderType === "customer" ? true : false,
  }));
  messages.value.push(...fetchedMessage);
} else if (error.value) {
  console.error("Failed to fetch messages:", error.value);
}

const sendMessage = async () => {
  const { data } = await useFetch(
    "http://localhost:8080/v1/api/message/send-message",
    {
      method: "POST",
      body: JSON.stringify({
        conversationId: null, // or the existing conversation ID
        senderType: "customer",
        senderId: 1, // Assuming this is a valid customer ID
        receiverId: 1,
        messageText: newMessage.value,
      }),
    }
  );
  newMessage.value = "";
  console.log(data.value);
};

onMounted(() => {
  socket.emit("joinConversation", { conversationID: 3 });
  // Assuming `socket` is your Socket.IO client instance
  socket.on("newMessage", (message) => {
    const newMessage = {
      text: message.messageText,
      isOwn: message.senderType === "customer",
    };
    messages.value = [...messages.value, newMessage];
  });
});
</script>

<style scoped></style>
