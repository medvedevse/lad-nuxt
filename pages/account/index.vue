<template>
	<h1>Account page</h1>
	<div v-if="user">
		<p>Username: {{ (user as IUser).username }}</p>
		<p>Role: {{ (user as IUser).isAdmin ? 'admin' : 'user' }}</p>
		<p></p>
	</div>
</template>

<script setup lang="ts">
import type { IUser } from '~/middleware/admin';

definePageMeta({
	layout: 'login',
	middleware: ['auth'],
});

const { user } = useUserSession();
</script>

<style scoped></style>
