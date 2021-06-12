import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface color {
    hex: string,
    name: string,
}

export default new Vuex.Store({
    state: {
        savedColors: new Array,
        deleteMode: false,
    },
    mutations: {
        pushColor: function(state, newColor: color) {
            state.savedColors.push(newColor);
            localStorage.setItem('colors', JSON.stringify(state.savedColors));
        },
        defineColors: function(state, Colors: Array<color>) {
            state.savedColors = Colors;
        },
        removeColor: function(state, index) {
            state.savedColors.splice(index, 1);
            localStorage.setItem('colors', JSON.stringify(state.savedColors));
        },
        changeDeleteMode: function(state) {
            state.deleteMode = !state.deleteMode;
        }
    },
    actions: {
        addColor: function(context, newColor: color) {
            context.commit('pushColor', newColor);
        },
        setColors: function(context, Colors: Array<color>) {
            context.commit('defineColors', Colors);
        },
        deleteColor: function(context, index) {
            context.commit('removeColor', index);
        },
        switchDeleteMode: function(context) {
            context.commit('changeDeleteMode');
        }
    },
});