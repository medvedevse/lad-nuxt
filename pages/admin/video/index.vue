<template>
	<div class="wrapper">
		<h1>Video page</h1>
		<div>
			<button
				class="add-video-btn"
				@click="addContent"
			>
				Add new video
			</button>
		</div>
	</div>
	<table>
		<thead>
			<tr>
				<th>Видео</th>
				<th></th>
				<th>Дата</th>
				<th>Автор</th>
			</tr>
		</thead>
		<tbody v-if="videoList">
			<tr v-for="videoItem in videoList">
				<td @click="playVideo = !playVideo">
					<div v-if="!playVideo">
						<NuxtImg
							:src="`/files/preview/${videoItem.video.previewFileName}`"
							width="300"
						/>
					</div>
					<div v-else>
						<video
							:src="`/files/video/${videoItem.video.videoFileName}`"
							width="300"
							controls
							autoplay
						></video>
					</div>
				</td>
				<td>
					<h2>{{ videoItem.video.title }}</h2>
					<!-- <p>{{ videoItem.video.description }}</p> -->
				</td>
				<td>
					<Icon
						size="20"
						name="fa6-solid:calendar"
					/>
					<span>
						{{ dayjs(videoItem.video.createdAt).format('DD/MM/YYYY HH:mm') }}
					</span>
				</td>
				<td>
					<div>
						<Icon
							size="20"
							name="fa6-solid:user-large"
						/>
						<span>{{ videoItem.user?.username }}</span>
					</div>
				</td>
				<td>
					<div>
						<a href="/admin/video/edit">
							<Icon
								size="20"
								name="fa6-solid:pen"
							/>
						</a>
					</div>
					<div>
						<a href="/admin/video/delete">
							<Icon
								size="20"
								name="fa6-solid:trash"
							/>
						</a>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import dayjs from '#build/dayjs.imports.mjs';

definePageMeta({
	layout: 'admin',
});

const router = useRouter();
const addContent = async () => await router.push({ path: '/admin/video/add' });

const { data: videoList } = await useFetch('/api/video');

const playVideo = ref<boolean>(false);
</script>

<style scoped lang="scss">
.wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

table {
	width: 100%;
}

thead tr {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	// gap: 50px;
	border-bottom: 1px solid lightgray;
	padding: 10px 0;
}

thead tr:first-child {
	// padding-left: 50px;
}

tbody tr {
	display: flex;
	align-items: center;
	justify-content: space-around;
	// gap: 70px;
	padding-left: 100px;
	border-bottom: 1px solid lightgray;
}
</style>
