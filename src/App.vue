<template>
	<div>
		<div class="menuBackground">
			<router-link :to="{name: 'index'}">start</router-link>
			<router-link :to="{name: 'info'}">info</router-link>
			<router-link :to="{name: 'market'}">market</router-link>
		</div>
		<div class="layoutBoundary">
			<router-view />
		</div>
	</div>
</template>

<script>
	export default {};
</script>