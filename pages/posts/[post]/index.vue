<template>
  <div class="wrapper">
    <div>
      <button class="back-btn" @click="router.back">Back</button>
    </div>
    <h2>{{ post?.title[0].toUpperCase() + post?.title.slice(1) }}</h2>
    <p>{{ post?.body[0].toUpperCase() + post?.body.slice(1) }}</p>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
import { getPost, type IPost } from "~/services/posts";

definePageMeta({
  layout: "custom",
});

const route = useRoute();
const router = useRouter();

const post = ref<IPost>({} as IPost);

try {
  const { data } = await getPost(Number(route.params.post));
  post.value = data.value as IPost;
} catch (err) {
  console.error((err as NuxtError).message);
}
</script>

<style scoped lang="scss">
.wrapper {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.back-btn {
  padding: 2px 4px;
}
</style>
