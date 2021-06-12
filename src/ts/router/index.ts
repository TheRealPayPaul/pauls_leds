import Vue from 'vue';
import VueRouter from 'vue-router';
import Color from '../pages/Color.vue';
import Config from '../pages/Config.vue';
import Saved from '../pages/Saved.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Color },
    { path: '/config', component: Config },
    { path: '/saved', component: Saved }
];

export default new VueRouter({
    // mode: 'history',
    routes,
});