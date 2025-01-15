<template>
  <div class="h-full w-full flex flex-col">
    <div class="w-full h-full flex items-center justify-center">
      <p class="text-center font-bold text-2xl">Table Cancellation Rate</p>
    </div>

    <!-- Date Inputs and Submit Button -->
    <div class="w-full h-auto flex items-center justify-center gap-4 mb-4">
      <div>
        <label for="start-time" class="block text-sm font-semibold">Start Time</label>
        <input type="datetime-local" id="start-time" v-model="startTime" class="p-2 border rounded" />
      </div>
      <div>
        <label for="end-time" class="block text-sm font-semibold">End Time</label>
        <input type="datetime-local" id="end-time" v-model="endTime" class="p-2 border rounded" />
      </div>
      <button @click="fetchData" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Get data
      </button>
    </div>

    <div class="w-full h-5/6 flex items-center justify-center">
      <!-- Add a fallback message if no chartData is available -->
      <Line :data="chartData" :options="chartOptions" v-if="chartData.labels.length" />
      <p v-else>No data available to display the chart.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Line } from "vue-chartjs";
import { toast } from "vue3-toastify";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const startTime = ref(""); // Store datetime-local input value
const endTime = ref(""); // Store datetime-local input value

const report = ref([]);
const chartData = ref({
  datasets: [],
  labels: [],
});
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw;
          return `Cancellation Rate: ${value}%`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      title: {
        display: true,
        text: "Cancellation Rate (%)",
      },
      ticks: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});

// Fetch report data
const fetchData = async () => {
  try {
    // console.log("Start Time:", formatDateForFetch(startTime.value));
    const data = await $fetch(
      "http://localhost:8080/v1/api/report/get-table-report",
      {
        query: {
          start_time: formatDateForFetch(startTime.value), // Convert to "hh:mm:ss mm/dd/yyyy"
          end_time: formatDateForFetch(endTime.value), // Convert to "hh:mm:ss mm/dd/yyyy"
        },
        onRequestError({ response }) {
          toast.error(response._data.message);
        },
      }
    );
    console.log("Fetched Data:", data);
    report.value = data.metadata;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Convert datetime-local input value to "hh:mm:ss mm/dd/yyyy"
const formatDateForFetch = (datetime: string) => {
  if (!datetime) return ""; // Check if datetime is empty or undefined

  const date = new Date(datetime);

  if (isNaN(date.getTime())) {
    console.error("Invalid date:", datetime);
    return "";
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} ${month}/${day}/${year}`;
};

// Convert date in "hh:mm:ss mm/dd/yyyy" format to UTC considering GMT+7 offset
const parseDateWithTimeZone = (dateStr: string, timeZoneOffset: number) => {
  if (!dateStr || typeof dateStr !== "string") return new Date(); // Return current date if no date string is provided

  const [time, date] = dateStr.split(" ");
  if (!time || !date) return new Date(); // If split fails, return current date as fallback

  const [month, day, year] = date.split("/"); // MM/DD/YYYY format

  const [hour, minute, second] = time.split(":").map(Number);

  const localDate = new Date(year, month - 1, day, hour, minute, second);
  const utcDate = new Date(localDate.getTime() - timeZoneOffset * 60 * 1000);

  return utcDate;
};

const generateMonthsInRange = (start, end, timeZoneOffset) => {
  const months = [];

  const startDate = parseDateWithTimeZone(start, timeZoneOffset);
  const endDate = parseDateWithTimeZone(end, timeZoneOffset);

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const year = currentDate.getUTCFullYear();
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
    const monthStr = `${year}-${month}`;
    months.push(monthStr);

    currentDate.setUTCMonth(currentDate.getUTCMonth() + 1);
  }

  return months;
};

// Process the report data into chart-friendly format
watch(
  report,
  () => {
    if (report.value.length) {
      console.log("Raw Report Data:", report.value);

      const allMonths = generateMonthsInRange(
        startTime.value,
        endTime.value,
        7 * 60
      );
      console.log("Generated Months:", allMonths);

      const tableData = report.value.reduce((acc, curr) => {
        const { table_id, month, cancellation_rate } = curr;

        if (!acc[table_id]) {
          acc[table_id] = {
            label: `Table ${table_id}`,
            cancellationRates: new Array(allMonths.length).fill(0),
          };
        }

        const monthIndex = allMonths.indexOf(month);
        if (monthIndex >= 0) {
          acc[table_id].cancellationRates[monthIndex] = cancellation_rate;
        }

        return acc;
      }, {});

      console.log("Processed Table Data:", tableData);

      chartData.value.labels = allMonths;

      chartData.value.datasets = Object.values(tableData).map((table) => ({
        label: table.label,
        data: table.cancellationRates,
        borderColor: getRandomColor(),
        backgroundColor: "rgba(0, 0, 0, 0)",
        fill: false,
        tension: 0.4,
        borderWidth: 2,
      }));

      console.log("Chart Data:", chartData.value);
    }
  },
  { immediate: false }
);

// Generate a random color for the chart
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
</script>

<style scoped>
/* You can customize the chart size here */
</style>
