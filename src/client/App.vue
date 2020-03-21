<template>
	<div>
		{{$t('helloWorld')}}

		<router-link :to="{name: 'index'}">start</router-link>
		<router-link :to="{name: 'info'}">info</router-link>
		<router-link :to="{name: 'market'}">market</router-link>

		<router-view />
	</div>
</template>

<script>
	export default {};
</script>