<template>
    <div class="saved-container">
        <h1 class="g-title">Saved Colors</h1>
        <div class="saved-tags">
            <ColorTag v-on:alert="alert" v-for="color,key in Colors" v-bind:key="key" class="ColorTag" :hexColor="color.hex" :tagName="color.name" :index="key"></ColorTag>
        </div>
        <button v-on:click="toggleDelete" class="g-button saved-button">Toggle Delete</button>
    </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import ColorTag from '../components/colorTag.vue';

export default {
    name: 'Saved',
    components: {
        ColorTag,
    },
    methods: {
        alert: function(data: any) {
            this.$emit('alert', data);
        },
        toggleDelete: function() {
            this.$store.dispatch('switchDeleteMode');
        }
    },
    computed: {
        ...mapState({
            Colors: 'savedColors',
        })
    }
}
</script>

<style type="scss" scoped>
    .saved-title {
        color: hotpink;
        margin: 2rem 0;
    }

    .saved-container {
        width: 100vw;
        /* height: calc(100vh - 4rem); */
        display: flex;
        align-items: center;
        flex-direction: column;
        
    }

    .saved-tags {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .ColorTag {
        margin: 1rem 0;
    }

    .saved-button {
        margin: 2rem 0;
    }
</style>