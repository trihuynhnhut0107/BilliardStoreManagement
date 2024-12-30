<template>
  <div class="flex flex-col h-96 p-6 bg-gray-100 overflow-auto">
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

interface Message {
  text: string;
  isOwn: boolean;
}
const messages = ref<Message[]>([]);
const newMessage = ref<string>("");

const customerID = defineModel({ default: -1 });

const conversationID = ref(-1);
const getConversationID = async () => {
  const data = await $fetch(
    `http://localhost:8080/v1/api/message/get-customer-current-conversation-id/${customerID.value}`
  );
  if (data.metadata.id !== -1) {
    conversationID.value = data.metadata.id;
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
  } else if (error.value) {
    console.error("Failed to fetch messages:", error.value);
  }
};

watch(conversationID, (newConversationID) => {
  if (newConversationID !== -1) {
    getConversation();
    socket.emit("joinConversation", { conversationID: conversationID.value });
    // Assuming `socket` is your Socket.IO client instance
    socket.on("newMessage", (message) => {
      const newMessage = {
        text: message.messageText,
        isOwn: message.senderType === "customer",
      };
      messages.value.push(newMessage);
    });
  }
});

const sendMessage = async () => {
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
        console.log(response._data);
      },
    }
  );
  if (data.metadata.conversationID) {
    console.log(data);
    conversationID.value = data.metadata.conversationID;
  }
  newMessage.value = "";
};
</script>

<style scoped></style>
