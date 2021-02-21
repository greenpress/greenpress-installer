<template>
	<div class="operations-list">
		<div>
			Create new project
		</div>
		<div>
			Upgrade your application
		</div>
		<div>
			Deploy your application
		</div>
	</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: 'Home'
})
</script>

<style scoped>
.operations-list {
	display: flex;
	flex-wrap: wrap;
}

.operations-list > * {
	width: 50%;
}
</style>
