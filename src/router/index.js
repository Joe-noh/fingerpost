import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import SpecView from '../views/SpecView.vue';

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {path: '/', component: SpecView}
  ]
});
