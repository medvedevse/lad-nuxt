<template>
	<div class="wrapper">
		<header class="header">
			<nav>
				<ul>
					<li v-if="!user">
						<NuxtLink to="/login">Sign in</NuxtLink>
					</li>
					<li v-if="user">
						<NuxtLink to="/account">Account</NuxtLink>
					</li>
					<li v-if="isAdmin">
						<NuxtLink to="/admin">Admin</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/posts">Posts</NuxtLink>
					</li>
				</ul>
			</nav>
		</header>
		<main class="main">
			<slot />
		</main>
		<footer class="footer">Footer</footer>
	</div>
</template>

<script setup lang="ts">
import type { IUser } from '~/middleware/admin';

const { user } = useUserSession();
const isAdmin = ref<boolean>(false);

if (user.value) isAdmin.value = (user.value as IUser).isAdmin;
else isAdmin.value = false;
</script>

<style scoped lang="scss">
.wrapper {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.header,
.footer {
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: lightgoldenrodyellow;
}

.header ul {
	list-style: none;
	display: flex;
	gap: 10px;
}

.main {
	flex-grow: 1;
}
</style>
