<template>
    <div class="snackbar-container">
        <div class="snackbar-wrapper snackbar-animate" v-bind:class="{ 'snackbar-success': success, 'snackbar-error': !success }">
            <h1>{{ message }}</h1>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: [ 'message', 'success' ],
}
</script>

<style lang="scss" scoped>
    .snackbar-wrapper {
        position: fixed;
        bottom: 1rem;
        width: 80vw;
        padding: 1rem;
        background-color: hotpink;
        color: white;
        text-align: center;
        border-radius: 1rem;
        transform: translateY(10rem);
    }

    .snackbar-container {
        display: flex;
        justify-content: center;
    }

    .snackbar-success {
        background-color: #64a123;
    }

    .snackbar-error {
        background-color: #F04237;
    }

    .snackbar-animate {
        animation: 2s jump;
    }

    @keyframes jump {
        0% { transform: translateY(10rem); }
        10% { transform: translateY(-0.5rem); }
        18% { transform: translateY(0.25rem); }
        25% { transform: translateY(0); }
        90% { transform: translateY(0); }
        100% { transform: translateY(10rem); }
    }
</style>