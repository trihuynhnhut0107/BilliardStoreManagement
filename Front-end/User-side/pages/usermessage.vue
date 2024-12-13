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
import { ref, onMounted } from "vue";

// Assuming these are the initial states for the user type
const userType = ref("customer");  // Can be 'customer' or 'staff'
const isFirstMessage = ref(true);  // Track if it's the first message

interface Message {
  text: string;
  isOwn: boolean;
}

const messages = ref<Message[]>([]);
const newMessage = ref<string>("");

// Fetch existing conversation data
const { data, error } = await useFetch("http://localhost:8080/v1/api/message/get-conversation/3");

if (data.value) {
  const fetchedMessage = data.value.metadata.map((msg: any) => ({
    text: msg.messageText,
    isOwn: msg.senderType === "customer" ? true : false,
  }));
  messages.value.push(...fetchedMessage);
} else if (error.value) {
  console.error("Failed to fetch messages:", error.value);
}

// Function to send a message
const sendMessage = async () => {
  let messageObject: any = {};

  if (userType.value === "customer") {
    if (isFirstMessage.value) {
      // For the first message, only senderId is required
      messageObject = {
        conversationId: 3, // or the existing conversation ID
        senderType: "customer",
        senderId: 1,  // Assuming this is a valid customer ID
        messageText: newMessage.value,
      };
      isFirstMessage.value = false; // Subsequent messages will need both senderId and receiverId
    } else {
      // For subsequent messages, both senderId and receiverId are required
      messageObject = {
        conversationId: 3, // Or use the actual conversation ID
        senderType: "customer",
        senderId: 1,  // Customer ID
        receiverId: 2,  // Staff ID (example, this should be dynamic)
        messageText: newMessage.value,
      };
    }
  } else if (userType.value === "staff") {
    // Staff always needs both senderId and receiverId
    messageObject = {
      conversationId: 3, // Or use the actual conversation ID
      senderType: "staff",
      senderId: 2,  // Staff ID
      receiverId: 1,  // Customer ID
      messageText: newMessage.value,
    };
  }

  // Send the message
  console.log("Sending message:", messageObject);

  const { data: sendData, error: sendError } = await useFetch(
    "http://localhost:8080/v1/api/message/send-message",
    {
      method: "POST",
      body: JSON.stringify(messageObject),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (sendError.value) {
    console.error("Error sending message:", sendError.value);
  } else {
    console.log("Message sent successfully:", sendData.value);
    // Optionally, update the local `messages` array with the sent message
    messages.value.push({
      text: newMessage.value,
      isOwn: userType.value === "customer",  // Adjust if needed
    });
  }

  newMessage.value = "";  // Clear input field after sending the message
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
