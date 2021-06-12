<template>
    <div class="nav-container">
        <div class="nav-wrapper">
            <router-link class="link" to="/">Color</router-link>
            <router-link class="link" to="/saved">Saved</router-link>
            <router-link class="link" to="/config">Config</router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style type="scss" scoped>
    .nav-container {
        position: fixed;
    }

    .nav-wrapper {
        width: 100vw;
        height: 4rem;
        background-color: hotpink;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .link {
        color: white;
        font-size: 2rem;
        margin: 0 1rem;
        text-decoration: none;
        font-family: Pacifico;
    }

    .link:hover {
        text-decoration: underline;
    }
</style>