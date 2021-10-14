<template>
    <button type="button" :class="classes" @click="onClick" :style="style">
        {{ label }}
    </button>
</template>

<script>
import './button.css';

export default {
    name: 'my-button',

    props: {
        /**
         * The label of the button
         */
        label: {
            type: String,
            required: true,
        },

        /**
         * Whether the button is primary
         */
        primary: {
            type: Boolean,
            default: false,
        },

        /**
         * The size of the button
         */
        size: {
            type: String,
            validator: function (value) {
                return ['small', 'medium', 'large'].indexOf(value) !== -1;
            },
        },

        /**
         * The background colour of the button
         */
        backgroundColor: {
            type: String,
        },
    },

    emits: ['click'],
    computed: {
        classes(){
            return {
                'storybook-button': true,
                'storybook-button--primary': this.primary,
                'storybook-button--secondary': !this.primary,
                [`storybook-button--${this.size || 'medium'}`]: true,
            }
        },
        style() {
            return {
                backgroundColor: this.backgroundColor,
            }
        },
    },
    methods: {
        onClick() {
            this.emit('click');
        }
    },
};
</script>
