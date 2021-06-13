<template>
    <div class="colorTag-box">
        <div v-if="deleteMode" class="colorTag-delete">
            <img v-on:click="deleteSelf" src="../../img/delete.svg" alt="delete">
        </div>
        <div class="colorTag-container">
            <div v-on:click="sendRequest(hexColor)" class="colorTag-wrapper">
                <div v-bind:style="inlineStyle + hexColor" class="colorTag-color"></div>
                <div class="colorTag-hex">
                    <span>{{ tagName }}</span>
                    <span>{{ hexColor }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    props: [ 'hexColor', 'tagName', 'index' ],
    data: () => ({
        inlineStyle: 'background-color: ',
    }), 
    methods: {
        sendRequest: function(hexColor: string) {
            let key = localStorage.getItem('key');
            let red = hexColor.substring(1,3);
            let green = hexColor.substring(3,5);
            let blue = hexColor.substring(5,7);
            if (key) {
                axios
                    .get(`https://pauls-leds.tk/led/${key}/${red}/${green}/${blue}`)
                    .then((res) => {
                        if (res.data == 'OK') {
                            this.$emit('alert', { message: `Changed LEDs to ${hexColor}`, success: true });
                        } else if (res.data == 'RATE') {
                            this.$emit('alert', { message: 'Rate limit', success: false });
                        } else if (res.data == 'INVALID_KEY') {
                            this.$emit('alert', { message: 'Invalid key', success: false });
                        } else {
                            this.$emit('alert', { message: 'Could not change LEDs', success: false });
                        }
                    })
                    .catch((er) => {
                        this.$emit('alert', { message: 'Server down', success: false });
                    });
            } else {
                this.$emit('alert', { message: 'Key undefined', success: false });
            }
        },
        deleteSelf: function() {
            this.$store.dispatch('deleteColor', this.index);
        },
    },
    computed: {
        ...mapState({
            deleteMode: 'deleteMode',
        }),
    }
}
</script>

<style lang="scss" scoped>
    .colorTag-box {
        width: 20rem;
        display: flex;
        align-items: center;
    }

    .colorTag-container {
        width: 100%;
    }

    .colorTag-container:hover {
        cursor: pointer;
    }

    .colorTag-container:hover > .colorTag-wrapper {
        transform: scale(0.95);
    }

    .colorTag-wrapper {
        width: 100%;
        height: 100%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 1rem;
        overflow: hidden;
        transition: transform .2s;
        background-color: white;
    }

    .colorTag-color {
        height: 3rem;
    }

    .colorTag-hex {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: .5rem 0;
        font-weight: bold;
    }

    .colorTag-delete img {
        width: 3rem;
        height: 3rem;
        margin-right: 2rem;
        transition: transform .2s;
    }

    .colorTag-delete:hover img {
        transform: scale(0.95);
        cursor: pointer;
    }

</style>