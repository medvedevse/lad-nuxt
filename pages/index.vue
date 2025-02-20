<template>
	<div class="main-header-wrapper">
		<h1 class="main-header">Hello, world!</h1>
		<div
			class="logout-btn-wrapper"
			v-if="user"
		>
			<button
				class="logout-btn"
				@click="logoutUser"
			>
				Logout
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession();

const logoutUser = async () => {
	await clear();
	await location.reload();
};
</script>

<style scoped lang="scss">
.main-header-wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.main-header {
	width: 100%;
	text-align: center;
}

.logout-btn-wrapper {
	margin-right: 10px;
}
</style>
