<template>
    <div class="config-container">
        <h1 class="g-title">Config</h1>
        <div class="config-option-container">
            <span>Auth Key</span>
            <input v-model="input.key" v-bind:placeholder="curKey" class="g-input-text" type="text">
            <button v-on:click="setKey" class="g-button config-button">Update</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'About',
    data: () => ({
        curKey: 'Not defined',
        validator: /^[0-9a-zA-Z]{16}$/,
        input: {
            key: '',
        }
    }),
    methods: {
        setKey: function() {
            if (this.input.key == '') {
                this.$emit('alert', { message: 'Empty you dummie', success: false });
                return
            }

            if (this.validator.test(this.input.key)) {
                localStorage.setItem('key', this.input.key);
                this.curKey = this.input.key;
                this.input.key = '';
                this.$emit('alert', { message: 'Updated', success: true });
            } else {
                this.$emit('alert', { message: 'Wrong format', success: false });
            }
        },
    },
    mounted: function() {
        let key = localStorage.getItem('key');
        if (key) {
            this.curKey = key;
        }
    }
}
</script>

<style type="scss" scoped>
    .config-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .config-option-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 1rem;
        padding: 2rem;
    }

    .config-option-container span {
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .config-button {
        margin-top: 2rem;
    }
</style>