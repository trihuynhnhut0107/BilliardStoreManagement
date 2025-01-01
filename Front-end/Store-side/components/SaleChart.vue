<template>
  <div class="w-full h-full">
    <canvas ref="chartCanvas" width="400" height="200"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";
import { toast } from "vue3-toastify";

const salesData = ref([]);

// Fetch sales data
const getData = async () => {
  try {
    const data = await $fetch(
      "http://localhost:8080/v1/api/report/get-sale-report",
      {
        query: {
          start_time: "00:00:00 01/01/2024",
          end_time: "23:59:59 12/31/2025",
        },
        onResponseError({ response }) {
          toast.error("Failed to fetch sales data:", response._data.message);
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

  // Prepare the data for the chart
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Create an array for all 24 months (2024-2025)
  const sales = new Array(24).fill(0); // Initialize all months with 0 sales
  const labels = [];

  // Populate the sales data based on the year_month field
  newData.forEach((item) => {
    const [year, month] = item.year_month.split("-"); // Split year and month
    const index = (parseInt(year) - 2024) * 12 + (parseInt(month) - 1); // Calculate the index (0-23 for 2 years)
    sales[index] = item.total_sales; // Set the sales data for that specific month
  });

  // Create labels for each month from Jan 2024 to Dec 2025
  for (let i = 0; i < 24; i++) {
    const year = Math.floor(i / 12) + 2024; // Calculate year
    const month = i % 12; // Get month from 0 to 11
    labels.push(`${months[month]} ${year}`);
  }

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
