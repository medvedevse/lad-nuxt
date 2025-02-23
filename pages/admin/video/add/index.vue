<template>
	<h1>Add your content</h1>
	<form
		@submit.prevent="sendData"
		enctype="multipart/form-data"
		class="upload-form"
	>
		<div class="upload-file-wrapper">
			<div>
				<div
					v-if="video.length > 0"
					class="video-wrapper"
				>
					<div class="video-wrapper__head">
						<h4 class="video-wrapper__title">{{ video[0].name }}</h4>
						<div class="video-wrapper__delete">
							<Icon
								name="fa6-solid:x"
								size="18"
								@click="video = []"
							/>
						</div>
					</div>
					<video
						width="300"
						:src="videoContent"
						controls
					></video>
				</div>
				<UploadFile
					v-else
					icon="fa6-solid:video"
					type="Video"
					accept="video/*"
					@upload-file="handleVideo"
					@remove-file="video = []"
					id="video"
				/>
			</div>
			<div>
				<div
					v-if="preview.length > 0"
					class="video-wrapper"
				>
					<div class="video-wrapper__head">
						<h4 class="video-wrapper__title">{{ preview[0].name }}</h4>
						<div class="video-wrapper__delete">
							<Icon
								name="fa6-solid:x"
								size="18"
								@click="preview = []"
							/>
						</div>
					</div>
					<img
						width="300"
						height="100"
						:src="previewContent"
					/>
				</div>

				<UploadFile
					v-else
					icon="fa6-solid:image"
					type="Preview"
					accept="image/*"
					@upload-file="handlePreview"
					@remove-file="preview = []"
					id="preview"
				/>
			</div>
		</div>
		<div class="upload-input-wrapper">
			<label for="title">Title</label>
			<div>
				<input
					type="text"
					id="title"
					v-model="formData.title"
				/>
			</div>
		</div>
		<div class="upload-input-wrapper">
			<label for="description">Description</label>
			<textarea
				name=""
				id="description"
				v-model="formData.description"
			></textarea>
		</div>

		<div><button type="submit">Save</button></div>
		<div
			class="error"
			v-if="formData.formError"
		>
			Заполнены не все поля!
		</div>
	</form>
</template>

<script setup lang="ts">
import UploadFile from '~/components/UploadFile.vue';

useSeoMeta({
	title: 'Add your content',
});

definePageMeta({
	layout: 'admin',
	middleware: ['auth'],
});

const formData = reactive({
	title: '',
	description: '',
	formError: false,
});

const { handleFileInput: handleVideo, files: video } = useFileStorage();
const { handleFileInput: handlePreview, files: preview } = useFileStorage();

const videoContent = computed<string>(() =>
	video.value.length > 0 ? (video.value[0].content as string) : ''
);
const previewContent = computed<string>(() =>
	preview.value.length > 0 ? (preview.value[0].content as string) : ''
);

const sendData = async () => {
	if (
		!formData.title.length ||
		!formData.description.length ||
		!video.value.length ||
		!preview.value.length
	) {
		console.log(
			formData.title.length,
			formData.description.length,
			video.value.length,
			preview.value.length
		);
		return (formData.formError = true);
	} else {
		formData.formError = false;
		const { data, status, error } = await useFetch('/api/video', {
			method: 'POST',
			body: {
				video: video.value[0],
				preview: preview.value[0],
				title: formData.title,
				description: formData.description,
			},
		});

		console.log(data.value);

		if (status.value === 'success') {
			await navigateTo('/admin/video');
		}
	}
};
</script>

<style scoped lang="scss">
.upload-form {
	padding: 20px 30px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.upload-file-wrapper {
	display: flex;
	gap: 30px;
	margin-bottom: 10px;
}
.upload-input-wrapper {
	display: flex;
	flex-direction: column;
	gap: 10px;
	input {
		width: 300px;
		height: 50px;
	}

	textarea {
		resize: none;
		width: 300px;
		height: 100px;
	}
}

.error {
	color: red;
}
</style>
