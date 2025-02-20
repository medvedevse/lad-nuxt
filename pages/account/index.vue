<template>
	<h1>Account page</h1>
</template>

<script setup lang="ts">
definePageMeta({
	layout: 'login',
	middleware: ['auth'],
});
</script>

<style scoped></style>
