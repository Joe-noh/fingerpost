import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import HelloView from '../views/HelloView.vue';

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {path: '/hello', component: HelloView},
    {path: '/', redirect: '/hello'},
  ]
});
