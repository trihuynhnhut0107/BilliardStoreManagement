<template>
  <div class="min-h-screen flex flex-col">

    <!-- Header / Navbar -->
    <header class="bg-white border-b shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo or Title -->
        <div class="text-xl font-bold">Demo.</div>

        <!-- Nav Links -->
        <nav class="space-x-6 hidden md:block">
          <a href="#" class="text-gray-700 hover:text-teal-600">Students</a>
          <a href="#" class="text-gray-700 hover:text-teal-600">Statistics</a>
          <a href="#" class="text-gray-700 hover:text-teal-600">Teachers</a>
          <a href="#" class="text-gray-700 hover:text-teal-600">Output Criteria</a>
          <a href="#" class="text-gray-700 hover:text-teal-600">Syllabus</a>
        </nav>

        <!-- Mobile Menu Icon (optional) -->
        <div class="md:hidden">
          <button class="text-gray-700 hover:text-teal-600 focus:outline-none">
            <!-- Hamburger icon -->
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow bg-gray-50">
      <div class="container mx-auto px-4 py-8">
        <!-- Page Title -->
        <h1 class="text-2xl font-semibold text-center mb-8">Quản lý môn học</h1>

        <!-- Form Container -->
        <div class="max-w-3xl mx-auto bg-white p-6 rounded shadow-sm">
          <!-- Row 1: Chuyên ngành, Năm học, Học kỳ -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <!-- Chuyên ngành -->
            <div>
              <label
                class="block mb-2 text-gray-700 font-medium"
                for="chuyen-nganh"
              >
                Chuyên ngành
              </label>
              <select
                id="chuyen-nganh"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                v-model="major"
              >
                <option value="Công nghệ Phần mềm">Công nghệ Phần mềm</option>
                <option value="Hệ thống thông tin">Hệ thống thông tin</option>
                <option value="Khoa học máy tính">Khoa học máy tính</option>
                <option value="Kỹ thuật máy tính">Kỹ thuật máy tính</option>
              </select>
            </div>

            <!-- Năm học -->
            <div>
              <label class="block mb-2 text-gray-700 font-medium" for="nam-hoc">
                Năm học
              </label>
              <select
                id="nam-hoc"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                v-model="selectedYear"
              >
                <option value="2024-2025">2024 - 2025</option>
                <option value="2023-2024">2023 - 2024</option>
                <option value="2022-2023">2022 - 2023</option>
              </select>
            </div>

            <!-- Học kỳ -->
            <div>
              <label class="block mb-2 text-gray-700 font-medium" for="hoc-ky">
                Học kỳ
              </label>
              <select
                id="hoc-ky"
                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                v-model="selectedSemester"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          <!-- Row 2: List of Mã môn học  -->
          <div class="flex flex-col space-y-4">
            <!-- Repeat for each subject in the array -->
            <div
              v-for="(subject, index) in subjects"
              :key="index"
              class="flex items-center"
            >
              <select
                class="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                v-model="subjects[index]"
              >
                <option>Mã môn học: Se1</option>
                <option>Mã môn học: Se2</option>
                <option>Mã môn học: Sa3</option>
                <!-- Add more options if needed -->
              </select>
              <!-- Remove button -->
              <button
                class="ml-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
                @click="removeSubject(index)"
              >
                Remove
              </button>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="mt-6 flex space-x-4 justify-end">
            <button
              class="bg-teal-500 text-white px-5 py-2 rounded hover:bg-teal-600 transition"
              @click="addSubject"
            >
              Thêm môn
            </button>
            <button
              class="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
              @click="clearSubjects"
            >
              Xóa môn
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-teal-600 text-white py-6 mt-8">
      <div class="container mx-auto px-4">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <!-- Footer left text -->
          <div class="text-sm">
            © 2025 Demo. All rights reserved.
          </div>
          <!-- Footer links -->
          <div class="space-x-4 text-sm">
            <a href="#" class="hover:underline">Terms</a>
            <a href="#" class="hover:underline">Support</a>
            <a href="#" class="hover:underline">Privacy</a>
            <a href="#" class="hover:underline">Links</a>
            <a href="#" class="hover:underline">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive state for the select fields
const major = ref('Công nghệ Phần mềm')
const selectedYear = ref('2024-2025')
const selectedSemester = ref('1')

// List of subject codes selected
const subjects = ref([
  'Mã môn học: Se1',
  'Mã môn học: Se2',
  'Mã môn học: Sa3'
])

// Remove one subject
function removeSubject(index) {
  subjects.value.splice(index, 1)
}

// Add new subject (example: push a default value)
function addSubject() {
  subjects.value.push('Mã môn học: Se1')
}

// Clear all subjects
function clearSubjects() {
  subjects.value = []
}
</script>

<!-- Tailwind is typically imported globally in your main.js or via PostCSS configuration;
     no need to import Tailwind directly in this file unless you prefer the CDN method. -->
<style scoped>
/* You can add additional CSS here, but likely all you need is Tailwind classes in the template. */
</style>