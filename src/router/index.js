import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import Barkeeper from '../views/Barkeeper.vue';
import Categories from '../views/Categories.vue';
import Drinks from '../views/Drinks.vue';
import Cart from '../views/Cart.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  /*{
    path: '/barkeeper',
    name: 'Barkeeper',
    component: Barkeeper,
  },*/
  {
    path: '/barkeeper',
    //name: 'Barkeeper',
    component: Barkeeper,
    children: [
      {
        path: '',
        component: Categories,
        props: true,
      },
    ],
  },
  /*{
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },*/
  {
    path: '/drinks/:category',
    name: 'Drinks',
    component: Drinks,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
