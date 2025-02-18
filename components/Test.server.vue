<template>
  <div v-if="users">
    <div v-for="user in users" :key="user.id" style="margin-bottom: 10px">
      <span>Username: {{ user.username }}</span
      ><br />
      <span>Email: {{ user.email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const prisma = usePrismaClient();

const users = await prisma.user.findMany({
  where: {},
});
</script>

<style scoped></style>
