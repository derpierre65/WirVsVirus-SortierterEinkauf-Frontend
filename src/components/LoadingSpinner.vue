<template>
	<div>
		<div class="loadingSpinner active">
			<span class="fa fa48 fa-spinner"></span> <span>{{$t('loading')}}</span>
		</div>
		<div class="pageBackdrop"></div>
	</div>
</template>

<script>
	export default {
		name: 'LoadingSpinner'
	};
</script>