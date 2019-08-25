import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', name: 'login', component: Login },
    { path: '/home', name: 'home', component: Home },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },

    // Contas
    { path: '/novaconta/:id?', name: 'novaconta', component: () => import('./views/Contas/CadastroConta.vue') },
    {
      path: '/contas',
      name: 'contas',
      component: () => import('./views/Contas/PesquisarContas.vue'),

    }
  ]
})

router.beforeEach((to, from, next) => {
  /*store.dispatch('fetchAccessToken');
  if (to.fullPath === '/users') {
    if (!store.state.accessToken) {
      next('/login');
    }
  }
  if (to.fullPath === '/login') {
    if (store.state.accessToken) {
      next('/users');
    }
  }*/
  
  //console.log("to: "+to.fullPath);
  //console.log("from: "+from.fullPath);
  //console.log("next: "+next.fullPath);
  //console.log("localStorage: "+localStorage.id);

  if (to.fullPath != '/') {
    if (localStorage.id)
      next();      
    else
    next('/')
  }
  else
    next();

});

export default router;