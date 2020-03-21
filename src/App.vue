<template>
	<div>
		<div class="menuBackground">
			<router-link :to="{name: 'index'}">{{$t('navigation.landingPage')}}</router-link>
			<router-link :to="{name: 'info'}">{{$t('navigation.infoPage')}}</router-link>
			<router-link :to="{name: 'market'}">{{$t('navigation.market')}}</router-link>
		</div>
		<div class="layoutBoundary">
			<router-view class="container" />
		</div>
	</div>
</template>

<script>
	export default {};
</script>