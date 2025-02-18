<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div v-if="error" class="error">
    <h1>Ошибка {{ error.statusCode }}</h1>
    <h2 v-if="error.statusCode == 404">Страница не существует!</h2>
    <NuxtLink to="/">На главную</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  min-height: 100vh;
  background: deepskyblue;
  color: white;
  a {
    color: white;
  }
  a:hover {
    background: #73d8d8;
  }
}
</style>
