<template>
    <div>
        <slot/>
        <button v-for="button in buttons" @click="buttonClick(button)"></button>
    </div>
</template>

<script>

    export const defaultModalCloseButton = {
        title: 'button.close',
        cmd(modal){
            modal.close();
        }
    };

    export default {
        name: "Modal",
        props: {
            buttons: {
                type: Array,
                default() {
                    return [defaultModalCloseButton];
                }
            },
            value:
                {
                    type: Boolean,
                    default: true,
                }
        },
        data() {
            return {
                isOpen: 'undefined' === typeof this.value ? false : this.value,
            }
        },
        methods: {
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
    }

</script>