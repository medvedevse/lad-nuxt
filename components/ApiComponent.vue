<template>
	<div v-if="users">
		<div
			v-for="user in users"
			:key="user.id"
			style="margin-bottom: 10px"
		>
			<span>Username: {{ user.username }}</span
			><br />
			<span>Email: {{ user.email }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

interface IUser {
	id: number;
	username: string;
	email: string;
	passwordHash: string;
}

const users = ref<IUser[]>([]);
try {
	const { data } = await useFetch<IUser[]>('/api/users');
	users.value = data.value as IUser[];
} catch (err) {
	console.log((err as NuxtError).message);
}
</script>

<style scoped></style>
