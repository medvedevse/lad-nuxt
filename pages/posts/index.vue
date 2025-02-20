<template>
	<h1 class="posts-header">Posts</h1>
	<div v-if="isLoading === 'pending'">...Loading</div>
	<div
		v-else
		class="posts-wrapper"
	>
		<p
			class="post-title"
			@click="navigateTo(`${String(route.name)}/${post.id}`)"
			v-for="(post, idx) in posts"
			:key="post.id"
		>
			{{ idx + 1 + '. ' + post.title[0].toUpperCase() + post.title.slice(1) }}
		</p>
	</div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';
import { getPosts, type IPost } from '~/services/posts';

definePageMeta({
	layout: 'custom',
});

const posts = ref<IPost[]>([]);
const isLoading = ref();

const route = useRoute();

try {
	const { data, status } = await getPosts();
	posts.value = data.value as IPost[];
	isLoading.value = status.value;
} catch (err) {
	console.error((err as NuxtError).message);
}
</script>

<style scoped lang="scss">
.posts-header {
	margin: 10px;
}

.posts-wrapper {
	padding-left: 10px;
}

.post-title {
	margin-bottom: 10px;
	cursor: pointer;
}
</style>
