<template>
  <div></div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const navigate = () => {
  router.push("/login");
};
</script>

<style scoped></style>
