<template>
	<div>
		<div>
			<h1>Informationen für <strong>{{market.name}}</strong></h1>
			Adresse: {{market.address}}<br>
			Popularität: {{market.userFeedback}}<br>
			Besucherzähler: {{market.amountOfPeople > 0 ? market.amountOfPeople : 'Keine Messdatenaten vorhanden'}}<br>
			Durchschnittliche Aufenhaltsdauer: {{market.averagePresenceTime > 0 ? market.averagePresenceTime : 'Keine Messdatenaten vorhanden'}}<br>
		</div>

		<product-item v-for="product in products" :product="product" v-model="product.selected" :key="product.id"
		              @click.native="productFeedback(product)" />

		<modal v-if="modalFeedback" v-model="modalFeedback" :buttons="modalButtons">
			<h1>{{products[productFeedbackId].product_name}}</h1>
			<ul>
                <li><label><input name="quantityCheck" type="radio" value="0" v-model.number="quantityCheck">
                    LEER</label></li>
				<li><label><input name="quantityCheck" type="radio" value="1" v-model.number="quantityCheck">
                    WENIG</label></li>
				<li><label><input name="quantityCheck" type="radio" value="2" v-model.number="quantityCheck">
                    VIEL</label></li>
			</ul>
		</modal>

		<div>
			<h1>Wie viele Menschen waren einkaufen?</h1>
			<ul>
				<li><input name="population" type="radio"> KEINE</li>
				<li><input name="population" type="radio"> WENIG</li>
				<li><input name="population" type="radio"> VIEL</li>
			</ul>
			<button @click="submitStoreFeedback()">{{$t('button.submit')}}</button>
		</div>
	</div>
</template>

<script>
	import ProductItem from '../components/ProductItem';
	import Modal, {defaultModalCloseButton} from '../components/Modal';
	import {mapState} from 'vuex';
	import product from '../store/modules/product';

	export default {
		name: 'MarketPage',
		components: { Modal, ProductItem },
		data() {
			return {
				quantityCheck: null,
				productFeedbackId: null,
				modalFeedback: false,
				market: {}
			};
		},
		created() {
			this.$store.dispatch('product/fetch');
			Promise.resolve({
				data: {
					market_id: 323343545,
					googleTrack: 'DOLLETRACKID',
					name: 'Aldi Meppen Süd',
					address: 'MEPPEN SÜD',
					types: 'supermarkt',
					ltdtude: '3',
					lngtude: '3',
					recorded_at: '2020-02-02 13:33:37',
					userFeedback: 2,
					amountOfPeople: 44,
					sizeOfMarket: 52,
					averagePresenceTime: null
				}
			}).then((response) => {
				this.market = response.data;
			}).catch();
		},
		computed: {
			...mapState('product', { products: 'entries' }),
			modalButtons() {
				return [
					{
						title: 'button.submit',
						cmd(modal) {
							Promise.resolve().then((response) => {
								modal.close();
							}).catch();
						}
					},
					defaultModalCloseButton
				];
			}
		},
		methods: {
			productFeedback(product) {
				this.productFeedbackId = product.id;
				this.quantityCheck = null;
				this.modalFeedback = true;
			},
			submitStoreFeedback() {
				//send feedback
				Promise.resolve().then((response) => {
					// user feedback
				}).catch();
			}
		}
	};
</script>

