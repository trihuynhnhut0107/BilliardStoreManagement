<!-- components/Timepicker.vue -->
<template>
  <div>
    <input type="text" id="timepicker" class="flatpickr-input w-full" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, nextTick } from "vue";
import flatpickr from "flatpickr";

// Props to check if dialog is open
const props = defineProps({
  isDialogOpen: {
    type: Boolean,
    required: true,
  },
});

const flatpickrInstance = ref<any>(null);

// Initialize Flatpickr when the dialog is opened
onMounted(() => {
  nextTick(() => {
    if (props.isDialogOpen) {
      flatpickrInstance.value = flatpickr("#timepicker", {
        enableTime: true,
        noCalendar: true,
        time_24hr: true,
        dateFormat: "H:i",
      });
    }
  });
});

// Re-initialize Flatpickr when dialog is toggled
watchEffect(() => {
  if (props.isDialogOpen && !flatpickrInstance.value) {
    flatpickrInstance.value = flatpickr("#timepicker", {
      enableTime: true,
      noCalendar: true,
      time_24hr: true,
      dateFormat: "H:i",
    });
  }
});
</script>

<style scoped>
.flatpickr-input {
  border: 2px solid #4caf50;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
}

/* Ensure the flatpickr calendar appears above the dialog */
.flatpickr-calendar {
  z-index: 9999; /* Ensure the calendar appears above the dialog */
}
</style>
