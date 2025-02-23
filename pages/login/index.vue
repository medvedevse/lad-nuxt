<template>
	<div class="wrapper">
		<h1>Login page</h1>
		<div class="form-wrapper">
			<form
				class="form"
				@submit.prevent="loginUser"
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
					<button type="submit">Sign in</button>
				</div>
				<div
					class="alert"
					v-if="isError"
				>
					Неверный логин или пароль!
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
import type { IUser } from '~/middleware/admin';

definePageMeta({
	layout: 'login',
	middleware: [
		async (to, from) => {
			const { user } = useUserSession();
			if (user.value && (user.value as IUser).isAdmin) {
				return await navigateTo('/admin');
			} else if (user.value && !(user.value as IUser).isAdmin) {
				return await navigateTo('/');
			}
		},
	],
});

const { session, clear } = useUserSession();

const router = useRouter();

const form = reactive({
	username: '',
	password: '',
});

const isError = ref<boolean>(false);

const loginUser = async () => {
	try {
		const { data, status, error } = await useFetch('/api/auth', {
			method: 'POST',
			body: { ...form },
		});
		if (error.value) isError.value = true;
		if (status.value === 'success') location.reload();
	} catch (err) {
		console.error((err as NuxtError).message);
	}
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
	min-height: 50vh;
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
		justify-content: flex-start;
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

.controls-wrapper {
	display: flex;
	justify-content: space-between;
}

.logout-btn,
.back-btn {
	border: 1px solid gray;
	padding: 2px 4px;
	cursor: pointer;
}
</style>
