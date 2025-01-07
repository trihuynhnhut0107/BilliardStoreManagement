<template>
  <div class="h-screen w-screen flex flex-col overflow-auto">
    <header class="w-full h-auto flex justify-center items-center">
      This is header
    </header>
    <main class="w-full h-full overflow-clip flex flex-row">
      <slot />
    </main>
    <footer class="w-full grid grid-cols-3 grid-rows-1 ">
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab tenetur
        corrupti officia soluta illo temporibus, provident officiis dolorum quae
        libero, quidem eos natus numquam adipisci consequuntur, deserunt iure
        nostrum vel.
      </div>
      <div></div>
      <div>Right column</div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
