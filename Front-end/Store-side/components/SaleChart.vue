<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="flex flex-row items-center justify-center">
      <input type="date" v-model="dateInfo.startTime" />
      <input type="date" v-model="dateInfo.endTime" />
    </div>
    <div class="w-full h-full">
      <canvas ref="chartCanvas" width="400" height="200"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";
import { toast } from "vue3-toastify";

const salesData = ref([]);

const dateInfo = ref({
  startTime: "",
  endTime: "",
});

// Generate months array in MM/YYYY format based on a date range
const generateMonthsInRange = (
  startDate: string,
  endDate: string
): string[] => {
  const months = [];

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Ensure start date is before end date
  if (start > end) return months;

  let currentDate = new Date(start);

  while (currentDate <= end) {
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = currentDate.getFullYear();
    months.push(`${month}/${year}`);

    // Move to the next month
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return months;
};

// Fetch sales data
const getData = async () => {
  try {
    const data = await $fetch(
      "http://localhost:8080/v1/api/report/get-sale-report",
      {
        query: {
          start_time: `00:00:00 01/01/2024`,
          end_time: `23:59:59 03/01/2025`,
        },
        onResponseError({ response }) {
          toast.error(response._data.message);
        },
      }
    );
    salesData.value = data.metadata;
    console.log("Fetched Sales Data:", salesData.value); // Debugging the fetched data
  } catch (error) {
    toast.error("Error fetching data");
  }
};

onMounted(() => {
  getData();
});

const chartCanvas = ref(null);

// Watch for changes in the sales data and update the chart accordingly
watch(salesData, (newData) => {
  if (newData.length === 0) return; // Prevent rendering if no data

  // Define start and end date for generating the months
  const startDate = "2024-01-01"; // Adjust the start date
  const endDate = "2025-03-01"; // Adjust the end date

  // Generate month labels for the chart
  const labels = generateMonthsInRange(startDate, endDate);

  // Create an array to hold the sales data for each month
  const sales = new Array(labels.length).fill(0); // Initialize all months with 0 sales

  // Populate the sales data based on the year_month field
  newData.forEach((item) => {
    const [year, month] = item.year_month.split("-"); // Split year and month
    const index = (parseInt(year) - 2024) * 12 + (parseInt(month) - 1); // Calculate the index (0-23 for 2 years)
    sales[index] = item.total_sales; // Set the sales data for that specific month
  });

  // Initialize the chart if not already initialized
  if (chartCanvas.value && sales.length > 0) {
    new Chart(chartCanvas.value, {
      type: "bar", // Bar chart (column chart)
      data: {
        labels: labels, // Dynamic labels for each month and year
        datasets: [
          {
            label: "Total Sales",
            data: sales, // Data for the columns (sales)
            backgroundColor: "#4CAF50", // Column color
            borderColor: "#388E3C",
            borderWidth: 1,
            barThickness: 20, // Adjust column width dynamically (can be tweaked)
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Month",
            },
            // Ensure that all months fit in a 24-month span
            ticks: {
              autoSkip: false, // Ensure no label is skipped
              maxRotation: 45, // Rotate labels to fit
              minRotation: 45, // Rotate labels to fit
            },
          },
          y: {
            title: {
              display: true,
              text: "Sales",
            },
            beginAtZero: true,
          },
        },
        // Ensure the columns don't become too wide
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }
});
</script>

<style scoped>
/* Add any styling you want for the chart */
</style>
