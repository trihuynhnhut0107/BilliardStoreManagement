<template>
  <div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const navigate = () => {
  router.push('/login');
}

onMounted(async () => {
  await navigate()
})
</script>

<style scoped></style>
