import Vue from 'vue';
import router from './router';
import store from './store';
import App from './components/app.vue';

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

window.addEventListener('load', () => {
    registerSW();
});

async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('../sw.js');
        } catch (e) {
            console.log('SW registration failed'); //
            console.log(e); //
        }
    }
}
