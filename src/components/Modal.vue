<template>
	<portal to="modal">
		<transition name="fade">
			<div class="modal-mask" @click="backdropClick">
				<div class="modal-wrapper">
					<div class="modal-container">
						<div class="modal-header">
							<h3>{{$t(title)}}</h3>
						</div>
						<div class="modal-body">
							<slot />
						</div>
						<div class="modal-footer">
							<button class="button" v-for="button in buttons" @click="buttonClick(button)">{{$t(button.title)}}</button>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</portal>
</template>

<script>
	export const defaultModalCloseButton = {
		title: 'button.close',
		cmd(modal) {
			modal.close();
		}
	};

	export default {
		name: 'Modal',
		props: {
			title: {
				type: String,
				default: ''
			},
			buttons: {
				type: Array,
				default() {
					return [defaultModalCloseButton];
				}
			},
			value: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				isOpen: 'undefined' === typeof this.value ? false : this.value
			};
		},
		methods: {
			backdropClick(event) {
				let classList = event.target.classList;
				if (classList.contains('modal-wrapper') || classList.contains('modal-mask')) {
					this.close();
				}
			},
			buttonClick(button) {
				if ('function' === typeof button.cmd) {
					button.cmd(this);
				}
			},
			close() {
				this.isOpen = false;
				this.$emit('input', false);
			}
		},
		watch: {
			value(newValue) {
				this.isOpen = 'undefined' === typeof newValue ? false : newValue;
			}
		}
	};
</script>