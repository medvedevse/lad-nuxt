<template>
	<div class="wrapper">
		<div class="controls-wrapper">
			<h1>Admin page</h1>
			<div>
				<button
					class="logout-btn"
					@click="logoutUser"
				>
					Logout
				</button>
			</div>
		</div>
		<pre>{{ form }}</pre>
		<div class="form-wrapper">
			<form
				class="form"
				@submit.prevent="createUser"
			>
				<div>
					<input
						type="text"
						placeholder="Username"
						v-model="form.username"
						autocomplete="username"
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Password"
						v-model="form.password"
						autocomplete="new-password"
					/>
				</div>
				<div class="btn-container">
					<div class="admin-checkbox">
						<label for="admin">Admin</label>
						<input
							type="checkbox"
							v-model="form.isAdmin"
							id="admin"
						/>
					</div>
					<button type="submit">Create user</button>
				</div>
				<div
					class="alert"
					v-if="isError"
				>
					Пользователь существует!
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

definePageMeta({
	layout: 'admin',
	middleware: ['admin'],
});

const { clear } = useUserSession();

const form = reactive({
	username: '',
	password: '',
	isAdmin: false,
});

const isError = ref<boolean>(false);

const createUser = async () => {
	try {
		const { data, status, error } = await useFetch('/api/user', {
			method: 'POST',
			body: { ...form },
		});
		if (error.value) isError.value = true;
	} catch (err) {
		console.error((err as NuxtError).message);
	}
};

const logoutUser = async () => {
	await clear();
	await location.reload();
};
</script>

<style scoped lang="scss">
.wrapper {
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.form-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
}

.form {
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 10px;
	border: 1px solid gray;
	border-radius: 6px;
	width: 20%;

	.btn-container {
		display: flex;
		gap: 10px;
		justify-content: space-between;
		button {
			border: 1px solid gray;
			padding: 2px 4px;
			cursor: pointer;
		}
	}
	input[type='text'],
	input[type='password'] {
		width: 100%;
		border: 1px solid gray;
		padding: 4px;
	}
}

.alert {
	color: red;
	font-size: 14px;
	text-align: center;
}

.admin-checkbox {
	display: flex;
	gap: 4px;
	align-items: center;
}

.controls-wrapper {
	display: flex;
	justify-content: space-between;
}
</style>
