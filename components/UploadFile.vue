<template>
	<div class="container">
		<label
			:for="id"
			class="header"
		>
			<Icon
				:name="icon"
				:size="50"
			/>
			<p>Browse {{ type }} to upload!</p>
		</label>
		<input
			:id="id"
			type="file"
			:accept="accept"
			@input="uploadEmit"
		/>
	</div>
</template>

<script setup lang="ts">
interface IUploadFileProps {
	icon: string;
	type: string;
	accept: string;
	id: string;
}

const props = defineProps<IUploadFileProps>();
const emit = defineEmits(['upload-file', 'remove-file']);

const uploadEmit = (e: Event) => {
	emit('upload-file', e);
	e.stopPropagation();
};
const removeEmit = () => emit('remove-file');
</script>

<style scoped lang="scss">
.container {
	height: 200px;
	width: 300px;
	border-radius: 10px;
	box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.2);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	gap: 5px;
	background-color: rgba(0, 110, 255, 0.041);
}

.header {
	flex: 1;
	width: 100%;
	border: 2px dashed lightblue;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	cursor: pointer;
}

.header svg {
	height: 100px;
}

.header p {
	text-align: center;
	color: black;
}

.footer {
	background-color: rgba(0, 110, 255, 0.075);
	width: 100%;
	height: 40px;
	padding: 8px;
	border-radius: 10px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	color: black;
	border: none;
}

.footer svg {
	height: 130%;
	fill: lightblue;
	background-color: rgba(70, 66, 66, 0.103);
	border-radius: 50%;
	padding: 2px;
	cursor: pointer;
	box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
}

.footer p {
	flex: 1;
	text-align: center;
}

#video,
#preview {
	display: none;
}

.upload-wrapper {
	width: 100%;
	display: flex;
	justify-content: space-between;
	img {
		cursor: pointer;
	}
}
</style>
