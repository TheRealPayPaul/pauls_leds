<template>
    <div>
        <Navbar></Navbar>
        <router-view class="app-route" v-on:alert="alert"></router-view>
        <Snackbar v-if="display" v-bind:success="success" v-bind:message="message"></Snackbar>
    </div>
</template>

<script lang="ts">
import Navbar from '../components/nav.vue';
import Snackbar from '../components/snackbar.vue';

export default {
    name: 'App',
    data: () => ({
        display: false,
        success: false,
        message: '',
    }),
    components: {
        Navbar,
        Snackbar,
    },
    methods: {
        alert: function(snackData: any) {
            this.display = false;
            this.success = snackData.success;
            this.message = snackData.message;
            setTimeout(() => {
                this.display = true;
            }, 10);
        }
    },
    mounted: function() {
        let colorsStr = localStorage.getItem('colors');
        if (colorsStr) {
            this.$store.dispatch('setColors', JSON.parse(colorsStr));
            this.alert({ message: 'Colors loaded successfully', success: true });
        } else {
            localStorage.setItem('colors', JSON.stringify([]));
            this.alert({ message: 'Created LocalStorage', success: true });
        }
    }
}
</script>

<style type="scss" scoped>
    .app-route {
        padding-top: 4rem;
    }
</style>