<template>
  <div class="w-full h-full flex flex-row">
    <Conversation :conversationID="selectedConversationID" :staffID="staffID" v-model="selectedConversationID"
      class="w-full h-full flex-1" />
    <div class="w-2/5 flex flex-col bg-gray-100 shadow-md">
      <div class="flex flex-row justify-around border-b">
        <button v-for="(tab, index) in tabs" :key="index" @click="selectTab(index)"
          :class="tab.active ? 'text-blue-500 font-semibold' : 'text-gray-500'" class="px-4 py-2 hover:bg-gray-200">
          {{ tab.name }}
        </button>
      </div>

      <!-- Render the selected tab's content -->
      <div class="flex-1 overflow-y-auto">
        <ConversationSelection v-if="currentTab" :url="currentTab.url" v-model="selectedConversationID" class="p-4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "home-layout",
});

// Get staffID from localStorage on mount
onMounted(() => {
  staffID.value = localStorage.getItem("staffID");
  console.log("Staff ID:", staffID.value);

  // Update the Staff's conversation tab URL after staffID is fetched
  if (staffID.value) {
    tabs.value[1].url = `http://localhost:8080/v1/api/message/get-conversation-with-staff-id/${staffID.value}`;
  }
});

// Tab data with a placeholder URL for the Staff's conversation tab
const tabs = ref([
  {
    name: "Open conversation",
    url: "http://localhost:8080/v1/api/message/get-open-conversations",
    active: true,
  },
  {
    name: "Staff's conversation",
    url: "http://localhost:8080/v1/api/message/get-conversation-with-staff-id/", // Placeholder URL
    active: false,
  },
]);

const currentTab = computed(() => tabs.value.find((tab) => tab.active));

const selectedConversationID = ref<number>(-1);
const staffID = ref<number>(-1);

const selectTab = (index: number) => {
  tabs.value.forEach((tab, i) => (tab.active = i === index));
};

// Watch for selected conversation ID change
watch(selectedConversationID, (newID) => {
  // Trigger additional behavior when conversation ID changes (if needed)
  console.log("Parent detected conversationID change:", newID);
});
</script>

<style scoped></style>