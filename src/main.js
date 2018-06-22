import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Cart from './components/Cart.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

export const bus = new Vue();

const routes = [
  { path: '/', component: Home },
  { path: '/cart', component: Cart }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
