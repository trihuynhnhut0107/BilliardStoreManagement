<template>
  <div class="flex flex-col max-h-[50vh] p-6 bg-gray-100">
    <div class="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-md mb-4">
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
const { socket } = useSocket();

// Get the user ID from localStorage
const customerID = localStorage.getItem('customerID')

interface Message {
  text: string;
  isOwn: boolean;
}
const messages = ref<Message[]>([]);
const newMessage = ref<string>("");

const conversationID = 1;

const { data, error } = await useFetch(
  `http://localhost:8080/v1/api/message/get-conversation/${conversationID}`
);
 
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
        conversationId: conversationID, // or the existing conversation ID
        senderType: "customer",
        senderId: customerID,
        messageText: newMessage.value,
      }),
    }
  );
  newMessage.value = "";
  console.log(data.value);
};

onMounted(() => {
  socket.emit("joinConversation", { conversationID: conversationID });
  // Assuming `socket` is your Socket.IO client instance
  socket.on("newMessage", (message) => {
    const newMessage = {
      text: message.messageText,
      isOwn: message.senderType === "staff",
    };
    messages.value = [...messages.value, newMessage];
  });
});
</script>

<style scoped></style>