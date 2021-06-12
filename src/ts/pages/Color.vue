<template>
    <div class="color-container">
        <div class="color-wrapper">
            <h1 class="g-title">Color Picker</h1>
            <input v-model="hexColor" type="color" class="color-picker">
            <h2 class="color-hex">{{ hexColor }}</h2>
            <span class="color-label">Save color name</span>
            <input v-model="nameColor" class="color-input-name g-input-text" placeholder="color name" type="text">
            <div class="color-buttons">
                <button v-on:click="sendRequest(hexColor)" class="g-button">Send</button>
                <button v-on:click="saveColor" class="g-button">Save</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    name: 'Color',
    data: () => ({
        hexColor: '#000000',
        nameColor: '',
    }),
    methods: {
        sendRequest: function(hexColor: string) {
            let ip = localStorage.getItem('ip');
            let red = hexColor.substring(1,3);
            let green = hexColor.substring(3,5);
            let blue = hexColor.substring(5,7);
            if (ip) {
                axios
                    .get(`http://${ip}/led/${red}/${green}/${blue}`)
                    .then((res) => {
                        if (res.data == "OK") {
                            this.$emit('alert', { message: `Changed LEDs to ${hexColor}`, success: true });
                        } else {
                            this.$emit('alert', { message: 'Could not change LEDs', success: false });
                        }
                    })
                    .catch((er) => {
                        this.$emit('alert', { message: 'Server down or wrong ip', success: false });
                    });
            } else {
                this.$emit('alert', { message: 'Ip not defined', success: false });
            }
        },
        saveColor: function() {
            if (this.nameColor) {
                this.$store.dispatch('addColor', { hex: this.hexColor, name: this.nameColor });
                this.$emit('alert', { message: 'Saved Color', success: true });
                this.nameColor = '';
            } else {
                this.$emit('alert', { message: 'Name is empty', success: false });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .color-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .color-hex {
        margin-top: .3rem;
    }

    .color-label {
        font-weight: bold;
        margin-top: 2rem;
        margin-bottom: .3rem;
    }

    .color-input-name {
        margin-bottom: 2rem;
    }

    .color-picker {
        width: 8rem;
        height: 8rem;
        border: none;
        border: dashed hotpink 3px;
        border-radius: 5px;
        background-color: white;
    }
</style>