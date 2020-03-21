<template>

    <div>
        <product-item v-for="product in products" :product="product" v-model="product.selected" :key="product.id"
                      @click.native="productFeedback(product)"/>

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
        </div>

    </div>

</template>

<script>
    import ProductItem from '../components/ProductItem';
    import Modal , {defaultModalCloseButton} from "../components/Modal";
    import {mapState} from "vuex";

    export default {

        name: 'MarketPage',
        components: {Modal, ProductItem},

        data() {
            return {
                quantityCheck: null,
                productFeedbackId: null,
                modalFeedback: false,
            };
        },

        created() {
            this.$store.dispatch('product/fetch')
        },

        computed: {
            ...mapState('product', {products: 'entries'}),
            modalButtons() {
                return [
                    defaultModalCloseButton
                ];
            }
        },

        methods: {
            productFeedback(product) {
                this.productFeedbackId = product.id;
                this.quantityCheck = null;
                this.modalFeedback = true;
            }
        },
    };
</script>

