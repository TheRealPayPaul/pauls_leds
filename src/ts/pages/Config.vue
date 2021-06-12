<template>
    <div class="config-container">
        <h1 class="g-title">Config</h1>
        <div class="config-option-container">
            <span>Host adress</span>
            <input v-model="input.ip" v-bind:placeholder="curIp" class="g-input-text" type="text">
            <button v-on:click="setIp" class="g-button config-button">Update</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'About',
    data: () => ({
        curIp: 'Not defined',
        validator: /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/,
        input: {
            ip: '',
        }
    }),
    methods: {
        setIp: function() {
            if (this.input.ip == '') {
                this.$emit('alert', { message: 'Empty you dummie', success: false });
                return
            }

            if (this.validator.test(this.input.ip)) {
                localStorage.setItem('ip', this.input.ip);
                this.curIp = this.input.ip;
                this.input.ip = '';
                this.$emit('alert', { message: 'Updated', success: true });
            } else {
                this.$emit('alert', { message: 'Wrong format', success: false });
            }
        },
    },
    mounted: function() {
        let ip = localStorage.getItem('ip');
        if (ip) {
            this.curIp = ip;
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